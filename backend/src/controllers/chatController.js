const chatService=require("../services/chatService");


async function createChatSession(req,res){

    try{

        const session=await chatService.createSession();

        res.json(session);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

}



async function sendMessage(req,res){

    try{

        const {
            sessionId,
            message
        } = req.body;


        const userMessage =
            await chatService.saveMessage(
                sessionId,
                message,
                "user"
            );


        const aiMessage =
            await chatService.generateAIResponse(
                sessionId,
                message
            );


        res.json({
            userMessage,
            aiMessage
        });


    }catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

}


async function getChatSessions(req,res){

    try{

        const sessions = await chatService.getSessions();

        res.json(sessions);

    }catch(error){

        res.status(500).json({
            error:error.message
        });

    }

}
 async function getChatHistory(req, res){

    try{

        const messages = await chatService.getMessages(
            req.params.sessionId
        );

        res.json(messages);

    }catch(error){

        res.status(500).json({
            error: error.message
        });

    }

}


module.exports = {
    createChatSession,
    sendMessage,
    getChatSessions,
    getChatHistory
};