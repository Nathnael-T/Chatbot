const express = require("express");

const router = express.Router();

const controller = require("../controllers/chatController");


router.post(
    "/session",
    controller.createChatSession
);


router.post(
    "/message",
    controller.sendMessage
);

router.get(
    "/sessions",
    controller.getChatSessions
);

router.delete(
    "/:sessionId",
    controller.deleteChatSession
);

router.get(
    "/:sessionId",
    controller.getChatHistory
);


module.exports = router;
