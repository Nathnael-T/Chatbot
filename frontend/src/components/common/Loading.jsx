import Spinner from "../ui/Spinner";


function Loading({

    text = "Loading..."

}) {


    return (

        <div

            className="
                min-h-screen
                flex
                flex-col
                items-center
                justify-center
                gap-4

                bg-[#071216]
                text-white
            "

        >

            <Spinner size="lg"/>


            <p className="
                text-gray-400
                animate-pulse
            ">

                {text}

            </p>


        </div>

    );

}


export default Loading;