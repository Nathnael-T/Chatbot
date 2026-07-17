function MessageBubble({ message }) {
    const isUser = message.sender === "user";

    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`
                    max-w-[75%]
                    px-5
                    py-3
                    rounded-2xl
                    text-sm
                    leading-relaxed
                    ${
                        isUser
                            ? "bg-[#00AFB5] text-black rounded-br-md"
                            : "bg-white/5 border border-white/10 text-gray-200 rounded-bl-md"
                    }
                `}
            >
                {message.content}
            </div>
        </div>
    );
}

export default MessageBubble;