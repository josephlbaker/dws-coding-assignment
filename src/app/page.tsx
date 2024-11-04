"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import KPIs from "@/components/KPIs";
import LineChartPage from "@/components/LineChartPage";
import PressureAlert from "@/components/PressureAlert";
import ScatterPlotPage from "@/components/ScatterPlotPage";
import HistogramPage from "@/components/HistogramPage";
import { IoTData } from "@/types/data";
import { Box, Typography, Tabs, Tab, Card } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { a11yProps, TabPanel } from "@/components/TabComponents";

export default function Home() {
  const [iotData, setIoTData] = useState<IoTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetch("/data/iotData.json")
      .then((response) => response.json())
      .then((data) => {
        setIoTData(data as IoTData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const chartData = useMemo(() => {
    if (!iotData) return [];
    return iotData.data[0].map((_, idx) => ({
      timestamp: iotData.data[0][idx] * 1000,
      depth: iotData.data[1][idx],
      tubingPressure: iotData.data[2][idx],
      casingPressure: iotData.data[3][idx],
    }));
  }, [iotData]);

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setTabIndex(newValue);
    },
    []
  );

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;
  if (!iotData) return <p>No data available</p>;

  return (
    <Box sx={{ padding: 4 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom>
        IoT Dashboard Overview
      </Typography>

      {/* KPI and Alert Section */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 8 }}>
          <KPIs data={iotData} />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <PressureAlert data={chartData} />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Card sx={{ marginTop: 4 }} elevation={3}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Line Charts" {...a11yProps(0)} />
          <Tab label="Scatter Plots" {...a11yProps(1)} />
          <Tab label="Histogram" {...a11yProps(2)} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <LineChartPage data={chartData} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <ScatterPlotPage data={chartData} />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <HistogramPage data={chartData} />
        </TabPanel>
      </Card>
    </Box>
  );
}
