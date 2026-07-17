import Button from "../ui/Button";
import { Plus } from "lucide-react";


function NewChatButton({ onClick }){


    return (

        <Button

            className="
                w-full
            "

            icon={<Plus size={18}/>}

            onClick={onClick}

        >

            New Conversation

        </Button>

    );

}


export default NewChatButton;
