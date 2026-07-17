import { MessageSquare, Trash2 } from "lucide-react";

function ConversationItem({
    session,
    active,
    onSelect,
    onDelete
}) {

    const title = session.title || "New Chat";
    const createdAt = session.created_at
        ? new Date(session.created_at).toLocaleDateString()
        : "";

    function handleDelete(event) {
        event.stopPropagation();

        const confirmed = window.confirm(
            `Delete "${title}"?`
        );

        if(confirmed){
            onDelete(session.id);
        }
    }

    return (
        <div
            className={`
                group
                flex
                w-full
                items-center
                gap-2
                rounded-xl
                border
                p-1
                transition
                duration-200
                ${
                    active
                        ? "border-[#00AFB5]/50 bg-[#00AFB5]/10 shadow-[0_0_24px_rgba(0,175,181,0.16)]"
                        : "border-transparent hover:border-white/10 hover:bg-white/5"
                }
            `}
        >
            <button
                type="button"
                onClick={() => onSelect(session.id)}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-lg p-2 text-left"
            >
                <span className={`
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    ${
                        active
                            ? "bg-[#00AFB5]/20 text-[#00AFB5]"
                            : "bg-white/5 text-gray-400"
                    }
                `}>
                    <MessageSquare size={17} />
                </span>

                <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-white">
                        {title}
                    </span>

                    <span className="mt-1 block text-xs text-gray-500">
                        {createdAt}
                    </span>
                </span>
            </button>

            <button
                type="button"
                onClick={handleDelete}
                className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-gray-500
                    opacity-0
                    transition
                    hover:bg-red-500/10
                    hover:text-red-300
                    group-hover:opacity-100
                    focus:opacity-100
                    focus:outline-none
                "
                aria-label={`Delete ${title}`}
            >
                <Trash2 size={15} />
            </button>
        </div>
    );
}

export default ConversationItem;
