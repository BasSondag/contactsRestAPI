const express = require("express");
const vaildateToken = require("../middleware/validateTokenHandler")
const router = express.Router();
const {
    registerUser,
    loginUser,
    currentUser
} = require("../controllers/userController");   

router
    .post("/register", registerUser)
    .post("/login",loginUser)
    .get("/current", vaildateToken ,currentUser);

module.exports = router