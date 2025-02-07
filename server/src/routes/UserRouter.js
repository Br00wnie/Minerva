const Router = require("express");
const router = new Router();
const UserController = require("../controllers/UserController");
const BodyParamCheck = require("../middleware/BodyParamCheckingMiddleware")([
  "user_login",
  "user_password",
]);
const AuthCheck = require("../middleware/AuthCheckingMiddleware");
const PasswordValidation = require("../middleware/PasswordValidationMiddleware");
const LoginValidation = require("../middleware/LoginValidationMiddleware");
const PresenceCheck = require("../middleware/PresenceCheckingMiddleware");

router.post(
  "/create",
  BodyParamCheck,
  LoginValidation(),
  PasswordValidation(),
  UserController.create
);
router.get("/get", AuthCheck(), PresenceCheck(), UserController.get);
router.put(
  "/update",
  AuthCheck(),
  PresenceCheck(),
  LoginValidation(),
  PasswordValidation(),
  UserController.update
);
router.delete("/delete", AuthCheck(), PresenceCheck(), UserController.delete);

router.post(
  "/login",
  BodyParamCheck,
  LoginValidation(),
  PasswordValidation(),
  UserController.login
);

module.exports = router;
