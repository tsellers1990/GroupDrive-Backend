const mongoose = require("mongoose");

const options = {
  user: "root",
  pass: "example",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(`mongodb://mongo_db:27017/local?authSource=admin`, options)
  .then(() => {
    console.log("mongo connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });


const geoSchema = new mongoose.Schema(
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

const GeoRoute = new mongoose.model('geoRoute', geoSchema);

const write = async (uid, userName, coordinate, isOnline) => {
  console.log('in write');
  let geo = {
    _id: uid,
    userName: userName,
    coordinate: coordinate,
    isOnline: isOnline
  }

  return GeoRoute.findOneAndUpdate({_id: uid},geo,{upsert: true}).exec();

  
}

const read = async () => {
  console.log('in read');
  return "reading in mongoConnection"
}

const readOne = async () => {
  console.log('in readOne');
}



module.exports = { write, read, readOne };