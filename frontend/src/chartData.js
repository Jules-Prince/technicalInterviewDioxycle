// chartData.js

export const getChartOptions = () => ({
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Energy Efficiency and Voltage',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data Points',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Voltage',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Energy Efficiency',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  });
  
  export const getChartData = (x, allVoltages, allEfficiencies) => ({
    labels: x,
    datasets: [
      {
        label: 'Voltage',
        data: allVoltages,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Efficiency',
        data: allEfficiencies,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      },
    ],
  });
  