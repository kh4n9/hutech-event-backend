const router = require("express").Router();
const roleRoute = require("./role");
const userRoute = require("./user");

router.get("/", (req, res) => {
  res.send("This is admin route");
});

router.use("/role", roleRoute);
router.use("/user", userRoute);

module.exports = router;
