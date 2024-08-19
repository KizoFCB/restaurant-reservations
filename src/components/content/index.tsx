import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import reservationsList from "../../services/serverResponse.json";

const Content: React.FC = () => {
  console.log("test", reservationsList);
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: "calc(100vh - 64px - 56px)", // Adjusts for header and footer
        marginTop: "64px", // Adjusts for header height
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to restaurant reservations!
      </Typography>
      {/* Add your content here */}
    </Box>
  );
};

export default Content;
