import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import React from "react";

function randomNumber() {
  return (Math.random() * 5).toFixed(2).toString();
}

const TableMachineVibration = ({ label, machine }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 1 ,width:"70%"}}>
      <Table >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2196f3" }}>
            <TableCell align="center" colSpan={4} sx={{ color: "white" }}>
              <h3>{label}, RMS</h3>
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#eeeeee" }}>
            <TableCell>Equipment</TableCell>
            <TableCell align="center">Horizontal</TableCell>
            <TableCell align="center">Vertical</TableCell>
            <TableCell align="center">Axial</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow >
            <TableCell component="th">
              {machine.equipment}
            </TableCell>
            <TableCell align="center">{randomNumber()}</TableCell>
            <TableCell align="center">{randomNumber()}</TableCell>
            <TableCell align="center">{randomNumber()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMachineVibration;
