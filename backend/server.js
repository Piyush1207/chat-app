const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Message = require("./models/Message");
const messageRoutes = require("./routes/messages");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Chat server is running!");
});

// Track online users { socketId: { username, color, avatar } }
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  // User joins the chat
  socket.on("user_joined", ({ username, color, avatar }) => {
    onlineUsers[socket.id] = { username, color, avatar };
    console.log(`👤 ${username} joined`);

    io.emit("online_users", Object.values(onlineUsers));
    io.emit("receive_message", {
      system: true,
      text: `${username} joined the chat 👋`,
      time: new Date().toLocaleTimeString(),
    });
  });

  // User sends a message
  socket.on("send_message", async (data) => {
    try {
      const message = new Message({
        username: data.username,
        color: data.color,
        avatar: data.avatar,
        text: data.text,
        time: data.time,
      });
      await message.save();
      io.emit("receive_message", data);
    } catch (err) {
      console.log("❌ Error saving message:", err);
    }
  });

  // Typing indicator
  socket.on("typing", (username) => {
    socket.broadcast.emit("display_typing", username);
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("display_typing", null);
  });

  // User disconnects
  socket.on("disconnect", () => {
    const user = onlineUsers[socket.id];
    delete onlineUsers[socket.id];
    console.log(`❌ ${user?.username} disconnected`);

    io.emit("online_users", Object.values(onlineUsers));
    io.emit("receive_message", {
      system: true,
      text: `${user?.username} left the chat 👋`,
      time: new Date().toLocaleTimeString(),
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));