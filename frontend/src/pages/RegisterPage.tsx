import { useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();

  const onSubmit = async () => {
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    console.log({ firstName, lastName, email, password, confirmPassword });

    if (!email || !password || !confirmPassword) {
      setError("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // call the api to register the user
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!response.ok) {
        setError("Failed to register user " + response.statusText);
        throw new Error("Failed to register user");
      }

      setError("");

      const token = await response.json();

      if (!token) {
        setError("Failed to register user");
        throw new Error("Failed to register user");
      }

      login(email, token);
    } catch (error) {
      console.log(error);
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
        <Typography variant="h5">Register New Account</Typography>
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
            inputRef={firstNameRef}
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            inputRef={lastNameRef}
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
          />
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
          <TextField
            inputRef={confirmPasswordRef}
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
          />
          <Button onClick={onSubmit} variant="contained" color="primary">
            Register
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
