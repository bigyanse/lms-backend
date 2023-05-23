import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "https://library-management-system-lms.netlify.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/route.auth";
import booksRoutes from "./routes/route.books";
app.use("/auth", authRoutes);
app.use("/books", booksRoutes);

app.listen(PORT, () => {
	console.log("App is running at http://localhost:5000");
});
