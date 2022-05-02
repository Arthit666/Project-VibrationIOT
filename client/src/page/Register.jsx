import { LoginOutlined, Send } from "@mui/icons-material";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerHandler } from "../function/auth";

const Register = () => {
  const navigate = useNavigate();
  const [fromData, setFormData] = useState({
    username: "",
    password: "",
    company: "",
    email: "",
  });

  const { username, password, company, email } = fromData;

  ///////
  const handleChange = (event) => {
    setFormData({ ...fromData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      username,
      password,
      company,
      email
    }
    //function
    registerHandler(newUser).then(res=>{
      console.log(res);
      toast.success('Register Complete');
      navigate('/');
    }).catch(err=>{
      console.log(err);
      console.log("err");
      toast.error('Register Faill')
    });
    
  };
  return (
    <Box sx={{ width: "100vw", height: "100vh", p: 3, bgcolor: "whitesmoke" }}>
      <Paper
        sx={{ width: "100%", height: "100%", p: 2, display: "flex" }}
        elevation={8}
      >
        
        <Box
          width="50%"
          height="100%"
          sx={{
            borderRadius: "10px",
            position: "relative",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1567093322503-341d262ad8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')",
          }}
        >
          <Typography
            fontWeight={700}
            color="white"
            variant="h1"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {" "}
            My Machine
          </Typography>
        </Box>
        <Box
          width="50%"
          height="100%"
          p={4}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Typography variant="h3" fontWeight={700}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column">
              <TextField
                label="Username"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                autoFocus
                name="username"
                required
                onChange={handleChange}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                sx={{ mt: 2 }}
                name="password"
                required
                onChange={handleChange}
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                sx={{ mt: 2 }}
                name="email"
                required
                onChange={handleChange}
              />
              <TextField
                label="Company"
                variant="outlined"
                sx={{ mt: 2 }}
                name="company"
                required
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<Send/>}
                sx={{ mr: 2 }}
              >
                Summit
              </Button>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Button variant="contained" size="large"   startIcon={<LoginOutlined/>}>
                  Login
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
