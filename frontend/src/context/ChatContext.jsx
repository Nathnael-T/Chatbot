import { createContext, useContext, useEffect, useRef, useState } from "react";

import {
    startChatSession,
    sendChatMessage,
    loadChatMessages,
    loadSessions,
    deleteChatSession
} from "../services/chatService";


const ChatContext = createContext();


export function ChatProvider({ children }) {

    const [sessionId, setSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const activeSessionRef = useRef(null);
    const selectionRequestRef = useRef(0);


    useEffect(() => {
        initializeChat();
    }, []);


    function activateSession(id){

        activeSessionRef.current = id;
        setSessionId(id);

        localStorage.setItem(
            "activeSessionId",
            id
        );

    }


    function updateSession(updatedSession){

        if(!updatedSession){
            return;
        }

        setSessions(prev => prev.map(session => (
            session.id === updatedSession.id
                ? updatedSession
                : session
        )));

    }


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


        selectionRequestRef.current += 1;
        activateSession(session.id);


        setMessages([]);


        setSessions(prev => [
            session,
            ...prev
        ]);

    }


    async function selectSession(id){

        const requestId = selectionRequestRef.current + 1;
        selectionRequestRef.current = requestId;

        activateSession(id);


        const history = await loadChatMessages(id);


        if(selectionRequestRef.current === requestId){
            setMessages(history);
        }

    }


    async function deleteConversation(id){

        await deleteChatSession(id);

        const remainingSessions = sessions.filter(
            session => session.id !== id
        );

        setSessions(remainingSessions);

        if(sessionId !== id){
            return;
        }

        if(remainingSessions.length > 0){
            await selectSession(remainingSessions[0].id);
            return;
        }

        localStorage.removeItem("activeSessionId");
        await createNewChat();

    }


    async function send(message){

        if(!sessionId) return;

        const targetSessionId = sessionId;


        setLoading(true);


        try {

            const response = await sendChatMessage(
                targetSessionId,
                message
            );


            updateSession(response.session);

            if(activeSessionRef.current === targetSessionId){
                setMessages(prev => [
                    ...prev,
                    response.userMessage,
                    response.aiMessage
                ]);
            }


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
                selectSession,
                deleteConversation
            }}
        >

            {children}

        </ChatContext.Provider>

    );

}


export function useChatContext(){

    return useContext(ChatContext);

}
