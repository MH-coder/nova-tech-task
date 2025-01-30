import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { TextField, Button, Typography, Box } from "@mui/material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      login(user);
      navigate("/");
    } catch (err: any) {
      setError(err.response.data.error || "Login failed");
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
        <Typography variant="h4">Login</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
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
            Login
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
              navigate("/signup");
            }}
            variant="text"
            color="primary"
            fullWidth
          >
            New User? Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
