import express from 'express';
import productRoute from './routes/productRoute.js';
import authRoute from "./routes/authRoute.js"
import cartRoute from './routes/cartRoute.js';
const app = express();


app.use(express.json());

app.use("/product", productRoute);
app.use("/auth", authRoute);
app.use("/cart", cartRoute)


export default app;