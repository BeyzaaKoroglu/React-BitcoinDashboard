import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const [bpi, setBpi] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);
  const [highlight, setHighlight] = useState(false);

  async function fetchData() {
    let response = await axios(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    if (
      response.data.bpi.USD.rate_float !== previousValues[0] ||
      response.data.bpi.GBP.rate_float !== previousValues[1] ||
      response.data.bpi.EUR.rate_float !== previousValues[2]
    ) {
      if (previousValues.length !== 0) setHighlight(true);

      setPreviousValues([]);
      bpi.map((e) => {
        setPreviousValues((arr) => [...arr, e.rate_float]);
      });
      setBpi(Object.values(response.data.bpi));
    }
  }
  useEffect(() => {
    fetchData();
  });

  useEffect(() => {
    setTimeout(() => {
      setHighlight(false);
    }, 3000);
  }, [bpi]);

  const renderRate = (e) => {
    let roundFloat = e.rate_float.toFixed(2);
    roundFloat.toString();
    return roundFloat.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="dashboard">
      <h1>
        Bitcoin<sup> BTC</sup>
      </h1>
      <ul>
        {bpi.map((e, index) => (
          <li key={index} className={highlight ? "highlight" : ""}>
            <span>
              {e.code === "USD" ? "$" : e.code === "GBP" ? "£" : "€"}{" "}
            </span>
            <span>{renderRate(e)}</span>
            <span className="currency">{e.code}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
