import { Paper, Stack, Typography ,Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import PChartPriority from "../components/chart/PChartPriority";
import PChartStatus from "../components/chart/PChartStatus";
import TableData from "../components/table/TableData";
import { getMachineList, getStatusMachine } from "../function/machine";


const Dashboard = () => {
  const [machineList, setMachineList] = useState([]);
  const [machineStatus , setMachineStatus] = useState({
  });
  
  ///////
  useEffect(() => {
    loadMachine();
  }, []);

  const loadMachine = () => {
    getMachineList()
      .then((res) => {
        console.log(res);
        setMachineList(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    getStatusMachine()
    .then((res) => {
      console.log(res);
      setMachineStatus({
        running: res.data.running.length,
        stop: res.data.stop.length,
        maintenance: res.data.maintenance.length,
        priority1: res.data.pri1.length,
        priority2: res.data.pri2.length,
        priority3: res.data.pri3.length,
        priority4: res.data.pri4.length,
      })
    }) 
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Box  sx={{ pb:3 }}>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h1>Dashboard</h1>
      </Paper>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-evenly"
        sx={{ marginBottom: 2 }}
      >
        <Paper elevation={3} sx={{ width: "50%", height: 240 }}>
          <Typography pt={1} variant="h6" sx={{ textAlign: "center", mb: "-22px" }}>
            Machine Status
          </Typography>
          <PChartStatus machineStatus={machineStatus}/>
        </Paper>
        <Paper elevation={3} sx={{ width: "50%", height: 240 }}>
          <Typography pt={1} variant="h6" sx={{ textAlign: "center", mb: "-22px" }}>
            Priority
          </Typography>
          <PChartPriority machineStatus={machineStatus}/>
        </Paper>
      </Stack>
      <Paper elevation={3}>
        <TableData machineList={machineList}/>
      </Paper>
    </Box>
  );
};

export default Dashboard;
