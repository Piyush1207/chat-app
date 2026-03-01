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

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/chatapp?retryWrites=true&w=majority
```

> For local MongoDB use: `MONGO_URI=mongodb://localhost:27017/chatapp`

Start the server:

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB connected
```

### 3. Setup the Frontend

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

---

## 🧪 Testing the App

1. Open `http://localhost:5173` in **two different browser tabs**
2. Enter different usernames in each tab
3. Start chatting — messages appear in real-time across both tabs!
4. Notice the typing indicator and online users list updating live

---

## 🌐 Deployment

| Service | Purpose |
|---|---|
| [Render](https://render.com) | Deploy the Node.js backend |
| [Vercel](https://vercel.com) | Deploy the React frontend |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |

> After deploying, update the Socket.io connection URL in `client/src/App.jsx` and the API URL in `client/src/components/ChatBox.jsx` to point to your live backend URL.

---

## 📸 Screenshots

> Add screenshots of your app here!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Built with guidance and step-by-step planning using [Claude](https://claude.ai) by Anthropic.
