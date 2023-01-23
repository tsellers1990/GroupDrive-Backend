const router = require("express").Router();
const firebaseMiddle = require("../middleware/authMiddleware/index");

// * Chats
router.get("/chat", firebaseMiddle.decodeToken, async (req, res) => {});

router.put("/chat", firebaseMiddle.decodeToken, async (req, res) => {});

module.exports = router;
