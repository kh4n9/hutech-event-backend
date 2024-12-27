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
