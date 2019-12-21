const mongoose = require("mongoose");
const config = require("./config");
exports.connect = runApp => {
  mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  let db = mongoose.connection;
  db.on("error", err => {
    throw err;
  });

  db.once("open", () => runApp);
};
