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
