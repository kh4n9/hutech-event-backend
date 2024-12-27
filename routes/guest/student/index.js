const router = require("express").Router();
const Student = require("../../../models/Student");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
