import * as dotenv from "dotenv";
dotenv.config();

import * as url from "url";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import helmt from "helmet";
import morgan from "morgan";
import multer from "multer";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import courseRoute from "./routes/course.js";
import connectRoute from "./routes/connection.js";
import commentROute from "./routes/comment.js";
import conversationRoute from "./routes/conversations.js";
import messageRoute from "./routes/messages.js";
import settingRoute from "./routes/sets.js";
import groupRoute from "./routes/groups.js";
import searchRoute from "./routes/search.js";
import cookieParser from "cookie-parser";

//Setup Express
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json()); // Setup JSON parsing for the request body
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

// Make the "public" folder available statically
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
app.use("/images", express.static(path.join(dirname, "public/images")));

//Set up upload file api
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    const fileData = {
      name: req.file.originalname,
      url: "http://localhost:3000/images/" + req.file.filename, 
    };
    res.status(200).json(fileData);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

// Setup API routes.
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/course", courseRoute);
app.use("/api/connection", connectRoute);
app.use("/api/comment", commentROute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/set", settingRoute);
app.use("/api/group", groupRoute);
app.use("/api/search", searchRoute);

// Start the server running. Once the server is running, the given function will be called, which will
// log a simple message to the server console. Any console.log() statements in your node.js code
// can be seen in the terminal window used to run the server.
// await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
app.listen(port, () => console.log(`App server listening on port ${port}!`));
