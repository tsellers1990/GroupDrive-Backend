const mongoose = require("mongoose");

const options = {
  user: "root",
  pass: "example",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(`mongodb://mongo_db:27017/local?authSource=admin`, options)
  .then(() => {
    console.log("mongo connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });

//Mongo UserLocation Starts Here

const userLocationSchema = new mongoose.Schema({
  _id: String,
  userName: String,
  coordinate: String,
  isOnline: {
    type: Boolean,
    default: false,
  },
});

const LiveLocation = new mongoose.model("liveLocation", userLocationSchema);

const writeLocation = async (uid, userName, coordinate, isOnline) => {
  console.log("in write");
  let geo = {
    _id: uid,
    userName: userName,
    coordinate: coordinate,
    isOnline: isOnline,
  };

  return LiveLocation.findOneAndUpdate({ _id: uid }, geo, {
    upsert: true,
  }).exec();
};

const readLocation = async () => {
  console.log("in read");
  return LiveLocation.find({});
};

const readOneLocation = async (uid) => {
  console.log("in read one", uid);
  return LiveLocation.find({ _id: uid });
};

// MONGO GEOROUTES STARTS HERE //

const geoSchema = new mongoose.Schema({
  geoJSONData: String,
});

const GeoRoute = new mongoose.model("geoRoute", geoSchema);

const writeGeo = async (coordinates) => {
  console.log("in write");
  let geo = {
    geoJSONData: coordinates,
  };

  const newDoc = new GeoRoute(geo);

  return newDoc.save()
};

//TODO: const updateGeo = () => {}

const readGeo = async () => {
  console.log("in read");
  return GeoRoute.find({});
};

const readOneGeo = async (postGresID) => {
  console.log("in read one", postGresID);
  return GeoRoute.find({ _id: postGresID });
};

module.exports = {
  writeLocation,
  readLocation,
  readOneLocation,
  writeGeo,
  readGeo,
  readOneGeo,
};
