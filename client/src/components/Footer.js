import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";


const Footer = () => {
  return (
    <>
      <AppBar
        position="fixed"
        className="footerNav"
        style={{ top: "auto", bottom: 0, backgroundColor: "#f0f0f0" }}  // Correct style prop
      >
        <Toolbar>
          <Typography variant="body2" color="black" >
            © 2024 Fyndah
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
