const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("This is colab route");
});

module.exports = router;
