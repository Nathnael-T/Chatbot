const supabase = require("../config/supabase");
const aiService = require("./aiService");


async function createSession(){

    const {data,error}=await supabase
        .from("chat_sessions")
        .insert({})
        .select()
        .single();


    if(error){
        throw error;
    }


    return data;
}



async function saveMessage(sessionId, content, sender){

    const {data,error}=await supabase
        .from("messages")
        .insert({
            session_id: sessionId,
            content,
            sender
        })
        .select()
        .single();


    if(error){
        throw error;
    }


    return data;
}



async function getMessages(sessionId){

    const {data,error}=await supabase
        .from("messages")
        .select("*")
        .eq("session_id",sessionId)
        .order("created_at", { ascending: false })
        .limit(20);


    if(error){
        throw error;
    }


    // Reverse so oldest messages come first
    return data.reverse();
}

async function generateAIResponse(sessionId, message){

    const history = await getMessages(sessionId);


    // Remove current user message
    history.pop();


    const messages = history.map((msg)=>({
        role: msg.sender,
        content: msg.content
    }));


    messages.push({
        role:"user",
        content:message
    });


   const conversation = await getMessages(sessionId);


    const aiResponse = await aiService.generateResponse(
        conversation
    );


    const savedResponse = await saveMessage(
        sessionId,
        aiResponse,
        "assistant"
    );


    return savedResponse;
}

async function getSessions(){

    const {data,error}=await supabase
        .from("chat_sessions")
        .select("*")
        .order("created_at",{ascending:false});


    if(error){
        throw error;
    }


    return data;
}

module.exports={
    createSession,
    saveMessage,
    getMessages,
    generateAIResponse,
    getSessions
};