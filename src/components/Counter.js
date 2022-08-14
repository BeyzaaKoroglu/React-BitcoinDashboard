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
    <div className="main-component">
      <div className="counter">
        <div className="time-block">
          <p className="time-item">
            {counter.hours < 10 ? `0${counter.hours}` : counter.hours}
          </p>
          <div className="buttons">
            <button onClick={() => updateCountDown(3600)}>{"\u{2B9D}"}</button>
            <button onClick={() => updateCountDown(-3600)}>{"\u{2B9f}"}</button>
          </div>
          <p className="text">Hours</p>
        </div>
        <p className="time-item">:</p>
        <div className="time-block">
          <p className="time-item">
            {counter.minutes < 10 ? `0${counter.minutes}` : counter.minutes}
          </p>
          <div className="buttons">
            <button onClick={() => updateCountDown(60)}>{"\u{2B9D}"}</button>
            <button onClick={() => updateCountDown(-60)}>{"\u{2B9f}"}</button>
          </div>
          <p className="text">Minutes</p>
        </div>
        <p className="time-item">:</p>
        <div className="time-block">
          <p className="time-item">
            {counter.seconds < 10 ? `0${counter.seconds}` : counter.seconds}
          </p>
          <div className="buttons">
            <button onClick={() => updateCountDown(1)}>{"\u{2B9D}"}</button>
            <button onClick={() => updateCountDown(-1)}>{"\u{2B9f}"}</button>
          </div>
          <p className="text">Seconds</p>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default Counter;
