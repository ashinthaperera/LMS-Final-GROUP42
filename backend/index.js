/* global process */
/* global __dirname */

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const environment = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${environment}` });

const cookieParser = require("cookie-parser");
const app = express();
//const cors = require('cors');

const {Server} = require("socket.io"); //web socket
const { createServer } = require("http");
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);

  socket.on("material_add", (data) => {
    socket.broadcast.emit("material_add", data);
  });
  
  socket.on("submission_add", (data) => {
    socket.broadcast.emit("submission_add", data);
  });
});

//file upload
app.use("/files", express.static("files"));
//mod sub up
app.use("/modSubfiles", express.static("modSubfiles"));

app.use("/studmodSubfiles", express.static("studmodSubfiles"));

//security
var cors = require("cors");
// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "your-production-domain"],
  })
);

app.use(cookieParser());


//add router
// const studRouter = require("./routes/studRouter");
const studentRouter = require("./routes/studentRouter");
const moduleRouter = require("./routes/moduleRouter");
const lectureRouter = require("./routes/lectureRouter");
const degreeRouter = require("./routes/degreeRouter");

const lecMaterialRouter = require("./routes/lecMaterialRouter");
const lecModuleSubRouter = require("./routes/lecModuleSubRouter");
const studModuleSubRouter = require("./routes/studModuleSubRouter");
const userRouter = require("./routes/userRoutes");

// const userRoutes = require('./routes/userRoutes');

dotenv.config();
app.use(express.json());

// welcome router
app.get("/welcome", (req, res) => {
  res.status(200).send({message: "Welcome to our Learning Management System!"})
});
// //use router

app.use(studentRouter);
app.use(moduleRouter);
app.use(lectureRouter);
app.use(degreeRouter);

app.use(lecMaterialRouter);
app.use(lecModuleSubRouter);
app.use(studModuleSubRouter);

app.use("/user", userRouter);

// Export the app for testing
module.exports = app;

//checking the connection of db
mongoose
  .connect(process.env.Database)
  .then(() => {
    console.log("Database connection Done");
    //catch an error if the db conn fails
  })
  .catch((err) => {
    console.log(err);
  });

//define the backend port for sending data
// app.listen(5000, () => {
//   console.log("Server is Running");
// });

httpServer.listen(5000, () => {
  console.log("Socket server listening on port 5000");
});

