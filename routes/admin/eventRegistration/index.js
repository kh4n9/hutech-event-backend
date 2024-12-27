const router = require("express").Router();
const EventRegistration = require("../../../models/EventRegistration");

// get all event registration
router.get("/", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.find();
    res.send(eventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get event registration by id
router.get("/:id", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findById(req.params.id);
    if (!eventRegistration) {
      return res.status(404).send("Không tìm thấy sự kiện");
    }
    res.send(eventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

// post event registration
// kiểm tra xem đã có EventRegistration nào mà studentId và eventId giống nhau chưa
router.post("/", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findOne({
      studentId: req.body.studentId,
      eventId: req.body.eventId,
    });
    if (eventRegistration) {
      return res.status(400).send("Bạn đã đăng ký sự kiện này rồi");
    }
    const newEventRegistration = new EventRegistration(req.body);
    await newEventRegistration.save();
    res.send(newEventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get event registration by studentId
router.get("/:studentId", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.find({
      studentId: req.params.studentId,
    });
    res.send(eventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get event registration by eventId

router.get("/event/:eventId", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.find({
      eventId: req.params.eventId,
    });
    res.send(eventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete event registration
router.delete("/:id", async (req, res) => {
  try {
    const eventRegistration = await EventRegistration.findByIdAndDelete(
      req.params.id
    );
    if (!eventRegistration) {
      return res.status(404).send("Không tìm thấy sự kiện");
    }
    res.send(eventRegistration);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
