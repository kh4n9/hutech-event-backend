const router = require("express").Router();
const certifyRoute = require("./certify");
const eventRoute = require("./event");
const studentRoute = require("./student");
const studentEventRoute = require("./studentEvent");
const userRoute = require("./user");

router.get("/", (req, res) => {
  res.send("This is colab route");
});

router.use("/certifies", certifyRoute);
router.use("/events", eventRoute);
router.use("/students", studentRoute);
router.use("/student-events", studentEventRoute);
router.use("/users", userRoute);

module.exports = router;
