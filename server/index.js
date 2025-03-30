import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import connectCloudinary from "./middleware/cloudinary.js";

app.use(cors(
	{
		origin:[process.env.FRONTEND_URL, process.env.ADMIN_URL],
		methods: ["GET", "POST", "PUT", "DELETE"],
	}
));
app.use(express.json());
connectCloudinary();

app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

// console.log();

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
