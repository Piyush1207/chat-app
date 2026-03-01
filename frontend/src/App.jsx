import { useState } from "react";
import { io } from "socket.io-client";
import JoinScreen from "./components/JoinScreen";
import ChatBox from "./components/ChatBox";
import OnlineUsers from "./components/OnlineUsers";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [userColor, setUserColor] = useState("#6366f1");
  const [userAvatar, setUserAvatar] = useState("");
  const [joined, setJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Now receives avatar URL directly from JoinScreen
  const handleJoin = (name, color, avatar) => {
    setUsername(name);
    setUserColor(color);
    setUserAvatar(avatar);
    setJoined(true);
    socket.emit("user_joined", { username: name, color, avatar });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {!joined ? (
        <JoinScreen onJoin={handleJoin} />
      ) : (
        <div className="flex w-full max-w-5xl h-[90vh] gap-4 p-4">
          <ChatBox
            socket={socket}
            username={username}
            userColor={userColor}
            userAvatar={userAvatar}
            setOnlineUsers={setOnlineUsers}
          />
          <OnlineUsers users={onlineUsers} />
        </div>
      )}
    </div>
  );
}

export default App;