const mongoose = require("mongoose");

mongoose instanceof mongoose.Mongoose; // true

// Create a new Mongoose instance with its own `connect()`, `set()`, `model()`, etc.
const m = new mongoose.Mongoose();

const options = {
  user: "root",
  pass: "example",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectionString = "mongodb://mongo_db:27017/local?authSource=admin";

m.connect(connectionString, options)
  .then(() => {
    console.log("mongo connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });

const db = m.connection;

const write = async (uid, userName, coordinate, isOnline) => {
  if (!uid) return false;
  if (!isOnline)
    return db
      .useDb("local")
      .collection("geo-location")
      .findOneAndReplace({ _id: uid }, { isOnline: false });

  // ! this will replace an existing UID in the table, BUT does not create if none exist
  const putResult = await db
    .useDb("local")
    .collection("geo-location")
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
        db.collection("geo-location")
          .insertOne({
            _id: uid,
            userName,
            coordinate,
            isOnline,
          })
          .then((res) => {
            return true;
          });
      }
      return true;
    });
  return putResult;
};

const read = async () => {
  db.useDb("local");

  return db.collection("geo-location").once();
};

const readOne = async () => {
  db.useDb("local");

  db.collection("geo-location").once();
};

module.exports = { write, read, readOne };
