const router = require("express").Router();
const admin = require("firebase-admin");

// * Read Routes

router.get("/users", (req, res) => {
  res.send(bigObj);
});

router.get("/topics", (req, res) => {
  res.send(bigObj.users);
});

router.get("/chats", (req, res) => {
  res.send(bigObj.app_config);
});

router.get("/drives", (req, res) => {
  res.send(bigObj["live-data"]);
});

module.exports = router;
