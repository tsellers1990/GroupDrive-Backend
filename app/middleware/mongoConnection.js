const mongoose = require("mongoose");

const options = {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, options)
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
  isOnline: {
    type: Boolean,
    default: false,
  },
  coordinate: {
    accuracy: Number,
    altitude: Number,
    altitudeAccuracy: Number,
    heading: Number,
    latitude: Number,
    longitude: Number,
    speed: Number,
  },
});

const LiveLocation = new mongoose.model("liveLocation", userLocationSchema);

const writeLocation = async (uid, userName, coordinate, isOnline) => {
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
  return LiveLocation.find({ isOnline: true });
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
  console.log("in write", coordinates, typeof coordinates);
  let geo = {
    geoJSONData: JSON.stringify(coordinates),
  };

  const newDoc = new GeoRoute(geo);

  return newDoc.save();
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
