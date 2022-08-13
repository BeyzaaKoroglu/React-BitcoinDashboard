import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const [data, setData] = useState({ bpi: {} });
  const [bpi, setBpi] = useState([]);

  async function fetchData() {
    let response = await axios(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    setData(response.data);
    setBpi(Object.values(data.bpi));
  }
  useEffect(() => {
    fetchData();
  });

  const renderRate = (e) => {
    return e.rate_float;
  };

  return (
    <div className="dashboard">
      <ul>
        {bpi.map((e, index) => (
          <li key={index}>
            <span>
              {e.code === "USD" ? "$" : e.code === "GBP" ? "£" : "€"}{" "}
            </span>
            <span>{renderRate(e)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
