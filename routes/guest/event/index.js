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

module.exports = router;
