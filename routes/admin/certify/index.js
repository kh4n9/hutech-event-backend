const router = require("express").Router();
const Certify = require("../../../models/Certify");

router.get("/", async (req, res) => {
  try {
    const certifies = await Certify.find();
    res.json(certifies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const certifies = await Certify.findById(req.params.id);
    res.json(certifies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// thêm serialNumber tự động
router.post("/", async (req, res) => {
  const certifies = new Certify(req.body);
  try {
    const lastCertify = await Certify.findOne().sort({ serialNumber: -1 });
    certifies.serialNumber = lastCertify ? lastCertify.serialNumber + 1 : 1;
    await certifies.save();
    res.status(201).json(certifies);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Certify.findByIdAndDelete(req.params.id);
    res.send({ message: "Certify deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const certifies = await Certify.findByIdAndUpdate(req.params.id, req.body);
    res.json(certifies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/student/:id", async (req, res) => {
  try {
    const certifies = await Certify.find({ studentId: req.params.id });
    res.json(certifies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/event/:id", async (req, res) => {
  try {
    const certifies = await Certify.find({ eventId: req.params.id });
    res.json(certifies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
