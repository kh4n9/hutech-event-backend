const router = require("express").Router();
const StudentEvent = require("../../../models/StudentEvent");

router.get("/", async (req, res) => {
  try {
    const studentEvents = await StudentEvent.find();
    res.status(200).send(studentEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const studentEvent = await StudentEvent.findById(req.params.id);
    res.status(200).send(studentEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { studentId, eventId, userId } = req.body;
    const isExist = await StudentEvent.findOne({ studentId, eventId });
    if (isExist) {
      return res.status(400).send("Sinh viên đã check in");
    }
    const studentEvent = new StudentEvent({ studentId, eventId, userId });
    await studentEvent.save();
    res.status(200).send(studentEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { studentId, eventId, userId, checkoutTime } = req.body;
    const studentEvent = { studentId, eventId, userId, checkoutTime };
    await StudentEvent.findByIdAndUpdate(req.params.id, studentEvent);
    res.status(200).send(studentEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await StudentEvent.findByIdAndDelete(id);
    res.status(200).send("Đã xoá sinh viên");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const studentEvents = await StudentEvent.find({ studentId: req.params.id });
    res.status(200).send(studentEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const studentEvents = await StudentEvent.find({ eventId: req.params.id });
    res.status(200).send(studentEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const studentEvents = await StudentEvent.find({ userId: req.params.id });
    res.status(200).send(studentEvents);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
