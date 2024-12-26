const router = require("express").Router();
const Role = require("../../../models/Role");

// post role kiểm tra xem role đã tồn tại chưa
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const { name } = req.body;
    const role = await Role.findOne({ name });
    if (role) {
      return res.status(400).send("Role already exists");
    }
    const newRole = new Role({ name });
    await newRole.save();
    res.send(newRole);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// get all role
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.send(roles);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get role by id
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send("Role not found");
    }
    res.send(role);
  } catch (error) {
    res.status(500).send(error);
  }
});

// update role by id check name role đã tồn tại chưa
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).send("Role not found");
    }
    const isExist = await Role.findOne({ name });
    if (isExist) {
      return res.status(400).send("Role already exists");
    }
    role.name = name;
    await role.save();
    res.send(role);
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete role by id
router.delete("/:id", async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).send("Role not found");
    }
    res.send(role);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
