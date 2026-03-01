import { useState, useRef, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ socket, username, userColor, userAvatar }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const typingTimeoutRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = () => {
    if (!text.trim()) return;
    if (!username) return;

    const messageData = {
      username,
      color: userColor,
      avatar: userAvatar,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", messageData);
    socket.emit("stop_typing");
    setText("");
    setShowEmojiPicker(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
    if (e.key === "Escape") setShowEmojiPicker(false);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("typing", username);
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing");
    }, 1500);
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative px-4 py-4 bg-gray-900 border-t border-gray-700">

      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-20 left-4 z-50 shadow-2xl rounded-2xl overflow-hidden"
        >
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme="dark"
            searchPlaceholder="Search emoji..."
            width={320}
            height={400}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-3">

        {/* Emoji toggle button */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className={`text-2xl transition-all hover:scale-110 active:scale-95 p-1 rounded-lg ${
            showEmojiPicker ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          title="Pick an emoji"
        >
          😊
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all p-3 rounded-xl"
          style={{ backgroundColor: userColor }}
        >
          <svg
            className="w-5 h-5 text-white rotate-90"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;