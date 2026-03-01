import { useEffect, useRef, useState } from "react";
import axios from "axios";
import MessageInput from "./MessageInput";
import { playNotificationSound } from "../utils/sound";

function ChatBox({ socket, username, userColor, userAvatar, setOnlineUsers }) {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const bottomRef = useRef(null);
  const isMutedRef = useRef(false);

  // Keep ref in sync with state
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  // Fetch chat history on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  // Socket.io listeners
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
      if (!data.system && data.username !== username && !isMutedRef.current) {
        playNotificationSound();
      }
    });

    socket.on("online_users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("display_typing", (user) => {
      setTypingUser(user);
    });

    return () => {
      socket.off("receive_message");
      socket.off("online_users");
      socket.off("display_typing");
    };
  }, [socket]);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUser]);

  return (
    <div className="flex flex-col flex-1 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">

      {/* Header */}
      <div className="bg-gray-900 px-6 py-4 flex items-center gap-3 border-b border-gray-700">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        <h2 className="text-lg font-semibold text-white">Public Chat Room</h2>

        {/* Right side — mute button + your avatar */}
        <div className="ml-auto flex items-center gap-3">

          {/* Mute / Unmute toggle */}
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            title={isMuted ? "Unmute notifications" : "Mute notifications"}
            className="text-gray-400 hover:text-white transition p-1.5 rounded-lg hover:bg-gray-700"
          >
            {isMuted ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0l-4-4H5a1 1 0 01-1-1v-2a1 1 0 011-1h3l4-4z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M18.364 5.636a9 9 0 010 12.728"
                />
              </svg>
            )}
          </button>

          {/* Your username */}
          <span className="text-gray-400 text-sm">{username}</span>

          {/* Your anime avatar */}
          <div
            className="w-9 h-9 rounded-full p-0.5 shrink-0"
            style={{ backgroundColor: userColor }}
          >
            <img
              src={userAvatar}
              alt={username}
              className="w-full h-full rounded-full bg-white object-cover"
            />
          </div>

        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-10">
            No messages yet. Be the first to say something! 👋
          </p>
        )}

        {messages.map((msg, index) => {
          // System messages
          if (msg.system) {
            return (
              <div key={index} className="flex justify-center">
                <span className="text-xs text-gray-500 bg-gray-700 px-3 py-1 rounded-full">
                  {msg.text}
                </span>
              </div>
            );
          }

          // Safety check
          if (!msg.username) return null;

          const isOwn = msg.username === username;
          const avatarColor = msg.color || "#6366f1";
          const avatarUrl =
            msg.avatar ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(msg.username)}`;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Anime Avatar */}
              <div
                className="w-9 h-9 rounded-full shrink-0 mb-1 p-0.5"
                style={{ backgroundColor: avatarColor }}
              >
                <img
                  src={avatarUrl}
                  alt={msg.username}
                  className="w-full h-full rounded-full bg-white object-cover"
                />
              </div>

              {/* Bubble + meta */}
              <div
                className={`flex flex-col gap-1 max-w-[65%] ${
                  isOwn ? "items-end" : "items-start"
                }`}
              >
                {/* Username (only for others) */}
                {!isOwn && (
                  <span
                    className="text-xs font-medium px-1"
                    style={{ color: avatarColor }}
                  >
                    {msg.username}
                  </span>
                )}

                {/* Bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    isOwn
                      ? "text-white rounded-br-sm"
                      : "bg-gray-700 text-gray-100 rounded-bl-sm"
                  }`}
                  style={isOwn ? { backgroundColor: avatarColor } : {}}
                >
                  {msg.text}
                </div>

                {/* Time */}
                <span className="text-xs text-gray-500 px-1">{msg.time}</span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {typingUser && (
          <div className="flex items-center gap-2 self-start">
            <div className="bg-gray-700 px-4 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
              <span className="text-xs text-gray-400">{typingUser} is typing</span>
              <div className="flex gap-1 ml-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        socket={socket}
        username={username}
        userColor={userColor}
        userAvatar={userAvatar}
      />
    </div>
  );
}

export default ChatBox;