import { Container, Title, Text, Button, Divider } from "@mantine/core";
import classes from "./Hero.module.css";

export function Hero() {
  return (
    <div className={classes.hero}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Welcome to{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "white" }}
              >
                Bella Lashes Inc.
              </Text>{" "}
            </Title>
            <Divider my="sm" />
            <Text size="lg" className={classes.description} mt={30}>
              Experience the best eyelash extensions in town! We specialize in
              creating longer, thicker, and fuller lashes without the need for
              mascara or curlers.
            </Text>
            <Button
              variant="gradient"
              gradient={{ from: "pink", to: "grey" }}
              size="sm"
              className={classes.control}
              mt={40}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Hero;
