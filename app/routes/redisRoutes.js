const router = require("express").Router();
const admin = require("firebase-admin");

let FIREBASE_CALL_DELAY = 2500;

const serviceAccount =
  process.env.ENV_TYPE === "dev"
    ? require("../secret/serviceAccountKeyDev.json")
    : require("../secret/serviceAccountKeyProd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://groupdrive-94040.firebaseio.com",
});

const db = admin.database();

let bigObj = {};

let loopCount = 0;

const getDataBlock = async () => {
  await db.ref("/").once("value", (snapshot) => {
    const theData = snapshot.val();

    if (
      FIREBASE_CALL_DELAY !== theData.app_config.firebase_call_delay &&
      theData.app_config.firebase_call_delay
    ) {
      FIREBASE_CALL_DELAY = theData.app_config.firebase_call_delay;
    }

    bigObj = theData;
    loopCount++;
    initLoop();
  });
};

const initLoop = () => {
  setTimeout(() => {
    console.log("looped this many times: " + loopCount);
    getDataBlock();
  }, FIREBASE_CALL_DELAY);
};

initLoop();

// * Read Routes

router.get("/", (req, res) => {
  res.send(bigObj);
});

router.get("/users", (req, res) => {
    res.send(bigObj.users);
});

router.get("/app_config", (req, res) => {
    res.send(bigObj.app_config);
});

router.get("/live-data", (req, res) => {
    res.send(bigObj['live-data']);
});

module.exports = router;
