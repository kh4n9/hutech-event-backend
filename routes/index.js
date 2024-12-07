const router = require("express").Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth");
const authRoute = require("./auth");
const adminRoute = require("./admin");
const colabRoute = require("./colab");

router.use("/auth", authRoute);
router.use("/admin", verifyAdmin, adminRoute);
router.use("/colab", verifyToken, colabRoute);

module.exports = router;
