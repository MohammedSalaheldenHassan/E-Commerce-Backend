import app from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";


config();
const port = 8080;

const startServer = async ()=>{
    await connectDB;
    app.listen(port , (req, res) =>{
        console.log(`sever running on port: ${port}`);
    });
}

startServer();