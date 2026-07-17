import { Loader2 } from "lucide-react";


function Button({
    children,
    variant = "primary",
    size = "md",
    icon,
    loading = false,
    disabled = false,
    className = "",
    onClick,
    type = "button"
}) {


    const variants = {

        primary:
            `
            bg-[#00AFB5]
            text-white
            shadow-[0_0_20px_rgba(0,175,181,0.25)]
            hover:bg-[#29D5DB]
            hover:shadow-[0_0_35px_rgba(0,175,181,0.45)]
            `,


        secondary:
            `
            bg-[#15262D]
            text-white
            border
            border-[#1F3942]
            hover:bg-[#1B3139]
            `,


        ghost:
            `
            bg-transparent
            text-[#AAB6BC]
            hover:bg-white/5
            hover:text-white
            `,


        accent:
            `
            bg-[#EFD28D]
            text-[#071216]
            shadow-[0_0_20px_rgba(239,210,141,0.2)]
            hover:shadow-[0_0_35px_rgba(239,210,141,0.45)]
            `,


        danger:
            `
            bg-red-500/20
            text-red-400
            border
            border-red-500/30
            hover:bg-red-500/30
            `

    };


    const sizes = {

        sm:
            `
            px-3
            py-2
            text-sm
            rounded-lg
            `,


        md:
            `
            px-5
            py-3
            rounded-xl
            `,


        lg:
            `
            px-7
            py-4
            text-lg
            rounded-2xl
            `,


        icon:
            `
            p-3
            rounded-xl
            aspect-square
            `

    };



    return (

        <button

            type={type}

            disabled={disabled || loading}

            onClick={onClick}

            className={`
                inline-flex
                items-center
                justify-center
                gap-2

                font-medium

                transition-all
                duration-300

                active:scale-95

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${variants[variant]}

                ${sizes[size]}

                ${className}
            `}

        >

            {
                loading ? (

                    <Loader2
                        className="
                        h-5
                        w-5
                        animate-spin
                        "
                    />

                ) : (

                    icon && icon

                )
            }


            {children}


        </button>

    );

}


export default Button;
