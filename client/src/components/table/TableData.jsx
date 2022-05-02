import { Build, Replay, Stop } from "@mui/icons-material";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Avatar,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import React from "react";
import { Link } from "react-router-dom";

const checkPriority = (priority) => {
  if (priority === "4") {
    return (
      <Tooltip title="Priority 4">
        <Avatar
          sx={{ bgcolor: "#00e676", width: 32, height: 32 }}
          variant="rounded"
        >
          {priority}
        </Avatar>
      </Tooltip>
    );
  } else if (priority === "3") {
    return (
      <Tooltip title="Priority 3">
        <Avatar
          sx={{ bgcolor: "#ffeb3b", width: 32, height: 32 }}
          variant="rounded"
        >
          {priority}
        </Avatar>
      </Tooltip>
    );
  } else if (priority === "2") {
    return (
      <Tooltip title="Priority 2">
        <Avatar
          sx={{ bgcolor: "orange", width: 32, height: 32 }}
          variant="rounded"
        >
          {priority}
        </Avatar>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Priority 1">
        <Avatar
          sx={{ bgcolor: "#f44336", width: 32, height: 32 }}
          variant="rounded"
        >
          {priority}
        </Avatar>
      </Tooltip>
    );
  }
};

const checkStatus = (status) => {
  if (status === "Running") {
    return (
      <Tooltip title="Running">
        <Avatar sx={{ bgcolor: "#00e676", width: 33, height: 33 }}>
          <Replay />
        </Avatar>
      </Tooltip>
    );
  } else if (status === "Stop") {
    return (
      <Tooltip title="Stop">
        <Avatar sx={{ bgcolor: red[500], width: 33, height: 33 }}>
          <Stop />
        </Avatar>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Maintenance">
        <Avatar sx={{ bgcolor: "gray", width: 33, height: 33 }}>
          <Build />
        </Avatar>
      </Tooltip>
    );
  }
};

const TableData = ({ machineList }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2196f3" }}>
            <TableCell align="center" colSpan={4} sx={{ color: "white" }}>
              <h3>Machine Status</h3>
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#eeeeee" }}>
            <TableCell sx={{ fontSize: 18 }}>Machine</TableCell>
            <TableCell sx={{ fontSize: 18 }} align="center">
              Status
            </TableCell>
            <TableCell sx={{ fontSize: 18 }} align="center">
              Problem
            </TableCell>
            <TableCell sx={{ fontSize: 18 }} align="center">
              Priority
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machineList.map((machine, index) => (
            <TableRow key={index}>
              <TableCell component="th" key={index + 1}>
                <Link
                  to={`/analytics/${machine._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="subtitle2">
                    {machine.machineName}
                  </Typography>
                </Link>
              </TableCell>
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                  top: "5px",
                  left: "0",
                }}
                key={index + 2}
              >
                {checkStatus(machine.status)}
              </TableCell>
              <TableCell align="center" key={index + 3}>
                <Typography variant="subtitle2">{machine.problem}</Typography>
              </TableCell>
              <TableCell
                align="center"
                key={index + 4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {checkPriority(machine.priority)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
