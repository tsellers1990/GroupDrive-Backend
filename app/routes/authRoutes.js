const firebaseMiddle = require("../middleware/authMiddleware/index");
const router = require("express").Router();

// * Users
router.get("/jwt",firebaseMiddle.decodeToken, (req, res) => {
  res.status(200).send("JWT good");

});


module.exports = router;

