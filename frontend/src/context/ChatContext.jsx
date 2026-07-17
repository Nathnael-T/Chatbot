import { createContext, useContext, useEffect, useState } from "react";

import {
    startChatSession,
    sendChatMessage,
    loadChatMessages,
    loadSessions
} from "../services/chatService";


const ChatContext = createContext();


export function ChatProvider({ children }) {

    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        initializeChat();
    }, []);


    async function initializeChat() {

        const allSessions = await loadSessions();

        setSessions(allSessions);


        const savedSessionId = localStorage.getItem(
            "activeSessionId"
        );


        const savedSessionExists = allSessions.some(
            session => session.id === savedSessionId
        );


        if(savedSessionExists){

            await selectSession(savedSessionId);

            return;

        }


        if(allSessions.length > 0){

            await selectSession(allSessions[0].id);

            return;

        }


        await createNewChat();

    }


    async function createNewChat(){

        const session = await startChatSession();


        setSessionId(session.id);


        localStorage.setItem(
            "activeSessionId",
            session.id
        );


        setMessages([]);


        setSessions(prev => [
            session,
            ...prev
        ]);

    }


    async function selectSession(id){

        setSessionId(id);


        localStorage.setItem(
            "activeSessionId",
            id
        );


        const history = await loadChatMessages(id);


        setMessages(history);

    }


    async function send(message){

        if(!sessionId) return;


        setLoading(true);


        try {

            const response = await sendChatMessage(
                sessionId,
                message
            );


            setMessages(prev => [
                ...prev,
                response.userMessage,
                response.aiMessage
            ]);


        } finally {

            setLoading(false);

        }

    }


    return (

        <ChatContext.Provider
            value={{
                sessionId,
                messages,
                sessions,
                loading,
                send,
                createNewChat,
                selectSession
            }}
        >

            {children}

        </ChatContext.Provider>

    );

}


export function useChatContext(){

    return useContext(ChatContext);

}