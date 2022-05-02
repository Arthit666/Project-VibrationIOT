import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";

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

function TableMachineDetail({
  machine,
  modeUpdate,
  equipment,
  setEquipment,
  speed,
  setSpeed,
  problem,
  setProblem,
  priority,
  setPriority,
}) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2, width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow key={1} sx={{ backgroundColor: "#2196f3" }}>
            <TableCell
              key={2}
              align="center"
              colSpan={4}
              sx={{ color: "white" }}
            >
              <h3>Machine Detail</h3>
            </TableCell>
          </TableRow>
          <TableRow key={3} sx={{ backgroundColor: "#eeeeee" }}>
            <TableCell key={4}>Equipment</TableCell>
            <TableCell key={5} align="center">
              Speed(RPM)
            </TableCell>
            <TableCell key={6} align="center">
              Problem
            </TableCell>
            <TableCell key={7} align="center">
              Priority
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {modeUpdate ? (
                <TextField
                  label="Equipment"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  autoFocus
                  value={equipment}
                  name="Equipment"
                  onChange={(e) => setEquipment(e.target.value)}
                />
              ) : (
                machine.equipment
              )}
            </TableCell>
            <TableCell align="center">
              {modeUpdate ? (
                <TextField
                  label="Speed"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={speed}
                  autoFocus
                  name="Speed"
                  onChange={(e) => setSpeed(e.target.value)}
                />
              ) : (
                machine.speed
              )}
            </TableCell>
            <TableCell align="center">
              {modeUpdate ? (
                <TextField
                  label="Problem"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  value={problem}
                  autoFocus
                  name="Problem"
                  onChange={(e) => setProblem(e.target.value)}
                />
              ) : (
                machine.problem
              )}
            </TableCell>
            <TableCell
              align="center"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {modeUpdate ? (
                <FormControl sx={{ width: "100px" }}>
                  <InputLabel id="priority">Priority</InputLabel>
                  <Select
                    labelId="priority"
                    id="pri"
                    value={priority}
                    label="priority"
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <MenuItem value={"1"}>Priority 1</MenuItem>
                    <MenuItem value={"2"}>Priority 2</MenuItem>
                    <MenuItem value={"3"}>Priority 3</MenuItem>
                    <MenuItem value={"4"}>Priority 4</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                checkPriority(machine.priority)
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableMachineDetail;
