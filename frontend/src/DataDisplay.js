import React from 'react';

const DataDisplay = ({ efficiency, lastVoltage }) => (
  <div className="data-display">
    <h2>Current Values :</h2>
    <p>Energy Efficiency: {efficiency !== null ? efficiency.toFixed(2) : 'Loading...'}</p>
    <p>Last Voltage: {lastVoltage !== null ? lastVoltage : 'Loading...'}</p>
  </div>
);

export default DataDisplay;
