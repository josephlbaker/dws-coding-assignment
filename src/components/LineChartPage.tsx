"use client";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChartDataItem } from "@/types/data";
import { useMemo } from "react";
import { formatTime12Hour } from "@/utils/utils";
import React from "react";

interface LineChartProps {
  data: ChartDataItem[];
}
function LineChartPage({ data }: LineChartProps) {
  const tickInterval = useMemo(() => {
    const desiredTickCount = 20; // Adjust as needed
    return Math.ceil(data.length / desiredTickCount);
  }, [data]);

  return (
    <Box sx={{ paddingY: 2 }}>
      {/* Tubing and Casing Pressure Chart */}
      <Typography variant="h6" gutterBottom>
        Tubing and Casing Pressure Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime12Hour}
            interval={tickInterval}
          />
          <YAxis
            label={{
              value: "Pressure (psi)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              });
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="tubingPressure"
            stroke="#8884d8"
            name="Tubing Pressure"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="casingPressure"
            stroke="#82ca9d"
            name="Casing Pressure"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Depth Chart */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Depth Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime12Hour}
            interval={tickInterval}
          />
          <YAxis
            label={{
              value: "Depth (feet)",
              angle: -90,
              position: "insideLeft",
            }}
            reversed
          />
          <Tooltip
            labelFormatter={(label) => {
              const date = new Date(label);
              return date.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: true,
              });
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="depth"
            stroke="#8884d8"
            name="Depth"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default React.memo(LineChartPage);
