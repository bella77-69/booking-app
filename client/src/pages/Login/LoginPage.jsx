import React, { useState } from "react";
import axios from "axios";
import { Container, Title, Paper, TextInput, Button } from '@mantine/core';
import classes from "./LoginPage.module.css";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null,
    errorMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    const { email, password } = state;

    setState((prevState) => ({
      ...prevState,
      successMessage: null,
      errorMessage: null,
    }));

    try {
      const res = await axios.post(`http://localhost:8000/api/user/login`, {
   
        email,
        password,
      });

      if (res.data.result?.user) {
        const { user, token } = res.data.result;
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("token", token);
        
        setState((prevState) => ({
          ...prevState,
          successMessage: "Login successful. Redirecting to dashboard page...",
          email: "", 
          password: "",
        }));

        // Redirect based on user role
        if (user.role.toLowerCase() === 'admin') {
          window.location.href = `/admin-dashboard`;
        } else {
          window.location.href = `/book-appointment/${user.user_id}`;
        }
      } else {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Login failed. Please check your credentials.",
        }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Login failed. Please check your credentials.",
      }));
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <TextInput
            label="Email"
            placeholder="Enter email"
            required
            id="email"
            value={state.email}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            label="Password"
            placeholder="Password"
            required
            id="password"
            value={state.password}
            onChange={handleChange}
          />
          <Button
            fullWidth
            mt="xl"
            onClick={handleSubmitClick}
          >
            Sign in
          </Button>
          {state.successMessage && (
            <p>{state.successMessage}</p>
          )}
          {state.errorMessage && (
            <p>{state.errorMessage}</p>
          )}
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
