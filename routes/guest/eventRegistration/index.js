const router = require("express").Router();
const EventRegistration = require("../../../models/EventRegistration");

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

module.exports = router;
