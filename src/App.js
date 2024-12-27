import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  // Function to fetch temperature data from the backend
  const fetchTemperature = async () => {
    try {
      setLoading(true);
      setServerError(false); // Reset server error before each request
      const response = await fetch(process.env.REACT_APP_API_URL);

      console.log(response,'resss')
      if (response.ok) {
        const data = await response.json();
        console.log(data); // This should log the temperature data
        setTemperature(data.temperature);
        setLoading(false);
      } else {
        console.error("Failed to fetch temperature");
        setServerError(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching temperature data:", error);
      setServerError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch temperature data every 2 seconds
    const intervalId = setInterval(fetchTemperature, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Conditional rendering for the emoji based on the temperature value
  const getConditionEmoji = () => {
    if (temperature > 50) {
      return "🔥"; // Fire emoji for high temperature
    } else if (temperature < 10) {
      return "❄️"; // Snowflake emoji for low temperature
    } else {
      return "💨"; // Airflow emoji for normal temperature
    }
  };

  return (
    <div className="App">
      <h1>Temperature Monitor</h1>
      {serverError ? (
        <p className="error-message">Unable to fetch data. Server might be down.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <div className="temperature-display">
          <div className="temperature-info">
          <p className="temperature">Temperature: {temperature?.toFixed(2)} °C</p>
            <div className="condition-emoji">{getConditionEmoji()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
