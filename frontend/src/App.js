import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form';
import DataDisplay from './DataDisplay';
import Chart from './Chart';
import { getChartOptions, getChartData } from './chartData';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [serverAvailable, setServerAvailable] = useState(true); // State to track server availability
  const [efficiency, setEfficiency] = useState(null);
  const [lastVoltage, setLastVoltage] = useState(null);
  const [allEfficiencies, setAllEfficiencies] = useState([]);
  const [allVoltages, setAllVoltages] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/energy_efficiency');
        console.log(response.data);
        const { energyEfficiency, lastVoltageData } = response.data;

        // Update state arrays
        setEfficiency(energyEfficiency);
        setLastVoltage(lastVoltageData);
        setAllEfficiencies((prev) => [...prev, energyEfficiency]);
        setAllVoltages((prev) => [...prev, lastVoltageData]);

        // Update x-axis labels
        setX((prevX) => [...prevX, prevX.length + 1]);

        // Server is available if data fetch is successful
        setServerAvailable(true);
      } catch (error) {
        console.error('Error fetching energy efficiency:', error);
        setServerAvailable(false); // Server is not available
      }
    };

    const interval = setInterval(fetchData, 5000);

    // Initial check for server availability
    fetchData();

    return () => clearInterval(interval);
  }, []);

  const handleServerAlert = () => {
    if (!serverAvailable) {
      return (
        <div className="server-alert">
          <p>Backend server not reachable</p>
        </div>
      );
    }
  };

  const options = getChartOptions();
  const chartData = getChartData(x, allVoltages, allEfficiencies);

  return (
    <div className="app">
      {handleServerAlert()}
      <div className='title'>
        <h1>Energy Efficiency Calculator</h1>
      </div>
      <div className='infos'>
        <Form />
        <DataDisplay efficiency={efficiency} lastVoltage={lastVoltage} />
      </div>
      <Chart options={options} data={chartData} />
    </div>
  );
}

export default App;
