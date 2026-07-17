import MessageBubble from "./MessageBubble";

function ChatWindow({ messages, loading }) {
    return (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-gray-500">
                    Start a conversation
                </div>
            )}

            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                />
            ))}

            {loading && (
                <div className="text-sm text-gray-400">
                    AI is thinking...
                </div>
            )}

        </div>
    );
}

export default ChatWindow;