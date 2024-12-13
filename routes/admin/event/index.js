const router = require("express").Router();
const Event = require("../../../models/Event");
const TopicEvent = require("../../../models/TopicEvent");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.hostBy ||
      !req.body.date ||
      !req.body.location
    ) {
      return res.status(400).send("Vui lòng điền đầy đủ thông tin");
    }
    const event = new Event(req.body);
    const isExist = await Event.findOne({ name: req.body.name });
    if (isExist) {
      return res.status(400).send("Sự kiện đã tồn tại");
    }
    await event.save();

    // Add topics from request body
    if (req.body.topics && req.body.topics.length > 0) {
      for (const topic of req.body.topics) {
        const topicEvent = new TopicEvent({
          ...topic,
          eventId: event._id,
        });
        await topicEvent.save();
      }
    }

    res.send(event);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Sự kiện không tồn tại");
    }
    res.send(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Sự kiện không tồn tại");
    }
    const isExist = await Event.findOne({
      name: req.body.name,
      _id: { $ne: req.params.id },
    });
    if (isExist) {
      return res.status(400).send("Sự kiện đã tồn tại");
    }
    event.set(req.body);
    await event.save();

    // Delete all old topic events for this event
    await TopicEvent.deleteMany({ eventId: req.params.id });

    // Create new topic events from request body
    if (req.body.topics && req.body.topics.length > 0) {
      for (const topic of req.body.topics) {
        const topicEvent = new TopicEvent({
          ...topic,
          eventId: event._id,
        });
        await topicEvent.save();
      }
    }

    res.send(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    // Delete all topic events for this event
    await TopicEvent.deleteMany({ eventId: req.params.id });
    res.send("Xóa sự kiện thành công");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
