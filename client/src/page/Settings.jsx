import { AddAPhoto, DeleteSweep, Edit } from "@mui/icons-material";
import { Box, Button, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { deleteUser, getUser, updateUser } from "../function/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, update } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [filenameold, setFilenameold] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  /////////
  const user = useSelector((state) => state.user);
  const PF = "https://arthit-vibration-iot.herokuapp.com/uploads/" + user.pic;
  ///////////
  useEffect(() => {
    getUser(user.id)
      .then((res) => {
        console.log(res);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setCompany(res.data.company);
        setFilename(res.data.profilePic);
        setFilenameold(res.data.profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.id]);

  const handleSubmit = (event) =>{
    event.preventDefault();
    ///////
    const formData = new FormData();
    formData.append('file',file);
    formData.append('filename',filename);
    formData.append('filenameold',filenameold);
    formData.append('username',username);
    formData.append('email',email);
    formData.append('company',company);
    ///////
    updateUser(formData,user.id).then(res=>{
      console.log(res);
      dispatch(update({
        id:res.data._id,
        username:res.data.username,
        company:res.data.company,
        role:res.data.role,
        pic:res.data.profilePic,
      }));
      setFilenameold(res.data.profilePic);
      toast.success('Update Success');
    }).catch(err=>{
      console.log(err);
      toast.error('Update Faill');
    });
  }

  const handleDelete=(event)=>{
    event.preventDefault();
    deleteUser(user.id).then(res=>{
        console.log(res);
        toast.success('Delete Success');
        localStorage.clear();
        dispatch(logout())
        navigate('/');
    }).catch(err=>{
      console.log(err);
      toast.error('Delete Faill');
    });
  }


  return (
    <Box sx={{ pb: 3 }}>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <h1>Settings</h1>
      </Paper>
      <Paper sx={{ p: 2, marginBottom: 2 }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <h3>Profile Picture</h3>
            <Button variant="contained" size="large" color="error" onClick={handleDelete} startIcon={<DeleteSweep/>}>
              Delete
            </Button>
          </Box>
          <Box>
            <img
              src={file ? URL.createObjectURL(file) : PF}
              width={250}
              height={250}
              alt="userImage"
            />
            <label htmlFor="fileInput">
              <AddAPhoto sx={{cursor:"pointer"}}/>
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
          <Box display="flex" flexDirection="column">
            <TextField
              label="Username"
              variant="outlined"
              sx={{ mt: 2, width: "100%" }}
              autoFocus
              value={username}
              name="username"
              required
              onChange={e=> setUsername(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              sx={{ mt: 2 }}
              value={email}
              name="email"
              required
              onChange={e=> setEmail(e.target.value)}
            />
            <TextField
              label="Company"
              variant="outlined"
              sx={{ mt: 2 }}
              name="company"
              value={company}
              required
              onChange={e=> setCompany(e.target.value)}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              startIcon={<Edit/>}
              sx={{ mr: 2 }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;
