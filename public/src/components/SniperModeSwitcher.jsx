import React from "react";

const SniperModeSwitcher = ({ mode, setMode }) => {
  return (
    <div className="flex gap-4 items-center mb-4">
      <label className="text-white font-semibold">🎮 Sniper Mode:</label>
      {["classic", "aggressive", "conservative"].map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className={`px-3 py-1 rounded text-sm font-semibold ${
            mode === m
              ? "bg-green-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default SniperModeSwitcher;
