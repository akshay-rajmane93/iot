import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  // Function to fetch temperature data from the backend
  const fetchTemperature = async () => {
    try {
      setServerError(false); // Reset server error before each request
      const response = await fetch(process.env.REACT_APP_API_URL);

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log temperature data for debugging
        setTemperature(data.temperature);
        setLoading(false); // Stop loading after successful fetch
      } else {
        console.error("Failed to fetch temperature");
        setServerError(true);
        setTemperature(null); // Reset temperature if fetch fails
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching temperature data:", error);
      setServerError(true);
      setTemperature(null); // Reset temperature on error
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch temperature data immediately on mount
    fetchTemperature();

    // Fetch temperature data every 4 seconds
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
      ) : temperature !== null ? (
        <div className="temperature-display">
          <p className="temperature">
            Temperature: {parseFloat(temperature).toFixed(2)} °C
          </p>
          <div className="condition-emoji">{getConditionEmoji()}</div>
        </div>
      ) : (
        <p>No temperature data available.</p>
      )}
    </div>
  );
}

export default App;
