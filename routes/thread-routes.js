const express = require("express");
const router = express.Router();
const threadController = require("../controllers/thread-controller");
const { default: OpenAI } = require("openai");
const openai = new OpenAI();

require("dotenv").config();

// Create a thread
router.route("/create").post(threadController.createThread);

// Create an Assistant

router.route("/assistant").post(threadController.createAssistant);
//Add message to thread & Retrieve Messages from a thread
router
  .route("/:threadId/message")
  .get(threadController.getResponse)
  .post(threadController.addMessage);

// Run thread
router.route("/:threadId/run").post(threadController.runThread);

router.route("/:threadId/steps/:runId").get(threadController.runSteps);
router.route("/:threadId/:runId").get(threadController.runStatus);
// Retrieve all threads for a user
router.route("/:userId").get(threadController.getThreads);

router.route("/:threadId/file/:file_id").get(threadController.createFileLink);

module.exports = router;
