const express = require("express");
const controller = require("../controller/admincontroller");
const { verifyadmin } = require("../middleware/verifyToken");
const photoController = require("../controller/Photocontroller");

const router = express.Router();

// Public routes
router.post("/login", controller.login);
router.post("/createadmin", controller.createadmin);

// Admin-protected routes
router.get("/adminpanel", verifyadmin, controller.getadmin);
router.delete("/admin/:id", verifyadmin, controller.deleteadmin);
router.delete("/photo/:id", verifyadmin, photoController.deletePhoto);

module.exports = router;
