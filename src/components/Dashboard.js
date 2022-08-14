import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const [data, setData] = useState({ bpi: {} });
  const [bpi, setBpi] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);

  async function fetchData() {
    let response = await axios(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    if (response.data.bpi.USD.rate_float !== previousValues[0]) {
      bpi.map((e, index) => {
        previousValues[index] = e.rate_float;
        console.log(e);
      });
      setData(response.data);
      setBpi(Object.values(data.bpi));
    }
  }
  useEffect(() => {
    fetchData();
  });

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
          <li key={index}>
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
