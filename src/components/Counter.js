import React, { useEffect, useState } from "react";
import "../styles/counter.css";
import Dashboard from "./Dashboard";

function Counter() {
  const [countDown, setCountDown] = useState(60 * 60 * 10);
  const [counter, setCounter] = useState({ hours: 10, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer =
      !(counter.hours <= 0 && counter.minutes <= 0 && counter.seconds <= 0) &&
      setInterval(() => setCountDown(countDown - 1), 1000);

    setCounter({
      hours: parseInt(countDown / (60 * 60)),
      minutes: parseInt(countDown / 60) % 60,
      seconds: countDown % 60,
    });

    return () => {
      clearInterval(timer);
    };
  }, [countDown]);

  const updateCountDown = (sec) => {
    setCountDown(countDown + sec);
  };

  return (
    <div>
      <h1 className="counter">
        <div className="time-block">
          <span className="time">
            {counter.hours < 10 ? `0${counter.hours}` : counter.hours}
          </span>
          <span className="buttons">
            <button onClick={() => updateCountDown(3600)}>+</button>
            <button onClick={() => updateCountDown(-3600)}>-</button>
          </span>
        </div>
        <div className="time-block">
          <span className="time">
            :{counter.minutes < 10 ? `0${counter.minutes}` : counter.minutes}
          </span>
          <span className="buttons">
            <button onClick={() => updateCountDown(60)}>+</button>
            <button onClick={() => updateCountDown(-60)}>-</button>
          </span>
        </div>
        <div className="time-block">
          <span className="time">
            :{counter.seconds < 10 ? `0${counter.seconds}` : counter.seconds}
          </span>
          <span className="buttons">
            <button onClick={() => updateCountDown(1)}>+</button>
            <button onClick={() => updateCountDown(-1)}>-</button>
          </span>
        </div>
      </h1>
      <Dashboard />
    </div>
  );
}

export default Counter;
