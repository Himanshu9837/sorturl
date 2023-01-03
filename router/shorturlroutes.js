const express = require("express");
const router = express.Router();
const sorturlController = require("../src/controllers/sorturlController");
const authenticate = require("../src/middleware/Authenticate");    

router.post("/sort",authenticate,sorturlController.sort);
router.get("/(:id)",sorturlController.geturl);
module.exports = router;