import { useState } from "react";
import { IoSend } from "react-icons/io5";

function ChatInput({ onSend, loading }) {
    const [message, setMessage] = useState("");

    async function handleSend() {
        const text = message.trim();

        if (!text || loading) return;

        setMessage("");

        await onSend(text);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="border-t border-white/10 p-5 bg-[#071216]">
            <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">

                <textarea
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message AI..."
                    className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-500 outline-none"
                />

                <button
                    onClick={handleSend}
                    disabled={loading}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00AFB5] text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <IoSend size={18} />
                </button>

            </div>
        </div>
    );
}

export default ChatInput;