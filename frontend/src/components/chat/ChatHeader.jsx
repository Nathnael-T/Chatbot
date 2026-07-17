function ChatHeader() {
    return (
        <header className="h-16 px-6 flex items-center justify-between border-b border-white/10 bg-[#071216]/80 backdrop-blur-xl">

            <div className="flex items-center gap-3">

                <div className="relative">
                    <div className="h-3 w-3 rounded-full bg-[#00AFB5]" />

                    <div className="absolute inset-0 h-3 w-3 rounded-full bg-[#00AFB5] animate-ping" />
                </div>


                <div>
                    <h2 className="text-lg font-semibold text-white">
                        AI Assistant
                    </h2>

                    <p className="text-xs text-gray-400">
                        Online
                    </p>
                </div>

            </div>


            <div className="flex items-center gap-3">

                <button className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition">
                    Settings
                </button>

            </div>

        </header>
    );
}

export default ChatHeader;