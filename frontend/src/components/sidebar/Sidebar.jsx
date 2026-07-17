import Card from "../ui/Card";
import NewChatButton from "./NewChatButton";
import SearchChats from "./SearchChats";

function Sidebar({ sessions, onNewChat, onSelectSession }) {

    return (
        <aside className="w-80 h-full p-4 border-r border-white/10 bg-[#081418]">

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

                        <SearchChats />

                    </div>


                    <div className="flex-1 mt-6 space-y-2 overflow-y-auto">

                        {sessions.length === 0 ? (

                            <p className="text-gray-500 text-sm text-center">
                                No conversations yet
                            </p>

                        ) : (

                            sessions.map((session) => (

                                <div
                                    key={session.id}
                                    onClick={() => onSelectSession(session.id)}
                                    className="
                                        p-3
                                        rounded-lg
                                        hover:bg-white/5
                                        cursor-pointer
                                        text-sm
                                        transition
                                    "
                                >

                                    <p className="text-white truncate">
                                        {session.title || "New Chat"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(
                                            session.created_at
                                        ).toLocaleDateString()}
                                    </p>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </Card>

        </aside>
    );
}

export default Sidebar;