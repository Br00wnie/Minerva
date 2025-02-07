const Router = require("express");
const router = new Router();
const StyleController = require("../controllers/StyleController");
const AuthCheck = require("../middleware/AuthCheckingMiddleware");
const NameValidation = require("../middleware/NameValidationMiddleware")(
  "style_name"
);
const BodyParamCheck = require("../middleware/BodyParamCheckingMiddleware")([
  "style_name",
  "style_content",
]);
const PresenceCheck = require("../middleware/PresenceCheckingMiddleware");
const AccessCheck = require("../middleware/AccessCheckingMiddleware");
const QueryParamCheck = require("../middleware/QueryParamCheckingMiddleware");
const SomeQueryParamCheck = require("../middleware/SomeQueryParamCheckingMiddleware");

router.post(
  "/create",
  AuthCheck(),
  BodyParamCheck,
  NameValidation,
  StyleController.create
);
router.get(
  "/get",
  AuthCheck(),
  SomeQueryParamCheck(["style_id", "style_name"]),
  PresenceCheck(),
  AccessCheck(),
  StyleController.get
);
router.put(
  "/update",
  AuthCheck(),
  QueryParamCheck(["style_id"]),
  PresenceCheck(),
  AccessCheck(),
  NameValidation,
  StyleController.update
);
router.delete(
  "/delete",
  AuthCheck(),
  QueryParamCheck(["style_id"]),
  PresenceCheck(),
  AccessCheck(),
  StyleController.delete
);

router.get(
  "/list",
  AuthCheck(),
  QueryParamCheck(["page", "limit"]),
  StyleController.list.bind(StyleController)
);
router.get(
  "/search",
  QueryParamCheck(["style_name", "page", "limit"]),
  StyleController.search.bind(StyleController)
);
router.post(
  "/copy",
  AuthCheck(),
  QueryParamCheck(["style_id"]),
  PresenceCheck(),
  StyleController.copy
);

module.exports = router;
