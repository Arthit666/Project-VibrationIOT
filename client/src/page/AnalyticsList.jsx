import { Box, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MachineCard from "../components/card/MachineCard";
import { getMachineList } from "../function/machine";

const MachineList = () => {
  const [machineList, setMachineList] = useState([]);

  useEffect(() => {
    getMachineList()
      .then((res) => {
        console.log(res);
        setMachineList([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setMachineList]);

  return (
    <Box>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h1>Analytics</h1>
      </Paper>
      <Grid container spacing={2} pb={2} >
        {machineList.map((machine, index) => {
          return (
            <Grid item xs={4} key={index}>
              <Paper elevation={3}>
                <MachineCard machine={machine} key={index} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MachineList;
