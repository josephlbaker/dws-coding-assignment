"use client";
import { Box, Typography } from "@mui/material";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartDataItem } from "@/types/data";
import { useMemo } from "react";
import React from "react";

interface ScatterPlotProps {
  data: ChartDataItem[];
}

function ScatterPlotPage({ data }: ScatterPlotProps) {
  const sampleRate = 10;

  const sampledData = useMemo(() => {
    return data.filter((_, index) => index % sampleRate === 0);
  }, [data, sampleRate]);

  return (
    <Box sx={{ paddingY: 2 }}>
      {/* Depth vs. Tubing Pressure */}
      <Typography variant="h6" gutterBottom>
        Depth vs. Tubing Pressure
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="depth"
            name="Depth"
            unit=" ft"
            reversed
          />
          <YAxis
            type="number"
            dataKey="tubingPressure"
            name="Tubing Pressure"
            unit=" psi"
          />
          <Tooltip cursor={false} /> {/* Disable cursor for performance */}
          <Legend />
          <Scatter
            name="Depth vs. Tubing Pressure"
            data={sampledData}
            fill="#8884d8"
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Depth vs. Casing Pressure */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Depth vs. Casing Pressure
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 30, bottom: 5, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="depth"
            name="Depth"
            unit=" ft"
            reversed
          />
          <YAxis
            type="number"
            dataKey="casingPressure"
            name="Casing Pressure"
            unit=" psi"
          />
          <Tooltip cursor={false} />
          <Legend />
          <Scatter
            name="Depth vs. Casing Pressure"
            data={sampledData}
            fill="#82ca9d"
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default React.memo(ScatterPlotPage);
