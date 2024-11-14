import React from "react";
import {
  Text,
  Container,
  Title,
  SimpleGrid,
  Button,
  Card,
  Divider,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IconEye } from "@tabler/icons-react";
import classes from "./Welcome.module.css";

export function Welcome() {
  // Function to handle card clicks
  const handleCardClick = (serviceName) => {
    //if user clicks classic lash extensions take them to the /classic page
    if (serviceName === "Classic Lash Extensions") {
      window.location.href = "/services/classic";
    }
    //if user clicks volume lash extensions take them to the /volume page
    if (serviceName === "Volume Lash Extensions") {
      window.location.href = "/services/volume";
    }
    //if user clicks hybrid lash extensions take them to the /hybrid page
    if (serviceName === "Hybrid Lash Extensions") {
      window.location.href = "/services/hybrid";
    }
    //if user clicks lash lifts take them to the /lash-lifts page
    if (serviceName === "Lash Lifts") {
      window.location.href = "/services/lash-lifts";
    }
    console.log(`Selected service: ${serviceName}`);
    // You could also redirect, open a modal, or perform other actions here.
  };

  return (
    <Container size="lg" className={classes.wrapper}>
        {/* <Container size={660} p={0} mt="md" align="center"> */}
      <Container size={800} p={0} mt="md" align="center">
        <Title className={classes.title} order={1}>
          Welcome
        </Title>
        <Text c="dimmed" className={classes.description} mb="xl">
          Achieve longer, thicker, and fuller lashes with our expertly crafted
          eyelash extensions, designed to enhance your natural beauty—no mascara
          needed. We offer a wide range of lengths, thicknesses, and curls,
          ensuring each set is uniquely tailored to you. Whether you’re
          preparing for a special occasion or want to wake up looking
          effortlessly beautiful every day, our lash extensions are the perfect
          choice. Safe, comfortable, and long-lasting, they’ll have you looking
          and feeling fabulous from the moment you wake up.
        </Text>
      </Container>

      <Divider my="xl" />
      <Title order={2} align="center" className={classes.subtitle}>
        Our Services
      </Title>

      {/* <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md"> */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mt="md">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={`${classes.card} ${classes.cardContent}`}
          onClick={() => handleCardClick("Classic Lash Extensions")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Classic Lash Extensions
          </Text>
          <Divider my="sm" />
          <Text color="dimmed" size="sm">
            Natural-looking extensions that subtly enhance your lashes, perfect
            for an elegant, everyday look.
          </Text>
          {/* <Text weight={700} mt="sm">
            $100
          </Text> */}
          {/* <Divider my="sm" /> */}
          <br />
          <br />
          <Button
            variant="filled"
            color="pink"
            size="sm"
            className={classes.control}
            component={Link}
            to="/services/classic"
          >
            View Details
          </Button>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={`${classes.card} ${classes.cardContent}`}
          onClick={() => handleCardClick("Volume Lash Extensions")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Volume Lash Extensions
          </Text>
          <Divider my="sm" />
          <Text color="dimmed" size="sm">
            Full, dramatic lashes that create a bold, eye-catching effect, ideal
            for those who love a glamorous style. 
          </Text>
          {/* <Text weight={700} mt="sm">
            $150
          </Text> */}
       
          <Button
            variant="filled"
            color="pink"
            size="sm"
            className={classes.control}
            component={Link}
            to="/services/volume"
          >
            View Details
          </Button>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={`${classes.card} ${classes.cardContent}`}
          onClick={() => handleCardClick("Hybrid Lash Extensions")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Hybrid Lash Extensions
          </Text>
          <Divider my="sm" />
          <Text color="dimmed" size="sm">
            A blend of classic and volume extensions, offering a balanced,
            versatile look that’s soft and full.
          </Text>
          {/* <Text weight={700} mt="sm">
            $130
          </Text> */}
          {/* <Divider my="sm" /> */}
          <Button
            variant="filled"
            color="pink"
            size="sm"
            className={classes.control}
            component={Link}
            to="/services/hybrid"
          >
            View Details
          </Button>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={`${classes.card} ${classes.cardContent}`}
          onClick={() => handleCardClick("Lash Lifts")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Lash Lifts
          </Text>
          <Divider my="sm" />
          <Text color="dimmed" size="sm">
            A semi-permanent treatment that lifts and curls your lashes from the
            root for a naturally enhanced look.
          </Text>
          {/* <Text weight={700} mt="sm">
            $90
          </Text> */}
          {/* <Divider my="sm" /> */}
          <Button
            variant="filled"
            color="pink"
            size="sm"
            className={classes.control}
            component={Link}
            to="/services/lash-lifts"
          >
            View Details
          </Button>
        </Card>
      </SimpleGrid>

      {/* <Container mt="md" align="center">
        <Button
          size="sm"
          mt="sm"
          variant="filled"
          color="pink"
          radius="md"
          component="a"
          href="/services"
        >
          View Services
        </Button>
      </Container> */}

      <Divider my="xl" />
    </Container>
  );
}

export default Welcome;
