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

module.exports = {
    generateResponse
};