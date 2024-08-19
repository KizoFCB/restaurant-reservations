import React from "react";
import Header from "./components/header";
import Content from "./components/content";
import Footer from "./components/footer";
import Box from "@mui/material/Box";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Content />
      <Footer />
    </Box>
  );
};

export default App;
