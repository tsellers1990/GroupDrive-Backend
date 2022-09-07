const firebaseMiddle = require("../middleware/authMiddleware/index");

// * Users
router.get("/jwt", async (req, res) => {
  const { email, password } = req.query;


  


  //   try {
  // let response = await
  //     if (response) {
  //       res.json(response);
  //     } else {
  //       res.send(500);
  //     }
  //   } catch (e) {
  //     console.log("caught something, getuser", e);
  //     res.send(500);
  //   }
});
