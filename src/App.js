import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch temperature data from ESP32 server
  const fetchTemperature = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://192.168.87.200/temperature"); // Replace <ESP32-IP> with the actual IP of your ESP32
      // const response = await fetch("http://192.168.87.200/temperature");
if (response.ok) {
  const data = await response.json();
  console.log(data); // This should log the temperature data
  setTemperature(data.temperature);
  setLoading(false);
} else {
  console.error("Failed to fetch temperature");
}
   
    } catch (error) {
      console.error("Error fetching temperature data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch temperature data every 2 seconds
    const intervalId = setInterval(fetchTemperature, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <h1>Temperature Monitor</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Temperature: {temperature} °C</p>
        </div>
      )}
    </div>
  );
}

export default App;
