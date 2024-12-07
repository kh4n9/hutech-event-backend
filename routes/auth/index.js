const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("This is auth route");
});

// login username and password save token in localstorage and check token in localstorage to login limit time 1 hour
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .send({ message: "Username or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
