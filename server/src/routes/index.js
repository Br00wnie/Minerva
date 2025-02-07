const Router = require("express");
const router = new Router();
const UserRouter = require("./UserRouter");
const DocumentRouter = require("./DocumentRouter");
const StyleRouter = require("./StyleRouter");

router.use("/users", UserRouter);
router.use("/documents", DocumentRouter);
router.use("/styles", StyleRouter);

module.exports = router;
