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

async function getSession(sessionId){

    const {data,error}=await supabase
        .from("chat_sessions")
        .select("*")
        .eq("id",sessionId)
        .single();


    if(error){
        throw error;
    }


    return data;
}

async function updateSessionTitle(sessionId, title){

    const {data,error}=await supabase
        .from("chat_sessions")
        .update({ title })
        .eq("id",sessionId)
        .select()
        .single();


    if(error){
        throw error;
    }


    return data;
}

async function ensureSessionTitle(sessionId, message){

    const session = await getSession(sessionId);

    if(session.title && session.title.trim()){
        return session;
    }

    const title = await aiService.generateTitle(message);

    return await updateSessionTitle(
        sessionId,
        title || "New Chat"
    );
}

async function generateAIResponse(sessionId, message){

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

async function deleteSession(sessionId){

    const {error:messagesError}=await supabase
        .from("messages")
        .delete()
        .eq("session_id",sessionId);


    if(messagesError){
        throw messagesError;
    }


    const {error:sessionError}=await supabase
        .from("chat_sessions")
        .delete()
        .eq("id",sessionId);


    if(sessionError){
        throw sessionError;
    }


    return {
        id: sessionId
    };
}

module.exports={
    createSession,
    saveMessage,
    getMessages,
    getSession,
    ensureSessionTitle,
    generateAIResponse,
    getSessions,
    deleteSession
};
