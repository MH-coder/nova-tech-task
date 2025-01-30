import React from "react";
import { useAuth } from "../context/AuthContext";
import { Typography, Box } from "@mui/material";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box display="flex">
      <Box flexGrow={1} p={3}>
        <Typography variant="h4">Welcome, {user?.name}!</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
