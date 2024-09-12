const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const path = require("path");
const methodOverride = require("method-override");

const chatRoutes = require("./routes/chatRoute");
const app = express();
connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Use your preferred parameter name

app.use("/", chatRoutes);

app.listen(3000, () => {
  console.log("server running at 3000");
});
