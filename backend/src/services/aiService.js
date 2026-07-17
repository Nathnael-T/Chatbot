const groq = require("../config/groq");

async function generateResponse(messages) {
    try {

        const response = await groq.chat.completions.create({

            model: "llama-3.1-8b-instant",

            messages: [
                {
                    role: "system",
                    content: `
You are an intelligent AI assistant.

Your goal is to provide accurate, helpful, and concise responses.

Guidelines:
- Maintain context throughout the conversation.
- Answer questions clearly and logically.
- If you don't know the answer, say so instead of making something up.
- Explain complex topics in a simple way when appropriate.
- Be friendly, professional, and conversational.
- Format responses neatly when it improves readability.
`
                },

                ...messages.map(message => ({
                    role: message.sender === "assistant"
                        ? "assistant"
                        : "user",

                    content: message.content
                }))
            ]

        });

        return response.choices[0].message.content;

    } catch (error) {

        console.error("AI Error:", error.message);

        throw new Error("Failed to generate AI response");
    }
}

async function generateTitle(message) {
    try {

        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "Create a concise conversation title from the user's first message. Return only the title, no quotes, no punctuation at the end, maximum 6 words."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.2,
            max_tokens: 24
        });

        return response.choices[0].message.content
            .replace(/[\"']/g, "")
            .replace(/[.!?]+$/g, "")
            .trim()
            .slice(0, 80);

    } catch (error) {

        console.error("Title AI Error:", error.message);

        return message
            .trim()
            .replace(/\s+/g, " ")
            .slice(0, 48) || "New Chat";
    }
}

module.exports = {
    generateResponse,
    generateTitle
};
