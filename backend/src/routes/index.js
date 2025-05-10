const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const documentController = require("../controllers/documentController");
const authController = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/auth");
const upload = require("../config/multer");

// Auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Chat routes
router.get("/chat/history", authenticate, chatController.getChatHistory);
router.post("/chat/message", authenticate, chatController.handleUserQuery);

// Document routes (admin only)
router.post(
  "/documents",
  authenticate,
  authorize(["admin"]),
  upload.single("document"),
  documentController.uploadDocument
);
router.get(
  "/documents",
  authenticate,
  authorize(["admin"]),
  documentController.getDocuments
);

module.exports = router;
