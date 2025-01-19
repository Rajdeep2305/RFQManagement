import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import os from "os";

import connectDB from "./config/mongodb.js";
import authRouter from "./Routes/authRoute.js";
import userRouter from "./Routes/userRoute.js";
import vendorRouter from "./Routes/vendorRoutes.js";
import rfqRoutes from "./Routes/rfqRoutes.js";

const app = express();
const port = process.env.PORT || 8000;
connectDB();

// Configure CORS
const corsOptions = {
  origin: process.env.APP_URL, // Replace with your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow cookies
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// API Endpoints
app.get("/", (req, res) => res.send("This is working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/vender", vendorRouter);
app.use("/api/rfq", rfqRoutes);

app.listen(port, () =>
  console.log(
    `Server running at http://localhost:${port}/`
  )
);
