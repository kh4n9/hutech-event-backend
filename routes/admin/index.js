const router = require("express").Router();
const roleRoute = require("./role");
const userRoute = require("./user");
const topicRoute = require("./topic");
const topicEventRoute = require("./topicEvent");
const eventRoute = require("./event");
const studentEventRoute = require("./studentEvent");
const studentRoute = require("./student");
const certifyRoute = require("./certify");
const cefTemplateRoute = require("./cefTemplate");
const eventRegistrationRoute = require("./eventRegistration");

router.get("/", (req, res) => {
  res.send("This is admin route");
});

router.use("/roles", roleRoute);
router.use("/users", userRoute);
router.use("/topics", topicRoute);
router.use("/topic-events", topicEventRoute);
router.use("/events", eventRoute);
router.use("/student-events", studentEventRoute);
router.use("/students", studentRoute);
router.use("/certifies", certifyRoute);
router.use("/cef-templates", cefTemplateRoute);
router.use("/event-registrations", eventRegistrationRoute);

module.exports = router;
