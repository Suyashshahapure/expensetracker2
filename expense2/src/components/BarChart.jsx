import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CustomBarChart = ({ data }) => {
  // Extracting categories and their corresponding prices from the data
  const categories = {};
  data.forEach(item => {
    if (categories[item.category]) {
      categories[item.category] += parseInt(item.price);
    } else {
      categories[item.category] = parseInt(item.price);
    }
  });

  // Mapping categories object to array of objects with category and price keys
  const chartData = Object.keys(categories).map(category => ({
    category,
    price: categories[category],
  }));

  return (
    <div style={{ width: '20vh', height: '20vh' }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
