import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import { useChat } from "../hooks/useChat";

function ChatPage() {
    const {
        messages,
        loading,
        send
    } = useChat();

    return (
        <div className="flex h-full flex-col">

            <ChatHeader />

            <ChatWindow
                messages={messages}
                loading={loading}
            />

            <ChatInput
                onSend={send}
                loading={loading}
            />

        </div>
    );
}

export default ChatPage;