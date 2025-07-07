import React from "react";

const DigitStream = ({ digits }) => {
  const getColor = (digit) => {
    const colors = [
      "text-red-400",
      "text-orange-400",
      "text-yellow-400",
      "text-green-400",
      "text-teal-400",
      "text-cyan-400",
      "text-blue-400",
      "text-purple-400",
      "text-pink-400",
      "text-white",
    ];
    return colors[parseInt(digit)];
  };

  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-1">🔢 Live Digits (last 20)</h2>
      <div className="grid grid-cols-20 gap-1 text-2xl font-mono">
        {digits.map((d, i) => (
          <div
            key={i}
            className={`p-1 text-center border border-gray-700 rounded ${getColor(d.digit)}`}
          >
            {d.digit}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitStream;
