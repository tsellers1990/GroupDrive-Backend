const {getFriends, addFriend } = require("../middleware/pgFriendOperators");
const router = require("express").Router();

// * Friends
router.get("/friends", async (req, res) => {
  const { uid } = req.query;
  const result = await getFriends(uid);

  if (!result?.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

router.put("/add", async (req, res) => {
  const { uidA, uidB, relationship = "pending" } = req.query;
    //TODO: Seek high preist Adam's knowledge on duplicated friend requests
  console.log({relationship})
  const result = await addFriend(uidA, uidB, relationship);

  if (!result?.err) {
    res.send(result);
  } else {
    res.status(500).send(result);
  }
});

module.exports = router;
