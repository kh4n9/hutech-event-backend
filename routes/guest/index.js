const router = require("express").Router();
const cefTemplateRoute = require("./cefTemplate");
const certifyRoute = require("./certify");
const studentEventRoute = require("./studentEvent");
const studentRoute = require("./student");
const eventRoute = require("./event");

router.use("/cefTemplate", cefTemplateRoute);
router.use("/certify", certifyRoute);
router.use("/studentEvent", studentEventRoute);
router.use("/student", studentRoute);
router.use("/event", eventRoute);

module.exports = router;
