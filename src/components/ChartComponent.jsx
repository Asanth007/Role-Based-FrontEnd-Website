import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ChartComponent = ({ type, data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === "bar" && (
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Bar dataKey="value" fill="#6c5ce7" radius={[5, 5, 0, 0]} />
        </BarChart>
      )}

      {type === "line" && (
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Line type="monotone" dataKey="value" stroke="#6c5ce7" strokeWidth={2} />
        </LineChart>
      )}

      {type === "pie" && (
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#6c5ce7"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={["#6c5ce7", "#a29bfe", "#ff7675", "#55efc4", "#fdcb6e"][index % 5]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      )}

      {type === "area" && (
        <AreaChart data={data}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Area type="monotone" dataKey="value" stroke="#6c5ce7" fill="#6c5ce7" />
        </AreaChart>
      )}

      {type === "radar" && (
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" stroke="#fff" />
          <PolarRadiusAxis stroke="#fff" />
          <Radar name="Stats" dataKey="value" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.6} />
          <Tooltip />
        </RadarChart>
      )}
    </ResponsiveContainer>
  );
};

export default ChartComponent;
