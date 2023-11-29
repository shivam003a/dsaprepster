// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  return (
    <Pie data={data} options={{ legend: { display: true }}}/>
  );
};

export default PieChart;
