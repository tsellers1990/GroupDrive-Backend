const mongoose = require("mongoose");

mongoose instanceof mongoose.Mongoose; // true

// Create a new Mongoose instance with its own `connect()`, `set()`, `model()`, etc.
const m = new mongoose.Mongoose();

var options = {
    user: "root",
    pass: "example",
    useNewUrlParser:true,
    useUnifiedTopology:true
};

var connectionString = "mongodb://mongo_db:27017/local?authSource=admin";

m.connect(connectionString, options).then(()=>{
    console.log("connection is successfull");
}).catch((e)=>{
    console.log("no connection ");
});

var db = m.connection


const write = () => {
    console.log("bleh")
    // db.createCollection("bleh")
    
    var arr = ["foo", "bar"]
    
    db.useDb("local")
    db.collection("bleh").insertOne({
        _id:"bleh", item: "Value", geoGnlewh: "stringified bleh"})
    // db.once('open', function() {
    //     console.log("Connection Successful!");
    //     res.status(200)
         
    // });
}

const read = async() => {

    db.useDb("local")

    const data = await db.collection("bleh").findOne({"key" : "Value"});
    

    console.log({data})
    return data
}

module.exports = {db, write, read};
