import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./LoginPage.module.css";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [state, setState] = useState({
    uName: "",
    password: "",
    successMessage: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      uname: state.uName, // Updated to match your server's field names
      password: state.password, // Updated to match your server's field names
    };

    axios
      .post("http://localhost:5000/auth/login", data)
      .then(function (response) {
        if (response.status === 200) {
          const id = response.data.user_id; // Extract user ID from the response (adjust this based on your server response)

          setState((prevState) => ({
            ...prevState,
            successMessage:
              "Login successful. Redirecting to dashboard page...",
          }));

          // Redirect to the dashboard with the user's ID
          // window.location.href = `/dashboard/${id}`;
          window.location.href = `/dashboard`;
        }
      })
      .catch((error) => {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          successMessage: "Login failed. Please check your credentials.",
        }));
      });
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required  onChange={handleChange}/>
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={handleChange}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
