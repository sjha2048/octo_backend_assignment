const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");

router.post("/signup", user_controller.signUp);
router.post("/login", user_controller.login);
router.delete("/deleteUser", user_controller.deleteUser);
router.patch("/attendEvent", user_controller.attendEvent);

module.exports = router;
