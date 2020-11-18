const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/user_controller");
const checkAuthMiddleware = require("../middlewares/check_auth")

router.post("/signup", user_controller.signUp);
router.post("/login", user_controller.login);
router.delete("/deleteUser/:id", user_controller.deleteUser);
router.patch("/attendEvent/:id",checkAuthMiddleware.checkAuth, user_controller.attendEvent);

module.exports = router;
