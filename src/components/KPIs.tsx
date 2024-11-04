"use client";
import { IoTData } from "@/types/data";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

interface KPIProps {
  data: IoTData;
}

function KPIs({ data }: KPIProps) {
  const timestamps = data.data[0];
  const depthValues = data.data[1];
  const tubingPressureValues = data.data[2];
  const casingPressureValues = data.data[3];

  const calculateAverage = (values: number[]) =>
    values.reduce((acc, val) => acc + val, 0) / values.length;

  const startTime = timestamps[0];
  const endTime = timestamps[timestamps.length - 1];
  const averageDepth = calculateAverage(depthValues);
  const averageTubingPressure = calculateAverage(tubingPressureValues);
  const averageCasingPressure = calculateAverage(casingPressureValues);
  const minDepth = Math.min(...depthValues);
  const maxDepth = Math.max(...depthValues);

  const kpis = [
    { label: "Start Time", value: new Date(startTime * 1000).toLocaleString() },
    { label: "End Time", value: new Date(endTime * 1000).toLocaleString() },
    { label: "Average Depth", value: `${averageDepth.toFixed(2)} feet` },
    { label: "Depth Range", value: `${minDepth} - ${maxDepth} feet` },
    {
      label: "Average Tubing Pressure",
      value: `${averageTubingPressure.toFixed(2)} psi`,
    },
    {
      label: "Average Casing Pressure",
      value: `${averageCasingPressure.toFixed(2)} psi`,
    },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Key Performance Indicators (KPIs)
      </Typography>
      <Grid container spacing={2}>
        {kpis.map((kpi, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Typography variant="body1">
              <strong>{kpi.label}:</strong> {kpi.value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default React.memo(KPIs);