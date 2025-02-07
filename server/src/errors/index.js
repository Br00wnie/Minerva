const { DocumentNameExistsError } = require("./DocumentErrors");
const {
  StyleNameExistsError,
  PrivateStyleAccessError,
  PublicStyleUpdateError,
} = require("./StyleErrors");
const {
  UserLoginExistsError,
  UserLoginNotFoundError,
  UserWrongPasswordError,
  UserInvalidTokenError,
  UserTokenNotFoundError,
} = require("./UserErrors");
const { InvalidPaginationParamsError } = require("./CommonErrors");

module.exports = {
  DocumentNameExistsError,
  StyleNameExistsError,
  UserLoginExistsError,
  UserLoginNotFoundError,
  UserWrongPasswordError,
  UserInvalidTokenError,
  UserTokenNotFoundError,
  InvalidPaginationParamsError,
  PrivateStyleAccessError,
  PublicStyleUpdateError,
};
