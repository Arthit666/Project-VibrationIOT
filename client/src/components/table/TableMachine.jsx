import { DeleteSweep } from "@mui/icons-material";
import {
  Avatar,
  Backdrop,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TableMachine = ({ machineList, handleDelate }) => {
  const PF = "https://arthit-vibration-iot.herokuapp.com/uploads/";

  const [open, setOpen] = React.useState(null);
  const handleClose = () => {
    setOpen(null);
  };
  return (
    <TableContainer sx={{ width: "90%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <h3>Machine Name</h3>
            </TableCell>
            <TableCell align="right">
              <h3>Picture</h3>
            </TableCell>
            <TableCell align="right">
              <h3>Action</h3>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {machineList.map((machine, index) => (
            <TableRow key={index}>
              <TableCell key={index + 1} component="th" scope="row">
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
                key={index + 2}
                align="right"
                sx={{ display: "flex", justifyContent: "end" }}
              >
                {machine.machinePic && (
                  <Avatar
                    alt="machineImage"
                    src={PF + machine.machinePic}
                    sx={{ cursor: "pointer" }}
                    onClick={() => setOpen(index)}
                  />
                )}
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={index === open}
                  onClick={handleClose}
                >
                  {machine.machinePic && (
                    <img
                      src={PF + machine.machinePic}
                      alt="machineImage"
                      width="85%"
                      height="85%"
                    />
                  )}
                </Backdrop>
              </TableCell>
              <TableCell key={index + 3} align="right">
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteSweep/>}
                  onClick={(e) => handleDelate(e, machine._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMachine;
