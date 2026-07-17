const API_URL = "http://localhost:8080/api/chat";

export async function createSession() {
    const response = await fetch(`${API_URL}/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Failed to create chat session");
    }

    return await response.json();
}


export async function sendMessage(sessionId, message) {
    const response = await fetch(`${API_URL}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sessionId,
            message
        })
    });

    if (!response.ok) {
        throw new Error("Failed to send message");
    }

    return await response.json();
}


export async function getMessages(sessionId) {
    const response = await fetch(`${API_URL}/${sessionId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch messages");
    }

    return await response.json();
}

export async function getSessions() {
    const response = await fetch(
        "http://localhost:8080/api/chat/sessions"
    );

    if (!response.ok) {
        throw new Error("Failed to load conversations");
    }

    return await response.json();
}