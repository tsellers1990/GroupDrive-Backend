const router = require("express").Router();
const admin = require("firebase-admin");

const serviceAccount =
  process.env.ENV_TYPE === "dev"
    ? require("../secret/serviceAccountKeyDev.json")
    : require("../secret/serviceAccountKeyProd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://groupdrive-94040.firebaseio.com",
});
// * these are all at /db/whatever

// serviceAccountKeyDev.json

const db = admin.database();

router.get("/", (req, res) => {
  db.ref("/").once("value", (snapshot) => {
    console.log(snapshot.val());
  });

  res.send("/db/*");
});

router.get("/1", (req, res) => {
  res.send("/db/1");
});

// res.statusCode = 200;
// res.setHeader("Content-Type", "text/plain");
// res.end("GroupDrive Backend Root");

module.exports = router;
