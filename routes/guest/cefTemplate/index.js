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

router.get("/:id", async (req, res) => {
  try {
    const cefTemplate = await CefTemplate.findById(req.params.id);
    res.json(cefTemplate);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

module.exports = router;
