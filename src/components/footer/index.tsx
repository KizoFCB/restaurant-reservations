import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        padding: "10px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">&copy; 2024 Yassir</Typography>
    </Box>
  );
};

export default Footer;
