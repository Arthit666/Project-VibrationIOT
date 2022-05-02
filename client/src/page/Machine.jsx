import { AddCircle, AddToPhotos } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TableMachine from "../components/table/TableMachine";
import {
  createMachine,
  deleteMachine,
  getMachineList,
} from "../function/machine";
import { toast } from "react-toastify";
const Machine = () => {
  const PF = "https://arthit-vibration-iot.herokuapp.com/uploads/defaultmachineimage.jpg";
  //////////
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("defaultmachineimage.jpg");
  const [machineName, setMachineName] = useState("");
  const [status, setStatus] = useState("");
  const [equipment, setEquipment] = useState("");
  const [priority, setPriority] = useState("");
  const [descrition, setDescrition] = useState("");
  const [machineList, setMachineList] = useState([]);
  const [load, setLoad] = useState(false);
  ///
  useEffect(() => {
    loadMachine();
  }, [load]);

  const loadMachine = () => {
    getMachineList()
      .then((res) => {
        console.log(res);
        setMachineList(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////
  const handleSubmit = (event) => {
    event.preventDefault();
    /////
    const formData = new FormData();
    formData.append("file", file);
    formData.append("machineName", machineName);
    formData.append("status", status);
    formData.append("equipment", equipment);
    formData.append("priority", priority);
    formData.append("filename", filename);
    formData.append("desc", descrition);
    /////
    createMachine(formData)
      .then((res) => {
        console.log(res);
        setFile(null);
        setFilename("defaultmachineimage.jpg");
        setMachineName("");
        setStatus("");
        setEquipment("");
        setPriority("");
        setDescrition("");
        toast.success("Create Machine Complete");  
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Create Machine Faill");
      });
  };

  const handleDelate = (event, id) => {
    event.preventDefault();
    deleteMachine(id)
      .then((res) => {
        console.log(res);
        toast.success("Delete Machine Complete");
        setLoad(!load);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Delete Machine Faill");
      });
  };

  return (
    <Box pb={2}>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h1>Machine Management</h1>
      </Paper>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h2>Create Machine</h2>
        <form onSubmit={handleSubmit}>
          <Box width="100%" display="flex" alignItems="center">
            <Box mt={2} width="50%">
              <img
                src={file ? URL.createObjectURL(file) : PF}
                width={330}
                height={330}
                alt="machineImage"
              />
              <label htmlFor="fileInput">
                <AddToPhotos />
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
            <Box display="flex" flexDirection="column" width="50%">
              <TextField
                label="Machine Name"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                autoFocus
                name="Machine Name"
                value={machineName}
                required
                onChange={(e) => setMachineName(e.target.value)}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
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
              <TextField
                label="Equipment"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                autoFocus
                value={equipment}
                name="Equipment"
                required
                onChange={(e) => setEquipment(e.target.value)}
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
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
              <TextField
                label="Description"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                autoFocus
                value={descrition}
                name="Description"
                required
                multiline
                rows={2}
                onChange={(e) => setDescrition(e.target.value)}
              />
              <Box sx={{ mt: 2, mb: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mr: 2 }}
                  startIcon={<AddCircle/>}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Paper>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Box display="flex" justifyContent="center">
          <TableMachine machineList={machineList} handleDelate={handleDelate} />
        </Box>
      </Paper>
    </Box>
  );
};

export default Machine;
