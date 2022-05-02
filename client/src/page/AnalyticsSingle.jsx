import {
  Build,
  Replay,
  Stop,
  Edit,
  Send,
  DeleteSweep,
  AddAPhoto,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import TabChart from "../components/tab/TabChart";
import TableMachineDetail from "../components/table/TableMachineDetail";
import TabVibrationValue from "../components/tab/TabVibrationValue";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMachine, getOneMachine, updateMachine } from "../function/machine";
import { red } from "@mui/material/colors";
import { toast } from "react-toastify";

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

const Analytics = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState({});
  const [modeUpdate, setModeUpdate] = useState(false);
  const [load , setload] = useState(false);
  //////////
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [filenameold, setFilenameold] = useState("");
  ////////////
  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("");
  const [equipment, setEquipment] = useState("");
  const [speed, setSpeed] = useState("");
  const [problem, setProblem] = useState("");
  const [priority, setPriority] = useState("");
  ////////

  const PF = "https://arthit-vibration-iot.herokuapp.com/uploads/";

  useEffect(() => {
    getOneMachine(param.id)
      .then((res) => {
        console.log(res);
        setMachine(res.data);
        setStatus(res.data.status);
        setFilenameold(res.data.machinePic);
        setEquipment(res.data.equipment);
        setSpeed(res.data.speed);
        setProblem(res.data.problem);
        setPriority(res.data.priority);
        setMachineName(res.data.machineName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.id,load]);

  const handleDelate = (event, id) => {
    event.preventDefault();
    deleteMachine(id)
      .then((res) => {
        console.log(res);
        toast.success("Delete Machine Complete");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete Machine Faill");
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    ///////
    const formData = new FormData();
    formData.append('file',file);
    formData.append('filename',filename);
    formData.append('filenameold',filenameold);
    formData.append('machineName',machineName);
    formData.append('equipment',equipment);
    formData.append('status',status);
    formData.append('speed',speed);
    formData.append('problem',problem);
    formData.append('priority',priority);
    ///////
    updateMachine(machine._id,formData).then(res=>{
        console.log(res)
        toast.success("Update Machine Complete");
        setFile(null);
        setFilename('');
        setFilenameold(res.data.machinePic)
        setload(!load);
        setModeUpdate(false)
    }).catch(err=>{
      console.log(err)
      toast.error("Update Machine Faill");
    })
  };

  return (
    <Box pb={1}>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h1>Analytics</h1>
      </Paper>
      <Paper
        sx={{
          p: 2,
          marginBottom: 2,
          display: "flex",
          alignItems:"center",
        }}
        elevation={3}
      >
        <form style={{width:"100%"}} onSubmit={handleUpdate}>
        <Box sx ={{ display: "flex" ,width:"100%" }}>
          <Box width="35%" >
            {modeUpdate
              ? machine.machinePic && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <img
                      component="img"
                      height="300"
                      width="100%"
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : PF + machine.machinePic
                      }
                      alt="machineImage"
                    />
                    <label htmlFor="fileInput">
                      <AddAPhoto sx={{ cursor: "pointer", mt: 1 }} />
                    </label>
                    <input
                      type="file"
                      id="fileInput" //
                      style={{ display: "none" }}
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setFilename(e.target.files[0].name);
                      }}
                    />
                  </Box>
                )
              : machine.machinePic && (
                  <img
                    component="img"
                    height="300"
                    width="100%"
                    src={PF + machine.machinePic}
                    alt="machineImage"
                  />
                )}
          </Box>
          <Box p={1} width="65%">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {modeUpdate ? (
                <TextField
                label="Machine Name"
                variant="outlined"
                sx={{ width: "80%" }}
                autoFocus
                value={machineName}
                name="MachineName"
                onChange={(e) => setMachineName(e.target.value)}
              />
              ) : (
                <h2>{machineName}</h2>
              )}
              {modeUpdate ? (
                <FormControl sx={{ width: "30%" }}>
                  <InputLabel id="status">Status</InputLabel>
                  <Select
                    labelId="status"
                    id="stat"
                    value={status}
                    label="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <MenuItem value={"Running"}>Running</MenuItem>
                    <MenuItem value={"Stop"}>Stop</MenuItem>
                    <MenuItem value={"Maintenance"}>Maintenance</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                checkStatus(machine.status)
              )}
            </Box>
            <Box width="100%">
              <TableMachineDetail
                machine={machine}
                modeUpdate={modeUpdate}
                equipment={equipment}
                setEquipment={setEquipment}
                speed={speed}
                setSpeed={setSpeed}
                problem={problem}
                setProblem={setProblem}
                priority={priority}
                setPriority={setPriority}
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="end">
              {modeUpdate ? (
                <Button
                  variant="contained"
                  size="large"
                  color="success"
                  type="submit"
                  startIcon={<Send />}
                >
                  Submit
                </Button>
              ) : (
                <Box display="flex">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Edit />}
                    onClick={(e) => setModeUpdate(!modeUpdate)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    color="error"
                    sx={{ ml: 2 }}
                    startIcon={<DeleteSweep />}
                    onClick={(e) => handleDelate(e, machine._id)}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        </form>
      </Paper>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h2>Vibration Value</h2>
        <TabVibrationValue machine={machine} />
      </Paper>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h2>Graph Analytics</h2>
        <TabChart />
      </Paper>
    </Box>
  );
};

export default Analytics;
