import {
  Analytics,
  Dashboard,
  Group,
  Logout,
  Notifications,
  PrecisionManufacturing,
  Settings,
  Timeline,
} from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const ContentBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(7.5),
  height: "100vh",
  bgcolor: "background.paper",
  position:"fixed",
  width:"21%",
}));


const Leftbar = ({index}) => {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleListItemClick = (event) => {
    navigate(`/${event.target.innerText.toLowerCase()}`)
  };
  
  return (
    <ContentBox>
      <List component="nav">
        <ListItemButton
          selected={index === 0}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          selected={index === 1}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <PrecisionManufacturing />
          </ListItemIcon>
          <ListItemText primary="Machine" />
        </ListItemButton>
        <ListItemButton
          selected={index === 2}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Analytics />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItemButton>
        <ListItemButton
          selected={index === 3}
          // onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Timeline />
          </ListItemIcon>
          <ListItemText primary="Trend" />
        </ListItemButton>
        <ListItemButton
          selected={index === 4}
          // onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Notifications />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItemButton>
        <ListItemButton
          selected={index === 5}
          // onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Team" />
        </ListItemButton>
        <ListItemButton
          selected={index === 6}
          onClick={(event) => handleListItemClick(event)}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton
          selected={index === 7}
          onClick={() => {
            localStorage.clear();
            dispatch(logout());
            navigate('/');
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </ContentBox>
  );
};

export default Leftbar;
