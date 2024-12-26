const express = require("express");
const path = require("path");
const router = express.Router();

// Serve static files from the "public" directory
router.use("/static", express.static(path.join(__dirname, "../../public")));

// Example route to serve an image
router.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const options = {
    root: path.join(__dirname, "../../public/images"),
  };
  res.sendFile(imageName, options, (err) => {
    if (err) {
      res.status(404).send("Image not found");
    }
  });
});

module.exports = router;
