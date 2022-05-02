import React, { useEffect, useState } from "react";

import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";



const COLORS = ["#f44336", "#FFBB28", "#ffeb3b", "#00e676"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const PChartStatus = ({machineStatus}) => {
  const [data, setData] = useState([
    { name: "Priority 1", value: 0 },
    { name: "Priority 2", value: 0 },
    { name: "Priority 3", value: 0 },
    { name: "Priority 4", value: 0 },
  ]);

  useEffect(() => {
    setData([
      { name: "Priority 1", value: machineStatus.priority1 },
      { name: "Priority 2", value: machineStatus.priority2 },
      { name: "Priority 3", value: machineStatus.priority3 },
      { name: "Priority 4", value: machineStatus.priority4 },
    ]);
  }, [machineStatus]);


  return (
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart>
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PChartStatus;
