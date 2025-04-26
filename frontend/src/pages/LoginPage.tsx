import { useRef, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    console.log("onsumbit", { email, password });

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Failed to login user " + response.statusText);
        throw new Error("Failed to login user");
      }

      setError("");

      const token = await response.json();

      if (!token) {
        setError("Failed to login user");
        throw new Error("Failed to login user");
      }
      login(email, token);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to login");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: 1,
            p: 2,
            borderRadius: 2,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField
            inputRef={emailRef}
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={passwordRef}
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
          />

          <Button onClick={onSubmit} variant="contained" color="primary">
            Login
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
