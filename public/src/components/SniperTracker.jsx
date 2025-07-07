import React, { useEffect, useState } from "react";

const SniperTracker = ({ digits, config, mode }) => {
  const [alerts, setAlerts] = useState([]);
  const [clusterMap, setClusterMap] = useState({});

  const triggerThreshold = {
    classic: 3,
    aggressive: 2,
    conservative: 4,
  }[mode];

  useEffect(() => {
    if (digits.length < 50) return;

    const newClusterMap = {};
    const currentAlerts = [];

    for (const targetDigit of config.digits) {
      const groups = [];
      let count = 1;

      for (let i = 1; i < digits.length; i++) {
        if (digits[i].digit === targetDigit) {
          if (digits[i - 1].digit === targetDigit) {
            count++;
          } else {
            count = 1;
          }

          if (count >= 2) {
            if (
              groups.length === 0 ||
              digits[i - 1].epoch > groups[groups.length - 1].endEpoch + 1
            ) {
              groups.push({
                digit: targetDigit,
                size: count,
                startEpoch: digits[i - count + 1].epoch,
                endEpoch: digits[i].epoch,
              });
            }
          }
        }
      }

      if (groups.length >= triggerThreshold) {
        currentAlerts.push({
          digit: targetDigit,
          count: groups.length,
          recentSize: groups[groups.length - 1]?.size,
        });
      }

      newClusterMap[targetDigit] = groups;
    }

    setClusterMap(newClusterMap);
    setAlerts(currentAlerts);
  }, [digits, config, mode]);

  useEffect(() => {
    if (!alerts.length) return;

    alerts.forEach((alert) => {
      const message = `🎯 Sniper Alert: Digit ${alert.digit} repeated ${alert.count} clusters`;
      const voice = new SpeechSynthesisUtterance(message);
      voice.rate = 1;
      voice.pitch = 1;
      voice.volume = 1;
      voice.voice = speechSynthesis.getVoices().find((v) => v.name.includes("Google") || v.name);
      speechSynthesis.speak(voice);
    });
  }, [alerts]);

  return (
    <div className="bg-gray-900 p-4 rounded mb-4">
      <h2 className="font-semibold text-lg mb-2">🎯 Sniper Tracker</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-400">No sniper alerts right now.</p>
      ) : (
        <ul className="text-sm space-y-1">
          {alerts.map((alert, idx) => (
            <li key={idx}>
              🚨 Digit <span className="font-bold">{alert.digit}</span> formed{" "}
              <span className="font-bold">{alert.count}</span> clusters. Last cluster size:{" "}
              <span className="font-bold">{alert.recentSize}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SniperTracker;
