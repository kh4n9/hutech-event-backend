const router = require("express").Router();
const cefTemplateRoute = require("./cefTemplate");
const certifyRoute = require("./certify");
const studentEventRoute = require("./studentEvent");
const studentRoute = require("./student");
const eventRoute = require("./event");
const eventRegistrationRoute = require("./eventRegistration");

router.use("/cefTemplate", cefTemplateRoute);
router.use("/certify", certifyRoute);
router.use("/studentEvent", studentEventRoute);
router.use("/student", studentRoute);
router.use("/event", eventRoute);
router.use("/eventRegistration", eventRegistrationRoute);

module.exports = router;
