const router = require("express").Router();
const TopicEvent = require("../../../models/TopicEvent");

router.get("/", async (req, res) => {
  try {
    const topicEvents = await TopicEvent.find();
    res.send(topicEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const topicEvent = new TopicEvent(req.body);
    const isExist = await TopicEvent.findOne({
      topicId: req.body.topicId,
      eventId: req.body.eventId,
    });
    if (isExist) {
      return res.status(400).send("Chủ đề sự kiện đã tồn tại");
    }
    await topicEvent.save();
    res.send(topicEvent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const topicEvent = await TopicEvent.findById(req.params.id);
    if (!topicEvent) {
      return res.status(404).send("Chủ đề sự kiện không tồn tại");
    }
    res.send(topicEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const topicEvent = await TopicEvent.find({ eventId: req.params.id });
    res.send(topicEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/topic/:id", async (req, res) => {
  try {
    const topicEvent = await TopicEvent.find({ topicId: req.params.id });
    res.send(topicEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const topicEvent = await TopicEvent.findById(req.params.id);
    if (!topicEvent) {
      return res.status(404).send("Chủ đề sự kiện không tồn tại");
    }
    const isExist = await TopicEvent.findOne({
      topicId: req.body.topicId,
      eventId: req.body.eventId,
      _id: { $ne: req.params.id },
    });
    if (isExist) {
      return res.status(400).send("Chủ đề sự kiện đã tồn tại");
    }
    topicEvent.set(req.body);
    await topicEvent.save();
    res.send(topicEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const topicEvent = await TopicEvent.findByIdAndDelete(req.params.id);
    if (!topicEvent) {
      return res.status(404).send("Chủ đề sự kiện không tồn tại");
    }
    res.send(topicEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
