const User = require("./UserModel");
const Document = require("./DocumentModel");
const Style = require("./StyleModel");

User.hasMany(Document, { foreignKey: "user_id", onDelete: "CASCADE" });
Document.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Style, { foreignKey: "user_id", onDelete: "CASCADE" });
Style.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Document,
  Style,
};
