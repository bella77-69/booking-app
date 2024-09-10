import {
  Container,
  Title,
  Text,
  Paper,
  Image,
  Group,
  Stack,
} from "@mantine/core";
import aboutImg from "../../assets/images/about.png";
import classes from "./AboutUs.module.css";

function AboutUs() {
  return (
    <Container size="lg" className={classes.wrapper} mt="xl">
      <Title order={1} align="center" mb="lg">
        About Us
      </Title>

      <Container size={700}>
        <Group position="center" spacing="xl">
          <Image
            src={aboutImg}
            alt="eyelash-extensions"
            className="img-fluid"
            radius="md"
            withPlaceholder
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Group>

        <Paper padding="xl" mt="lg">
          <Stack spacing="md">
            <Text size="md">
              Longer, thicker, and fuller lashes! Bella Lashes Inc Eyelash
              Extensions are a semi-permanent way of lengthening and thickening
              your natural eyelashes without the need for mascara or curlers.
            </Text>
            <Text size="md">
              Bella Lashes Inc Eyelashes are virtually weightless and curved to
              replicate a natural eyelash. These lashes are water-resistant,
              lightweight, and utterly flawless. No one will ever guess that you
              have eyelash extensions.
            </Text>
            <Text size="md">
              Bella Lashes Inc. offers Classic, Volume, and Max Volume Eyelash
              Extensions along with other beauty services including Lash Lifts,
              Lash and Brow Tints. Bella Lashes Inc is your one-stop shop for
              all your beauty needs!
            </Text>
          </Stack>
        </Paper>
      </Container>
    </Container>
  );
}

export default AboutUs;
