import Sidebar from "../sidebar/Sidebar";
import { useChat } from "../../hooks/useChat";


function Layout({ children }) {

    const {
        sessions,
        createNewChat,
        selectSession
    } = useChat();


    return (

        <div className="
            flex
            h-screen
            w-screen
            overflow-hidden
            bg-[#071216]
            text-white
        ">

            <Sidebar
                sessions={sessions}
                onNewChat={createNewChat}
                onSelectSession={selectSession}
            />


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