import React from "react";

const VolatilitySelector = ({ current, onChange }) => {
  const volMarkets = ["R_10", "R_25", "R_50", "R_75", "R_100"];

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      className="bg-gray-800 p-2 rounded"
    >
      {volMarkets.map((vol) => (
        <option key={vol} value={vol}>
          Volatility {vol.replace("R_", "")}
        </option>
      ))}
    </select>
  );
};

export default VolatilitySelector;
