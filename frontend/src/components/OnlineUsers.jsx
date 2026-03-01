import React from "react";

function OnlineUsers({ users }) {
  return (
    <div className="w-64 bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-gray-900 px-5 py-4 border-b border-gray-700">
        <h2 className="text-white font-semibold text-lg">Online Users</h2>
        <p className="text-gray-400 text-xs mt-0.5">
          {users.length} {users.length === 1 ? "person" : "people"} online
        </p>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {users.length === 0 && (
          <p className="text-gray-500 text-sm text-center mt-6">
            No one online yet
          </p>
        )}

        {users.map((user, index) => {
          if (!user || !user.username) return null;

          return (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-700 px-4 py-3 rounded-xl transition"
            >
              {/* Anime Avatar with colored ring */}
              <div
                className="w-10 h-10 rounded-full shrink-0 p-0.5"
                style={{ backgroundColor: user.color || "#6366f1" }}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-full h-full rounded-full object-cover bg-white"
                    onError={(e) => {
                      // fallback to dicebear if image fails
                      e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username)}`;
                    }}
                  />
                ) : (
                  // Fallback letter avatar if no avatar URL
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-gray-800 font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name + status */}
              <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium truncate">
                  {user.username}
                </span>
                <span className="text-green-400 text-xs">● Online</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-700 bg-gray-900">
        <p className="text-gray-500 text-xs text-center">Public Chat Room 🌐</p>
      </div>
    </div>
  );
}

export default OnlineUsers;