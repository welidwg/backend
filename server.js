import express from "express";
import sequelize from "./databases/sequelize.js";
import bodyParser from "body-parser";
import userRouter from "./routes/UserRoutes.js";
import carRouter from "./routes/CarRoutes.js";
import cors from "cors";
import path from "path";
const app = express();
const port = process.env.PORT || 8899;
const __filename = new URL(
    import.meta.url).pathname;
const __dirname = path.dirname(__filename);
sequelize
    .sync()
    .then(() => {
        console.log("db synced");
    })
    .catch((err) => {
        console.log(err);
    });
//user routes
app.use(bodyParser.json());
app.use(cors());
app.use("/api/", userRouter);
app.use("/api/", carRouter);
app.use("/uploads", express.static("./uploads"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});