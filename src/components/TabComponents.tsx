import React from "react";
import { Box } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={false}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
      style={{ display: value === index ? "block" : "none" }}
    >
      {value === index && <Box sx={{ padding: 3 }}>{children}</Box>}
    </div>
  );
}

export function a11yProps(index: number) {
  return {
    id: `dashboard-tab-${index}`,
    "aria-controls": `dashboard-tabpanel-${index}`,
  };
}
