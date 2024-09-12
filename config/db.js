const mongooose = require("mongoose");

const connectDB = async () => {
  await mongooose
    .connect("mongodb://127.0.0.1:27017/chat")
    .then((res) => {
      console.log("db connect at:" + res.connection.host);
    })
    .catch(() => {
      console.log("error in database connection");
    });
};

module.exports = connectDB;
