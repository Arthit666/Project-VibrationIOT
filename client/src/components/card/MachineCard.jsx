import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const bgColor = (machineColor) => {
  if (machineColor === "4") {
    return "#00e676";
  } else if (machineColor === "3") {
    return "#ffeb3b";
  } else if (machineColor === "2") {
    return "orange";
  } else {
    return "#f44336";
  }
};

const MachineCard = ({ machine }) => {
  const navigate = useNavigate();
  const PF = "https://arthit-vibration-iot.herokuapp.com/uploads/";
 
  return (
    <Card
      sx={{
        maxWidth: 330,
        maxHeight: 340,
        backgroundColor: bgColor(machine.priority),
      }}
      onClick={() => {
        navigate(`/analytics/${machine._id}`);
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={PF + machine.machinePic} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            fontWeight={800}
            color="#616161"
            borderBottom={1}
          >
            {machine.machineName}
          </Typography>

          <Typography  component="span" fontSize={14} fontWeight={600} display="flex">
            Status:
            <Typography
              component="span"
              fontSize={14}
              fontWeight={400}
              ml={1}
              color="#616161"
            >
              {machine.status}
            </Typography>
          </Typography>

          <Typography  component="span"fontSize={14} fontWeight={600} display="flex">
            Equipment:
            <Typography
              fontSize={14}
              component="span"
              fontWeight={400}
              ml={1}
              color="#616161"
            >
              {machine.equipment}
            </Typography>
          </Typography>
          <Typography  component="span"fontSize={14} fontWeight={600} display="flex">
            <div>Problem:</div>
            <Typography
              fontSize={14}
              component="span"
              fontWeight={400}
              ml={1}
              color="#616161"
            >
              {machine.problem}
            </Typography>
          </Typography>
          <Typography  component="span"fontSize={14} fontWeight={600} display="flex">
            Priority:
            <Typography
              fontSize={14}
              component="span"
              fontWeight={400}
              ml={1}
              color="#616161"
            >
              {machine.priority}
            </Typography>
          </Typography>
          <Typography  component="span"fontSize={14} fontWeight={600} display="flex">
            Description:
            <Typography
              fontSize={14}
              component="span"
              fontWeight={400}
              ml={1}
              color="#616161"
            >
              {machine.desc}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MachineCard;
