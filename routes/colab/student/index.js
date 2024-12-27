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

// kiểm tra xem studentCode đã tồn tại chưa
router.post("/", async (req, res) => {
  try {
    const { studentCode } = req.body;
    const isExist = await Student.findOne({ studentCode });
    if (isExist) {
      return res.status(400).send("Sinh viên đã tồn tại");
    }
    const student = new Student(req.body);
    await student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// kiểm tra xem studentCode có bị trùng với studentCode khác không
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { studentCode } = req.body;
    const isExist = await Student.findOne({
      studentCode,
      _id: { $ne: id },
    });
    if (isExist) {
      return res.status(400).send("Sinh viên đã tồn tại");
    }
    const student = await Student.findByIdAndUpdate(id, req.body);
    res.status(200).send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
