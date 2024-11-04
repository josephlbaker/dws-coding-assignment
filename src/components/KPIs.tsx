"use client";

import { IoTData } from "@/types/data";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ReactElement } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DepthIcon from "@mui/icons-material/ExpandMore";
import PressureIcon from "@mui/icons-material/Speed";

interface KPIProps {
  data: IoTData;
}

interface KPIItem {
  label: string;
  value: string;
  icon: ReactElement;
}

export default function KPIs({ data }: KPIProps) {
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

  const kpis: KPIItem[] = [
    {
      label: "Start Time",
      value: new Date(startTime * 1000).toLocaleString(),
      icon: <AccessTimeIcon />,
    },
    {
      label: "End Time",
      value: new Date(endTime * 1000).toLocaleString(),
      icon: <AccessTimeIcon />,
    },
    {
      label: "Average Depth",
      value: `${averageDepth.toFixed(2)} feet`,
      icon: <DepthIcon />,
    },
    {
      label: "Depth Range",
      value: `${minDepth} - ${maxDepth} feet`,
      icon: <DepthIcon />,
    },
    {
      label: "Avg Tubing Pressure",
      value: `${averageTubingPressure.toFixed(2)} psi`,
      icon: <PressureIcon />,
    },
    {
      label: "Avg Casing Pressure",
      value: `${averageCasingPressure.toFixed(2)} psi`,
      icon: <PressureIcon />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {kpis.map((kpi, index) => (
        <Grid size={{ xs: 12, sm: 6 }} key={index}>
          <Card elevation={3}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ marginRight: 2, backgroundColor: "#1976d2" }}>
                {kpi.icon}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="textSecondary">
                  {kpi.label}
                </Typography>
                <Typography variant="h6">{kpi.value}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
