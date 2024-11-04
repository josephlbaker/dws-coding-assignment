export type IoTData = {
  headers: ["timestamp", "depth", "tubing_pressure", "casing_pressure"];
  units_of_measure: ["unix_seconds", "feet", "psi", "psi"];
  data: [number, number, number, number][];
};

export interface ChartDataItem {
  timestamp: number;
  depth: number;
  tubingPressure: number;
  casingPressure: number;
}