const express=require("express");
require("dotenv").config();

const chatRoutes=require("./routes/chatRoutes");


const app=express();

const cors = require("cors");

app.use(cors({
    origin:"http://localhost:5173"
}));


app.use(express.json());


app.use(
    "/api/chat",
    chatRoutes
);


app.listen(
    process.env.PORT || 8080,
    ()=>{
        console.log(
            "Server running on port 8080"
        );
    }
);