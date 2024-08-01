import React, { useState } from "react";
import axios from "axios";
import { Container, Title, Paper, TextInput, Button } from "@mantine/core";
import classes from "./RegisterPage.module.css";

const Register = () => {
  const [state, setState] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    phone_number: "",
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
    const { full_name, username, email, password, phone_number } = state;

    setState((prevState) => ({
      ...prevState,
      successMessage: null,
      errorMessage: null,
    }));

    try {
      const res = await axios.post(`http://localhost:8000/api/user/register`, {
        full_name,
        username,
        email,
        password,
        phone_number,
      });

      if (res.data.result) {
        setState((prevState) => ({
          ...prevState,
          successMessage:
            "Registration successful. Redirecting to login page...",
          full_name: "",
          username: "",
          email: "",
          password: "",
          phone_number: "",
        }));

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setState((prevState) => ({
          ...prevState,
          errorMessage: "Registration failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({
        ...prevState,
        errorMessage: "Registration failed. Please try again.",
      }));
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Create an Account
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form>
          <TextInput
            label="Full Name"
            placeholder="Enter full name"
            required
            id="full_name"
            value={state.full_name}
            onChange={handleChange}
          />
          <TextInput
            label="Username"
            placeholder="Enter username"
            required
            id="username"
            value={state.username}
            onChange={handleChange}
          />
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
            placeholder="Enter password"
            required
            id="password"
            value={state.password}
            onChange={handleChange}
          />
          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            required
            id="phone_number"
            value={state.phone_number}
            onChange={handleChange}
          />
          <Button fullWidth mt="xl" onClick={handleSubmitClick}>
            Register
          </Button>
          {state.successMessage && <p>{state.successMessage}</p>}
          {state.errorMessage && <p>{state.errorMessage}</p>}
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
