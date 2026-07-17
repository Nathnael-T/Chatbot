import { useMemo, useState } from "react";
import Card from "../ui/Card";
import ConversationItem from "./ConversationItem";
import NewChatButton from "./NewChatButton";
import SearchChats from "./SearchChats";

function Sidebar({
    sessions,
    activeSessionId,
    onNewChat,
    onSelectSession,
    onDeleteSession
}) {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredSessions = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        if(!normalizedSearch){
            return sessions;
        }

        return sessions.filter((session) => {
            const title = session.title || "New Chat";
            const createdAt = session.created_at
                ? new Date(session.created_at).toLocaleDateString()
                : "";

            return `${title} ${createdAt}`
                .toLowerCase()
                .includes(normalizedSearch);
        });
    }, [sessions, searchTerm]);

    return (
        <aside className="h-full w-80 shrink-0 border-r border-white/10 bg-[#081418] p-4 max-lg:w-72 max-md:w-[min(22rem,calc(100vw-2rem))]">

            <Card className="h-full flex flex-col p-5">

                <div className="flex flex-col h-full">

                    <div>
                        <h1 className="text-2xl font-bold text-[#00AFB5]">
                            AI Core
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            Intelligent Conversation System
                        </p>
                    </div>


                    <div className="mt-6 space-y-3">

                        <NewChatButton onClick={onNewChat} />

                        <SearchChats
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />

                    </div>


                    <div className="flex-1 mt-6 space-y-2 overflow-y-auto pr-1">

                        {filteredSessions.length === 0 ? (

                            <p className="text-gray-500 text-sm text-center">
                                {searchTerm ? "No matching conversations" : "No conversations yet"}
                            </p>

                        ) : (

                            filteredSessions.map((session) => (
                                <ConversationItem
                                    key={session.id}
                                    session={session}
                                    active={session.id === activeSessionId}
                                    onSelect={onSelectSession}
                                    onDelete={onDeleteSession}
                                />
                            ))

                        )}

                    </div>

                </div>

            </Card>

        </aside>
    );
}

export default Sidebar;
