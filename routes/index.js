const router = require("express").Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth");
const authRoute = require("./auth");
const adminRoute = require("./admin");
const colabRoute = require("./colab");
const publicRoute = require("./public");
const guestRoute = require("./guest");

router.use("/auth", authRoute);
router.use("/admin", verifyAdmin, adminRoute);
router.use("/colab", verifyToken, colabRoute);
router.use("/public", publicRoute);
router.use("/guest", guestRoute);

module.exports = router;
