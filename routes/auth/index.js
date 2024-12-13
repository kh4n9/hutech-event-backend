const router = require("express").Router();
const User = require("../../models/User");
const Role = require("../../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      expiresIn: "7d",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// get user with role by token
router.get("/", async (req, res) => {
  try {
    const headers = req.headers["authorization"];
    if (!headers) {
      return res.status(401).send("Unauthorized");
    }
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // Lấy user từ database
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Lấy thông tin role từ roleId
    const role = await Role.findById(user.roleId);
    if (!role) {
      return res.status(404).send("Role not found");
    }

    // Gắn thêm thông tin role vào user
    const userWithRole = {
      ...user.toObject(), // Chuyển user mongoose document thành object
      role, // Thêm role vào user
    };

    res.send(userWithRole);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
