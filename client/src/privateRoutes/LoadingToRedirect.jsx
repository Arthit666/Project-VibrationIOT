import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    // redirect
    count === 0 && navigate("/register");
    return () => clearInterval(interval);
  }, [count,navigate]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Typography variant="h5">
        Go to register <br />
        redirect in {count} second
      </Typography>
    </Box>
  );
};

export default LoadingToRedirect;
