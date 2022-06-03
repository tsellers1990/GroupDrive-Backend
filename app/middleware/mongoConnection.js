const mongoose = require("mongoose");

mongoose instanceof mongoose.Mongoose; // true

// Create a new Mongoose instance with its own `connect()`, `set()`, `model()`, etc.
const m = new mongoose.Mongoose();

var options = {
  user: "root",
  pass: "example",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

var connectionString = "mongodb://mongo_db:27017/local?authSource=admin";

m.connect(connectionString, options)
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });

var db = m.connection;

const write = (uid, userName, coordinate, isOnline) => {
  let writeSuccess = {
    replace: true,
    update: true,
  };

  db.useDb("local");

  // ! this will replace an existing UID in the table, BUT does not create if none exist
  db.collection("geo-location")
    .findOneAndReplace(
      { _id: uid },
      {
        _id: uid,
        userName,
        coordinate,
        isOnline,
      }
    )
    .then((res) => {
      if (!res.lastErrorObject.updatedExisting) {
        // ! trigger create new instance
        db.collection("geo-location").insertOne({
          _id: uid,
          userName,
          coordinate,
          isOnline,
        });
      }

      console.log({ res });
    });

  return writeSuccess;
};

const read = async () => {
  db.useDb("local");

  db.collection("geo-location").once()
};

module.exports = { db, write, read };
