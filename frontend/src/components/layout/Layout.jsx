import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../sidebar/Sidebar";
import { useChat } from "../../hooks/useChat";


function Layout({ children }) {

    const {
        sessionId,
        sessions,
        createNewChat,
        selectSession,
        deleteConversation
    } = useChat();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function handleNewChat() {
        await createNewChat();
        setSidebarOpen(false);
    }

    async function handleSelectSession(id) {
        await selectSession(id);
        setSidebarOpen(false);
    }


    return (

        <div className="
            flex
            h-screen
            w-screen
            overflow-hidden
            bg-[#071216]
            text-white
        ">

            <div className="hidden md:block">
                <Sidebar
                    sessions={sessions}
                    activeSessionId={sessionId}
                    onNewChat={handleNewChat}
                    onSelectSession={handleSelectSession}
                    onDeleteSession={deleteConversation}
                />
            </div>

            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="
                    fixed
                    left-4
                    top-4
                    z-30
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#081418]/90
                    text-white
                    shadow-[0_0_28px_rgba(0,175,181,0.14)]
                    backdrop-blur-xl
                    transition
                    hover:border-[#00AFB5]/50
                    md:hidden
                "
                aria-label="Open conversations"
            >
                <Menu size={20} />
            </button>

            {sidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Close conversations"
                    />

                    <div className="absolute left-0 top-0 h-full">
                        <Sidebar
                            sessions={sessions}
                            activeSessionId={sessionId}
                            onNewChat={handleNewChat}
                            onSelectSession={handleSelectSession}
                            onDeleteSession={deleteConversation}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/10
                            text-white
                        "
                        aria-label="Close conversations"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}


            <main className="
                flex-1
                overflow-y-auto
            ">

                {children}

            </main>


        </div>

    );

}


export default Layout;
