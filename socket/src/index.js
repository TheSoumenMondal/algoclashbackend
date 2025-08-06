import express from "express";
import http from "http";
import { Server } from "socket.io";
import redisCache from "./config/redisConfig.js";

const app = express();
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5500",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("addUser", async (userId) => {
    await redisCache.set(userId, socket.id);
    console.log(`Set in Redis: ${userId} => ${socket.id}`);
  });

  socket.on("getId", async (userId, callback) => {
    const storedSocketId = await redisCache.get(userId);
    console.log(`Fetched from Redis: ${userId} => ${storedSocketId}`);
    callback(storedSocketId);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

app.post("/", async (req, res) => {
  const { userId, payload } = req.body;
  console.log("Received payload:", payload);
  if (!userId || !payload) {
    res.status(404).json({
      message: "User ID not found.",
    });
  }

  const socketRoom = await redisCache.get(userId);

  io.to(socketRoom).emit("getPayload", payload);
  res.status(200).json({
    message: "Successfully send the payload.",
  });
});

server.listen(3001, () => {
  console.log("Server is running on PORT : 3001");
});
