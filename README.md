# 💬 Public Chat Room

A real-time public chat application built with the **MERN stack** and **Tailwind CSS**, powered by **Socket.io** for live messaging.

![Tech Stack](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tech Stack](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Tech Stack](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## ✨ Features

- 🚀 Real-time messaging with Socket.io
- 💾 Chat history saved to MongoDB (last 50 messages load on join)
- 👥 Live online users sidebar
- ✍️ Typing indicator with animated dots
- 🔔 System notifications when users join or leave
- 🎨 Clean dark UI built with Tailwind CSS
- 📱 Responsive layout

---

## 🗂️ Project Structure

```
chat-app/
├── server/                  # Backend
│   ├── models/
│   │   └── Message.js       # Mongoose message schema
│   ├── routes/
│   │   └── messages.js      # REST API for chat history
│   ├── .env                 # Environment variables
│   └── server.js            # Express + Socket.io server
│
└── client/                  # Frontend
    └── src/
        ├── components/
        │   ├── JoinScreen.jsx    # Username entry screen
        │   ├── ChatBox.jsx       # Main chat window
        │   ├── MessageInput.jsx  # Message input + send button
        │   └── OnlineUsers.jsx   # Online users sidebar
        ├── App.jsx
        └── main.jsx
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Real-time | Socket.io |
| HTTP Client | Axios |

---

## ⚡ Socket.io Events

| Event | Direction | Purpose |
|---|---|---|
| `user_joined` | Client → Server | User enters with a username |
| `send_message` | Client → Server | User sends a message |
| `receive_message` | Server → Client | Broadcast message to all users |
| `typing` | Client → Server | User is typing |
| `stop_typing` | Client → Server | User stopped typing |
| `display_typing` | Server → Client | Show typing indicator |
| `online_users` | Server → Client | Updated list of online users |
