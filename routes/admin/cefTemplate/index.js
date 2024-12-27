const router = require("express").Router();
const CefTemplate = require("../../../models/CefTemplate");

router.get("/", async (req, res) => {
  try {
    const cefTemplates = await CefTemplate.find();
    res.json(cefTemplates);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.post("/", async (req, res) => {
  try {
    const cefTemplate = new CefTemplate(req.body);
    await cefTemplate.save();
    res.json("CefTemplate added!");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cefTemplate = await CefTemplate.findById(req.params.id);
    res.json(cefTemplate);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CefTemplate.findByIdAndDelete(req.params.id);
    res.json("CefTemplate deleted!");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await CefTemplate.findByIdAndUpdate(req.params.id, req.body);
    res.json("CefTemplate updated!");
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
