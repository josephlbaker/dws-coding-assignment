"use client";

import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChartDataItem } from "@/types/data";
import React from "react";

interface HistogramProps {
  data: ChartDataItem[];
}

function HistogramPage({ data }: HistogramProps) {
  const tubingPressureValues = data.map((item) => item.tubingPressure);
  const casingPressureValues = data.map((item) => item.casingPressure);

  const createHistogramData = (values: number[], bins: number) => {
    const max = Math.max(...values);
    const min = Math.min(...values);
    const binWidth = (max - min) / bins;
    const histogramData = Array.from({ length: bins }, (_, i) => {
      const binMin = min + i * binWidth;
      const binMax = binMin + binWidth;
      const count = values.filter((v) => v >= binMin && v < binMax).length;
      return {
        bin: `${binMin.toFixed(1)} - ${binMax.toFixed(1)}`,
        count,
      };
    });
    return histogramData;
  };

  const bins = 10; // Adjust number of bins as needed
  const tubingHistogram = createHistogramData(tubingPressureValues, bins);
  const casingHistogram = createHistogramData(casingPressureValues, bins);

  return (
    <Box sx={{ paddingY: 2 }}>
      {/* Tubing Pressure Histogram */}
      <Typography variant="h6" gutterBottom>
        Tubing Pressure Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={tubingHistogram}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="bin"
            label={{
              value: "Pressure Range (psi)",
              position: "insideLeft",
              dy: 15,
            }}
          />
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Frequency" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Casing Pressure Histogram */}
      <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
        Casing Pressure Distribution
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={casingHistogram}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="bin"
            label={{
              value: "Pressure Range (psi)",
              position: "insideLeft",
              dy: 15,
            }}
          />
          <YAxis
            label={{ value: "Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Frequency" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default React.memo(HistogramPage);
