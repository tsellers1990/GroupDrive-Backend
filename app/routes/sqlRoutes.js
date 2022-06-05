const router = require("express").Router();
const pgDriveMembers = require("../middleware/pgDriveMemberOperators");
const pgDrive = require("../middleware/pgDriveOperators");
const pgFriend = require("../middleware/pgFriendOperators");
const pgUser = require("../middleware/pgUserOperators");
const pgChat = require("../middleware/ChatOperators");
// ! ^^^^ these will all get deconstructed out OR pgChat.function()

// * Drive Members
router.get("/driveMem", async (req, res) => {});

router.put("/driveMem", async (req, res) => {});

// * Drives
router.get("/drive", async (req, res) => {});

router.put("/drive", async (req, res) => {});

// * Friends
router.get("/friend", async (req, res) => {});

router.put("/friend", async (req, res) => {});

// * Users
router.get("/user", async (req, res) => {
  const {
    uid,
    userName,
  } = req.query;
  try {
    let response = await pgUser.readUser(uid, userName);
    if (response) {
      res.json(response);
    } else {
      res.send(500);
    }
  } catch {
    console.log("caught something");
  }

});

router.put("/createUser", async (req, res) => {
  const {
    uid,
    userName,
    password,
    carType,
    displayName,
    numDrives,
    profilePhotoURL,
  } = req.query;

  try {
    let response = await pgUser.createUser(
      uid,
      userName,
      password,
      carType,
      displayName,
      numDrives,
      profilePhotoURL
    );

    if (response) {
      res.send(200);
    } else {
      res.send(500);
    }
  } catch (e) {
    console.log("caught something");
  }
});

router.put("/updateUser", async (req, res) => {
  const {
    uid,
    userName,
    password,
    carType,
    displayName,
    numDrives,
    profilePhotoURL,
  } = req.query;

  try {
    let response = await pgUser.createUser(
      uid,
      userName,
      password,
      carType,
      displayName,
      numDrives,
      profilePhotoURL
    );

    if (response) {
      res.send(200);
    } else {
      res.send(500);
    }
  } catch (e) {
    console.log("caught something");
  }
});

// * Chats
router.get("/chat", async (req, res) => {});

router.put("/chat", async (req, res) => {});

module.exports = router;
