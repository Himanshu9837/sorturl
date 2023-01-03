const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController");
const authenticate = require("../src/middleware/Authenticate");    



router.post("/userregister",userController.register);
router.get("/userlogin",userController.login);
module.exports = router;