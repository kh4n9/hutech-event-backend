const router = require("express").Router();
const User = require("../../../models/User");
const bcrypt = require("bcrypt");

// post user kiểm tra xem username đã tồn tại chưa
router.post("/", async (req, res) => {
  try {
    const { username, password, fullname, roleId } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("Username already exists");
    }
    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 10),
      fullname,
      roleId,
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update user by id check username này ngoài trừ id của user đó ra có tồn tại chưa
router.put("/:id", async (req, res) => {
  try {
    const { username, password, fullname, roleId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isExist = await User.findOne({
      username,
      _id: { $ne: req.params.id },
    });
    if (isExist) {
      return res.status(400).send("Username already exists");
    }
    user.username = username;
    user.password = await bcrypt.hash(password, 10);
    user.fullname = fullname;
    user.roleId = roleId;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
