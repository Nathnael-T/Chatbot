import Button from "../ui/Button";
import { Plus } from "lucide-react";


function NewChatButton(){


    return (

        <Button

            className="
                w-full
            "

            icon={<Plus size={18}/>}

        >

            New Conversation

        </Button>

    );

}


export default NewChatButton;