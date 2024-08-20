import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Box
          component="img"
          sx={{
            height: 80,
            width: 150,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Yassir"
          src="/assets/yassir.svg"
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
