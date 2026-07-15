import app from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";


config();
const port = 8080;

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

const startServer = async ()=>{
    await connectDB;
    app.listen(port , (req, res) =>{
        console.log(`sever running on port: ${port}`);
    });
}

startServer();