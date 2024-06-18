import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ options, data }) => (
  <div className="chart-container">
    <Line options={options} data={data} height={400} width={600} />
  </div>
);

export default Chart;
