import React from "react";
import {
  Text,
  Container,
  Title,
  SimpleGrid,
  Button,
  Card,
  Divider,
  Image,
} from "@mantine/core";
import classes from "./Services.module.css";
import classicImage from "../../assets/images/eyelash-icon.png";

function Classic() {
  return (
    <Container size="lg" className={classes.wrapper}>
      <Container size={660} p={0} mt="md" align="center">
        <Image
          src={classicImage}
          alt="Classic Lashes"
          className={classes.image}
        />
        <Title className={classes.title}>Lash Lift</Title>

        <Title className={classes.subtitle}>Keratin Lash Infusion</Title>
        <Text className={classes.description}>
          Keratin Lash Infusion™ (KLI) is the only TRUE keratin lash treatment
          on the market. It uses a patented technology where REAL keratin is
          infused into each lash increasing diameter of lashes by up to 40%
          while curling & lifting your lashes to look their longest.
        </Text>

        <SimpleGrid className={classes.simpleGrid}>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Price</Title>
            <Text>$100</Text>
          </Card>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Duration</Title>
            <Text>45 mins</Text>
          </Card>
        </SimpleGrid>

        <Divider my="xl" />

        <Title className={classes.subtitle}>InLei® Lash Filler</Title>
        <Text className={classes.description}>
          just as beautiful and effective as a standard lash lift but is also
          much gentler on the lashes, it improves the quality of the lashes over
          time. It’s made with the best ingredients possible to ensure a safe
          and effective lash lift experience
        </Text>

        <SimpleGrid className={classes.simpleGrid}>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Price</Title>
            <Text>$150</Text>
          </Card>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Duration</Title>
            <Text>1 hour</Text>
          </Card>
        </SimpleGrid>

        <Divider my="xl" />

        <Button
          variant="filled"
          color="pink"
          size="sm"
          className={classes.control}
          component="a"
          href="/login"
        >
          Book Appointment
        </Button>
      </Container>
    </Container>
  );
}

export default Classic;
