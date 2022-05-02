import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function ButtonAppBar() {
  const navigate = useNavigate();
  const user = useSelector(state=>state.user)
  const PC = 'https://arthit-vibration-iot.herokuapp.com/uploads/'+ user.pic
  
  return (
    <AppBar position="fixed" >
      <Toolbar >
        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          . Vibration 
        </Typography>
        <Box sx={{ display: "flex" ,alignItems:"center" ,cursor:"pointer"}} onClick={()=>navigate('/settings')}>
          <Avatar alt="" src={PC} />
          <Typography variant="h9" component="div" sx={{ flexGrow: 1 ,ml:1}}>
          {user.username}
        </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
