const router = require("express").Router();

// * Chats
router.get("/chat", firebaseMiddle.decodeToken, async (req, res) => {});

router.put("/chat", firebaseMiddle.decodeToken, async (req, res) => {});

module.exports = router;
