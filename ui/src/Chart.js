import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Chart({ data }) {
  const theme = useTheme();

  return (
    <ResponsiveContainer height={500}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis
          dataKey="time"
          type="number"
          unit="s"
          stroke={theme.palette.text.secondary}
        />
        <YAxis stroke={theme.palette.text.secondary} />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Line
          dataKey="altitude"
          name="Altitude"
          unit="m"
          stroke={theme.palette.primary.main}
        />
        <Line
          dataKey="velocity"
          name="Velocity"
          unit="m/s"
          stroke={theme.palette.secondary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
