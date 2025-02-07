const Router = require("express");
const router = new Router();
const DocumentController = require("../controllers/DocumentController");
const AuthCheck = require("../middleware/AuthCheckingMiddleware");
const AccessCheck = require("../middleware/AccessCheckingMiddleware");
const PresenceCheck = require("../middleware/PresenceCheckingMiddleware");
const NameValidation = require("../middleware/NameValidationMiddleware")(
  "document_name"
);
const BodyParamCheck = require("../middleware/BodyParamCheckingMiddleware")([
  "document_name",
  "document_content",
]);
const QueryParamCheck = require("../middleware/QueryParamCheckingMiddleware");
const SomeQueryParamCheck = require("../middleware/SomeQueryParamCheckingMiddleware");

router.post(
  "/create",
  AuthCheck(),
  BodyParamCheck,
  NameValidation,
  DocumentController.create
);
router.get(
  "/get",
  AuthCheck(),
  SomeQueryParamCheck(["document_id", "document_name"]),
  PresenceCheck(),
  AccessCheck(),
  DocumentController.get
);
router.put(
  "/update",
  AuthCheck(),
  QueryParamCheck(["document_id"]),
  PresenceCheck(),
  AccessCheck(),
  NameValidation,
  DocumentController.update
);
router.delete(
  "/delete",
  AuthCheck(),
  QueryParamCheck(["document_id"]),
  PresenceCheck(),
  AccessCheck(),
  DocumentController.delete
);

router.get(
  "/list",
  AuthCheck(),
  QueryParamCheck(["page", "limit"]),
  DocumentController.list
);

module.exports = router;
