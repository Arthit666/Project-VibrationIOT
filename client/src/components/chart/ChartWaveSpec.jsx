import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
 
} from "recharts";



const ChartWaveSpec = ({dataW,dataSpecX,dataSpecY}) => {
  const waveForm = [];
  const spectrum = [];

  dataW.map((elem, index) => {
    return waveForm.push({ xAxis: index, amplitude: elem });
  });
  dataSpecX.map(elem=>{
     return spectrum.push({xAxis:elem});
    })
  dataSpecY.map((elem,index)=>{
    return spectrum[index].amplitude = elem;
  })
  // amplitude is number
  // console.log('spec',spectrum)
  return (
    <Box display="flex" flexWrap="wrap">
      <Box width="50%" pt={2}>
        <LineChart width={450} height={300} data={waveForm}  >
          <CartesianGrid strokeDasharray="3 " />
          <XAxis dataKey="xAxis" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amplitude" dot={false} strokeWidth={1} />
        </LineChart>
        <Typography variant="subtitle2" textAlign="center">Time Waveform</Typography>
      </Box>
      <Box width="50%" pt={2}>
        <LineChart width={450} height={300} data={spectrum}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="xAxis" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amplitude"
            stroke="#eba834"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
        <Typography variant="subtitle2" textAlign="center">Spectrum(Hz)</Typography>
      </Box>
    </Box>
  );
};

export default ChartWaveSpec;
