"use client";
import HistogramPage from "@/components/HistogramPage";
import KPIs from "@/components/KPIs";
import LineChartPage from "@/components/LineChartPage";
import PressureAlert from "@/components/PressureAlert";
import ScatterPlotPage from "@/components/ScatterPlotPage";
import { a11yProps, TabPanel } from "@/components/TabComponents";
import { IoTData } from "@/types/data";
import { Box, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  // Handle tab change
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

      {/* Alerts Section */}
      <PressureAlert data={chartData} />

      {/* KPIs Section */}
      <KPIs data={iotData} />

      {/* Charts Section */}
      <Paper sx={{ marginTop: 4 }}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Line Charts" {...a11yProps(0)} />
          <Tab label="Scatter Plots" {...a11yProps(1)} />
          <Tab label="Histograms" {...a11yProps(2)} />
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
      </Paper>
    </Box>
  );
}
