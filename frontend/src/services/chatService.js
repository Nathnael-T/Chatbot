import {
    createSession,
    sendMessage,
    getMessages,
    getSessions
} from "../api/chatApi";


export async function startChatSession() {
    return await createSession();
}


export async function sendChatMessage(sessionId, message) {
    return await sendMessage(sessionId, message);
}


export async function loadChatMessages(sessionId) {
    return await getMessages(sessionId);
}


export async function loadSessions() {
    return await getSessions();
}