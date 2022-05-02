import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loadDataChart } from "../../function/machine";
import ChartWaveSpec from "../chart/ChartWaveSpec";

function TabChart() {
  const [value, setValue] = useState("1");
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [dataZ, setDataZ] = useState([]);
  const [dataSpecXX, setDataSpecXX] = useState([]);
  const [dataSpecXY, setDataSpecXY] = useState([]);
  const [dataSpecYX, setDataSpecYX] = useState([]);
  const [dataSpecYY, setDataSpecYY] = useState([]);
  const [dataSpecZX, setDataSpecZX] = useState([]);
  const [dataSpecZY, setDataSpecZY] = useState([]);

  useEffect(() => {
    loadDataChart()
      .then((res) => {
        console.log(res);
        setDataX(res.data.machineEx01.waveformX);
        setDataY(res.data.machineEx01.waveformY);
        setDataZ(res.data.machineEx01.waveformZ);
        setDataSpecXX(res.data.machineEx01.spectrumX[1]);
        setDataSpecXY(res.data.machineEx01.spectrumX[0]);
        setDataSpecYX(res.data.machineEx01.spectrumY[1]);
        setDataSpecYY(res.data.machineEx01.spectrumY[0]);
        setDataSpecZX(res.data.machineEx01.spectrumZ[1]);
        setDataSpecZY(res.data.machineEx01.spectrumZ[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange}>
            <Tab label="Acceleration" value="1" />
            <Tab label="Velocity" value="2" />
            <Tab label="Displacement" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <h3>X-axis</h3>
          <ChartWaveSpec
            dataW={dataX}
            dataSpecX={dataSpecXX}
            dataSpecY={dataSpecXY}
          />
          <h3>Y-axis</h3>
          <ChartWaveSpec
            dataW={dataY}
            dataSpecX={dataSpecYX}
            dataSpecY={dataSpecYY}
          />
          <h3>Z-axis</h3>
          <ChartWaveSpec
            dataW={dataZ}
            dataSpecX={dataSpecZX}
            dataSpecY={dataSpecZY}
          />
        </TabPanel>
        <TabPanel value="2">
          <h3>X-axis</h3>
          <ChartWaveSpec
            dataW={dataX}
            dataSpecX={dataSpecXX}
            dataSpecY={dataSpecXY}
          />
          <h3>Y-axis</h3>
          <ChartWaveSpec
            dataW={dataY}
            dataSpecX={dataSpecYX}
            dataSpecY={dataSpecYY}
          />
          <h3>Z-axis</h3>
          <ChartWaveSpec
            dataW={dataZ}
            dataSpecX={dataSpecZX}
            dataSpecY={dataSpecZY}
          />
        </TabPanel>
        <TabPanel value="3">
          <h3>X-axis</h3>
          <ChartWaveSpec
            dataW={dataX}
            dataSpecX={dataSpecXX}
            dataSpecY={dataSpecXY}
          />
          <h3>Y-axis</h3>
          <ChartWaveSpec
            dataW={dataY}
            dataSpecX={dataSpecYX}
            dataSpecY={dataSpecYY}
          />
          <h3>Z-axis</h3>
          <ChartWaveSpec
            dataW={dataZ}
            dataSpecX={dataSpecZX}
            dataSpecY={dataSpecZY}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default TabChart;
