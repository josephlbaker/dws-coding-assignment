"use client";

import {
  Card,
  CardContent,
  Alert,
  AlertTitle,
  List,
  ListItem,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { ChartDataItem } from "@/types/data";
import { useState } from "react";

interface PressureAlertProps {
  data: ChartDataItem[];
}

export default function PressureAlert({ data }: PressureAlertProps) {
  const [open, setOpen] = useState(false);

  const pressureExceedances = data.filter(
    (item) => item.tubingPressure > item.casingPressure
  );

  if (pressureExceedances.length === 0) {
    return null;
  }

  const maxItemsToShow = 3;

  return (
    <Card elevation={3}>
      <CardContent>
        <Alert severity="error">
          <AlertTitle>
            Error: Tubing Pressure Exceeds Casing Pressure
          </AlertTitle>
          <Typography variant="body2">
            The following timestamps have tubing pressure exceeding casing
            pressure:
          </Typography>
          <List dense>
            {pressureExceedances.slice(0, maxItemsToShow).map((item, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <Typography variant="body2">
                  {new Date(item.timestamp).toLocaleString()} - Tubing Pressure:{" "}
                  {item.tubingPressure} psi, Casing Pressure:{" "}
                  {item.casingPressure} psi
                </Typography>
              </ListItem>
            ))}
          </List>
          {pressureExceedances.length > maxItemsToShow && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpen(true)}
              sx={{ marginTop: 1 }}
            >
              View All ({pressureExceedances.length})
            </Button>
          )}
        </Alert>
      </CardContent>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>All Exceedances</DialogTitle>
        <DialogContent>
          <List dense>
            {pressureExceedances.map((item, index) => (
              <ListItem key={index} sx={{ padding: 0 }}>
                <Typography variant="body2">
                  {new Date(item.timestamp).toLocaleString()} - Tubing Pressure:{" "}
                  {item.tubingPressure} psi, Casing Pressure:{" "}
                  {item.casingPressure} psi
                </Typography>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
