import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {  AppRegistration, LoginOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginHandler } from "../function/auth";
import { login } from "../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //////////
  const handleSubmit = (event) => {
    event.preventDefault();
    loginHandler({ username, password })
      .then((res) => {
        console.log(res);
        toast.success("Login Success");
        //redux
        dispatch(login({
          id:res.data.payload.user.id,
          token:res.data.token,
          username:res.data.payload.user.username,
          company:res.data.payload.user.company,
          role:res.data.payload.user.role,
          pic:res.data.payload.user.profilePic,
        }));
        //save on local store
        localStorage.setItem("token", res.data.token);
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        toast.error("Login Faill");
      });
  };
  /////////

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
          <Typography variant="h3" fontWeight={700} >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column">
              <TextField
                label="Username"
                variant="outlined"
                sx={{ mt: 2, width: "100%" }}
                autoFocus
                required
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                sx={{ mt: 2 }}
                autoFocus
                required
                onChange={(event) => setPassword(event.target.value)}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                startIcon={<LoginOutlined/>}
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" size="large" startIcon={<AppRegistration/>}>
                  Register
                </Button>
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
