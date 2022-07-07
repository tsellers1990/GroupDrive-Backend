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