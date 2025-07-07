import React, { useEffect, useState } from "react";
import VolatilitySelector from "./components/VolatilitySelector";
import DigitStream from "./components/DigitStream";
import SniperTracker from "./components/SniperTracker";
import BacktestEngine from "./components/BacktestEngine";
import useTickStream from "./hooks/useTickStream";

const App = () => {
  const [volatility, setVolatility] = useState("R_100");
  const [strategyMode, setStrategyMode] = useState("classic"); // classic | aggressive | conservative
  const [digits, setDigits] = useState([]);
  const [trackedDigits, setTrackedDigits] = useState(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const tick = useTickStream(volatility);

  useEffect(() => {
    if (!tick) return;
    const digit = tick.quote.slice(-1);
    setDigits((prev) => {
      const updated = [...prev, { digit, epoch: tick.epoch }];
      return updated.slice(-10000); // Keep 10k max
    });
  }, [tick]);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold mb-4">🎯 Digit Sniper Bot</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <VolatilitySelector current={volatility} onChange={setVolatility} />
        <select
          className="bg-gray-800 p-2 rounded"
          value={strategyMode}
          onChange={(e) => setStrategyMode(e.target.value)}
        >
          <option value="classic">Classic Sniper</option>
          <option value="aggressive">Aggressive Sniper</option>
          <option value="conservative">Conservative Sniper</option>
        </select>
      </div>

      <DigitStream digits={digits.slice(-20)} />
      <SniperTracker digits={digits} mode={strategyMode} config={{ digits: trackedDigits }} />
      <BacktestEngine digits={digits} mode={strategyMode} config={{ digits: trackedDigits }} />
    </div>
  );
};

export default App;
