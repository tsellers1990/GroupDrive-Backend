const router = require("express").Router();
const userOperators = require("../middleware/pgUserOperators");

// * Users
router.get("/getUser", async (req, res) => {
  const { uid, userName } = req.query;
  const isPass = req?.query?.isPass || false;

  try {
    let response = await userOperators.readUser(
      uid,
      userName,
      JSON.parse(isPass)
    );
    if (response) {
      res.json(response);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    console.log("caught something, getuser", e);
    res.sendStatus(500);
  }
});

router.post("/createUser", async (req, res) => {
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
    let response = await userOperators.createUser(
      uid,
      userName,
      password,
      carType,
      displayName,
      numDrives,
      profilePhotoURL
    );

    if (response) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    console.log({e});
    res.sendStatus(500)
  }
});

router.put("/updateUser", async (req, res) => {
  //   ! incomplete
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
    let response = await userOperators.createUser(
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

router.delete("/deleteUser", async (req, res) => {
  //   ! incomplete
  const { uid, userName, password } = req.query;

  try {
    let readData = await userOperators.readUser(uid, userName, true);

    if (readData?.password === password) {
      const result = await userOperators.deleteUser(uid);
      if (result) {
        res.send(200);
      } else {
        res.send(500);
      }
    } else {
      res.status(500).send("passwords do not match");
    }
  } catch (e) {
    console.log("caught something delete", e);
  }
});

module.exports = router;
