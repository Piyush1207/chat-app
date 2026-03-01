import { useState } from "react";

const COLORS = [
  { name: "indigo", hex: "#6366f1" },
  { name: "rose", hex: "#f43f5e" },
  { name: "emerald", hex: "#10b981" },
  { name: "amber", hex: "#f59e0b" },
  { name: "sky", hex: "#0ea5e9" },
  { name: "violet", hex: "#8b5cf6" },
  { name: "pink", hex: "#ec4899" },
  { name: "teal", hex: "#14b8a6" },
];

// Anime characters using reliable image sources
const ANIME_AVATARS = [
  {
    id: "naruto",
    name: "Naruto",
    url: "https://avatarfiles.alphacoders.com/364/thumb-150-364731.png",
  },
  {
    id: "sasuke",
    name: "Sasuke",
    url: "https://avatarfiles.alphacoders.com/375/thumb-150-375869.png",
  },
  {
    id: "itachi",
    name: "Itachi",
    url: "https://avatarfiles.alphacoders.com/339/thumb-150-339116.jpg",
  },
  {
    id: "kakashi",
    name: "Kakashi",
    url: "https://avatarfiles.alphacoders.com/336/thumb-150-336269.jpg",
  },
  {
    id: "luffy",
    name: "Luffy",
    url: "https://avatarfiles.alphacoders.com/375/thumb-150-375473.jpeg",
  },
  {
    id: "zoro",
    name: "Zoro",
    url: "https://avatarfiles.alphacoders.com/368/thumb-150-368040.jpg",
  },
  {
    id: "goku",
    name: "Goku",
    url: "https://avatarfiles.alphacoders.com/338/thumb-150-338143.jpg",
  },
  {
    id: "vegeta",
    name: "Vegeta",
    url: "https://avatarfiles.alphacoders.com/371/thumb-150-371663.png",
  },
  {
    id: "levi",
    name: "Levi",
    url: "https://avatarfiles.alphacoders.com/375/thumb-150-375291.jpeg",
  },
  {
    id: "eren",
    name: "Eren",
    url: "https://avatarfiles.alphacoders.com/375/thumb-150-375296.jpeg",
  },
  {
    id: "tanjiro",
    name: "Tanjiro",
    url: "https://avatarfiles.alphacoders.com/342/thumb-150-342895.png",
  },
  {
    id: "nezuko",
    name: "Nezuko",
    url: "https://avatarfiles.alphacoders.com/323/thumb-150-323515.jpg",
  },
];

// Fallback: generate a dicebear avatar if image fails to load
const getFallbackUrl = (name) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;

function JoinScreen({ onJoin }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(ANIME_AVATARS[0]);
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getImgSrc = (avatar) => {
    return imgErrors[avatar.id] ? getFallbackUrl(avatar.name) : avatar.url;
  };

  const handleSubmit = () => {
    if (name.trim().length < 2) {
      setError("Username must be at least 2 characters!");
      return;
    }
    if (name.trim().length > 20) {
      setError("Username must be under 20 characters!");
      return;
    }
    onJoin(name.trim(), selectedColor.hex, getImgSrc(selectedAvatar));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 px-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-5 w-full max-w-lg">

        {/* Avatar preview */}
        <div
          className="w-20 h-20 rounded-full p-1 shadow-lg transition-all duration-300 shrink-0"
          style={{ backgroundColor: selectedColor.hex }}
        >
          <img
            src={getImgSrc(selectedAvatar)}
            alt={selectedAvatar.name}
            className="w-full h-full rounded-full object-cover bg-white"
            onError={() => handleImgError(selectedAvatar.id)}
          />
        </div>

        {/* Selected character name */}
        <p className="text-white font-semibold -mt-2">
          {selectedAvatar.name}
        </p>

        {/* Title */}
        <div className="text-center -mt-2">
          <h1 className="text-2xl font-bold text-white">Public Chat Room</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Pick your character, color and username
          </p>
        </div>

        {/* Username input */}
        <input
          type="text"
          placeholder="Your username..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />

        {error && <p className="text-red-400 text-sm -mt-3">{error}</p>}

        {/* Anime Avatar Grid */}
        <div className="w-full">
          <p className="text-gray-400 text-xs mb-3 text-center font-medium uppercase tracking-wide">
            Choose your character
          </p>
          <div className="grid grid-cols-6 gap-2">
            {ANIME_AVATARS.map((avatar) => {
              const isSelected = selectedAvatar.id === avatar.id;
              return (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar)}
                  className="flex flex-col items-center gap-1 group"
                  title={avatar.name}
                >
                  <div
                    className="w-12 h-12 rounded-full transition-all duration-200 p-0.5"
                    style={{
                      backgroundColor: isSelected
                        ? selectedColor.hex
                        : "#374151",
                      outline: isSelected ? "2px solid white" : "none",
                      outlineOffset: "1px",
                      transform: isSelected ? "scale(1.15)" : "scale(1)",
                    }}
                  >
                    <img
                      src={getImgSrc(avatar)}
                      alt={avatar.name}
                      className="w-full h-full rounded-full object-cover bg-white"
                      onError={() => handleImgError(avatar.id)}
                    />
                  </div>
                  <span
                    className="text-[10px] transition"
                    style={{
                      color: isSelected ? selectedColor.hex : "#9ca3af",
                      fontWeight: isSelected ? "600" : "400",
                    }}
                  >
                    {avatar.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color picker */}
        <div className="w-full">
          <p className="text-gray-400 text-xs mb-3 text-center font-medium uppercase tracking-wide">
            Choose ring color
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className="w-7 h-7 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: color.hex,
                  outline:
                    selectedColor.name === color.name
                      ? "3px solid white"
                      : "none",
                  outlineOffset: "2px",
                  transform:
                    selectedColor.name === color.name
                      ? "scale(1.2)"
                      : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={handleSubmit}
          className="w-full text-white font-semibold py-3 rounded-xl transition-all active:scale-95 mt-1"
          style={{ backgroundColor: selectedColor.hex }}
        >
          Join as {name ? name : "..."} →
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;