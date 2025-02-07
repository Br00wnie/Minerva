require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const router = require("./routes/index");
const models = require("./models/index"); // Не удалять!
const cors = require("cors");
const UnexpectedErrorHandler = require("./middleware/UnexpectedErrorHandlingMiddleware");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const app = express();
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true); // Для прода нужно будет указать конкретные домены
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", router);

app.use(UnexpectedErrorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server started on http://${HOST}:${PORT}/`)
    );
  } catch (e) {
    console.error(e);
  }
};

start();
