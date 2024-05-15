import React from 'react';
import { PieChart as PC, Pie, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts';

const PieChart = ({ data }) => {
  // Extracting categories and their corresponding values from the data
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
    name: category,
    value: categories[category],
  }));
  // const chartData = data.map(item => ({ name: item.category, value: parseInt(item.price) }));

  // Define custom colors for pie chart sectors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div style={{ width: '20vh', height: '20vh' }}>
      <ResponsiveContainer>
        <PC>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
              const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
              return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PC>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
