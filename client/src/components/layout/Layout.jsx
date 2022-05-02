import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import React from "react";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const ContentBox = styled("div")(({ theme }) => ({
  paddingTop: theme.spacing(9),
  minHeight: "100vh",
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  backgroundColor: "whitesmoke",
}));
const Layout = ({index}) => {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item xs={2.5}>
          <Leftbar index={index}/>
        </Grid>
        <Grid item xs={9.5}>
          <ContentBox>
              <Outlet/>
          </ContentBox>
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
