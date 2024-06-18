import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [co, setCO] = useState('');
  const [h2, setH2] = useState('');
  const [efficiency, setEfficiency] = useState(null);
  const [lastVoltage, setLastVoltage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:3000/molar_fractions", { CO: co, H2: h2})
      console.log("Molar fractions trasmited successfully")
    } catch(error) {
      console.error('Error updating molar fractions:', error);
    }
  }

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/energy_efficiency');
        setEfficiency(response.data.energyEffiency);
        setLastVoltage(response.data.lastVoltageData);
      } catch (error) {
        console.error('Error fetching energy efficiency:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
            <h1>Energy Efficiency Calculator</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="co">CO Molar Fraction</label>
                <input 
                    type="number" 
                    id="co" 
                    value={co} 
                    onChange={(e) => setCO(e.target.value)} 
                    required 
                />
                <label htmlFor="h2">H2 Molar Fraction</label>
                <input 
                    type="number" 
                    id="h2" 
                    value={h2} 
                    onChange={(e) => setH2(e.target.value)} 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
            <div className="data-display">
                <p>Energy Efficiency: {efficiency !== null ? efficiency.toFixed(2) : 'Loading...'}</p>
                <p>Last Voltage: {lastVoltage !== null ? lastVoltage : 'Loading...'}</p>
            </div>
        </div>
  );
}

export default App;