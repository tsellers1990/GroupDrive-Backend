const { getFriends, addFriend } = require("../middleware/pgFriendOperators");
const router = require("express").Router();

// * Friends
router.get("/friends", async (req, res) => {
  try {
    const result = await getFriends(req?.query?.uid);

    if (!result?.err) {
      res.send(result);
    }
  } catch (e) {
    console.log({ e });
    res.status(500).send(e);
  }
});

router.put("/add", async (req, res) => {
  const { uidA, uidB, relationship = "pending" } = req.query;
  //TODO: Seek high preist Adam's knowledge on duplicated friend requests
  console.log("uidA", uidA, "uidB", uidB, "relationship", relationship);
  try {
    const result = await addFriend(uidA, uidB, relationship);

    if (!result?.err) {
      res.send(result);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
