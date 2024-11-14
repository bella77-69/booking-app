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
import hybridImage from  "../../assets/images/eyelash-icon.png";

function Hybrid() {
  return (
    <Container size="lg" className={classes.wrapper}>
      
      <Container size={660} p={0} mt="md" align="center">
      <Image src={hybridImage} alt="Hybrid Lashes" className={classes.image}/>
        <Title className={classes.title} order={1}>
          Hybrid Lash Extensions
        </Title>

        <Title className={classes.subtitle}>
          Full Set
        </Title>
        <Text className={classes.description}>
          Hybrid is most popular in a messy, staggered style that flatters the
          eye and adds some fabulousness to your look.
        </Text>
        <SimpleGrid className={classes.simpleGrid}>
        <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Price</Title>
            <Text>Full Set: $130</Text>
          </Card>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Duration</Title>
            <Text>Full Set: 2 hours</Text>
          </Card>
        </SimpleGrid>
        <Divider my="xl" />
        <Title className={classes.subtitle}>
          Fill
        </Title>
        <Text className={classes.description}>
          Most clients get a 'fill' every 2-3 weeks. With proper home care, you
          should expect to have at least half of your extensions at 3 weeks.
        </Text>
        <SimpleGrid className={classes.simpleGrid}>
        <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Price</Title>
            <Text>Fill: $90</Text>
          </Card>
          <Card shadow="xs" padding="md" radius="md" className={classes.card}>
            <Title order={3}>Duration</Title>
            <Text>Fill: 1 hour</Text>
          </Card>
        </SimpleGrid>
        <Divider my="xl" />
        <SimpleGrid className={classes.simpleGrid}>
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
        <Button
          variant="outline"
          color="pink"
          size="sm"
          className={classes.control}
          component="a"
          href="/"
        >
          Back
        </Button>
        </SimpleGrid>
      </Container>
    </Container>
  );
}

export default Hybrid;
