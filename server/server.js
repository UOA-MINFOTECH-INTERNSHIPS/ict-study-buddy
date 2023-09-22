import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
import mongoose from "mongoose";
import cors from "cors";
import helmt from "helmet";
import morgan from "morgan";
import multer from "multer";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import cookieParser from "cookie-parser";
//Setup Express
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Middleware
// Setup JSON parsing for the request body
app.use(express.json());

app.use(
  cors({
    origin: ["https://study-buddy-steel.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(
  helmt({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("common"));
app.use(cookieParser());

//Set up sotrage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

//Set up upload file api
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    res.status(200).json(file.filename);
  } catch (error) {
    console.log("error", error);
  }
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Setup API routes.
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
// await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
app.listen(port, () => console.log(`App server listening on port ${port}!`));
