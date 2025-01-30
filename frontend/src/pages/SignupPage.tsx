import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signupUser } from "../services/authService";
import { TextField, Button, Typography, Box } from "@mui/material";

const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupUser({ name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data.error || "Signup failed");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          alignItems: "center",
          mt: 7,
        }}
      >
        <Typography variant="h4">Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 2,
          }}
        >
          <Button
            onClick={() => {
              navigate("/login");
            }}
            variant="text"
            color="primary"
            fullWidth
          >
            Existing User? Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
