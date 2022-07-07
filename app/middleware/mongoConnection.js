const { accessSync } = require("fs");
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

m.createConnection(connectionString, options)
  .then(() => {
    console.log("mongo connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });

const geoSchema = new m.Schema(
  {
    _id: String,
    userName: String,
    coordinate: [{lat: String, long: String}],
    isOnline: {
      type: Boolean,
      default: false
    }

  }
);

const GeoRoute = new m.model('geoRoute', geoSchema);

const write = async (uid, userName, coordinate, isOnline) => {
  console.log('in write');
  let geo = {
    _id: uid,
    userName: userName,
    coordinate: coordinate,
    isOnline: isOnline
  }

  GeoRoute.findOneAndUpdate({_id: uid},geo,{upsert: true}).exec()
    .then(()=> {
      return true;
    })
    .catch((err)=> {
      console.log(err);
      return false;
    })

  
}

const read = async () => {
  console.log('in read');
  return "reading in mongoConnection"
}

const readOne = async () => {
  console.log('in readOne');
}



module.exports = { write, read, readOne };


// const write = async (uid, userName, coordinate, isOnline) => {
//   if (!uid) return false;
//   if (!isOnline)
//     return await db
//       .useDb("local")
//       .collection("geo-location")
//       .findOneAndReplace({ _id: uid }, { isOnline: false });

//   // ! this will replace an existing UID in the table, BUT does not create if none exist
//   const putResult = await db
//     .useDb("local")
//     .getCollection("geo-location")
//     .findOneAndReplace(
//       { _id: uid },
//       {
//         _id: uid,
//         userName,
//         coordinate,
//         isOnline,
//       }
//     )
//     .then((res) => {
//       if (!res.lastErrorObject.updatedExisting) {
//         // ! trigger create new instance
//         db.collection("geo-location")
//           .insertOne({
//             _id: uid,
//             userName,
//             coordinate,
//             isOnline,
//           })
//           .then((res) => {
//             return true;
//           });
//       }
//       return true;
//     });
//   return putResult;
// };

// const read = async () => {
//   const data = [];
//   await db
//     .useDb("local")
//     .collection("geo-location")
//     .find({}, function (err, res) {
//       if (err) return false;
//       else {
//         return res;
//       }
//     })
//     .forEach((dbUserGeo) => {
//       data.push(dbUserGeo);
//     });

//   return data;
// };

// const readOne = async (uid) => {
//   const data = [];
//   await db
//     .useDb("local")
//     .collection("geo-location")
//     .find({ _id: uid }, function (err, res) {
//       if (err) return false;
//       else {
//         return res;
//       }
//     })
//     .forEach((dbUserGeo) => {
//       data.push(dbUserGeo);
//     });

//   return data;
// };

