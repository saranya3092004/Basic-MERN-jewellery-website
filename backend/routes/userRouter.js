const express = require("express");
const { signup, login, getUser } = require("../controllers/userController");
const auth = require("../Middleware/auth");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", auth, getUser);

module.exports = router;
