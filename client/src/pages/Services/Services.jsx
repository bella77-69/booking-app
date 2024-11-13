import {
  Image,
  Text,
  Container,
  Title,
  SimpleGrid,
  Button,
  Card,
  Divider,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classicImage from "../../assets/images/classic.jpg";
import hybridImage from "../../assets/images/classic.jpg";
import volumeImage from "../../assets/images/volume.jpg";
import liftImage from "../../assets/images/volume.jpg";
import classes from "./Services.module.css";

class Service {
  constructor(image, title, description, price, duration, link) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.price = price;
    this.duration = duration;
    this.link = link;
  }

  applyDiscount(discountPercent) {
    const discountMessage = `Now with ${discountPercent}% off!`;
    this.description = `${this.description} ${discountMessage}`;
  }
}

// Instantiate Service objects
const servicesData = [
  new Service(
    classicImage,
    "Classic Lashes",
    "Single extension per natural lash.",
    "$100",
    "1.5 hours",
    "/services/classic"
  ),
  new Service(
    hybridImage,
    "Hybrid Lashes",
    "Mix of Classic and Volume Lashes.",
    "$120",
    "1.75 hours",
    "/services/hybrid"
  ),
  new Service(
    volumeImage,
    "Volume Lashes",
    "Multiple extensions per natural lash.",
    "$150",
    "2 hours",
    "/services/volume"
  ),
  new Service(
    liftImage,
    "Lash Lifts",
    "Semi-permanent natural lash enhancement.",
    "$90",
    "1 hour",
    "/lash-lifts"
  ),
];

servicesData[0].applyDiscount(10);
servicesData[2].applyDiscount(15);

export function Services() {
  const items = servicesData.map((service) => (
    <Card
      key={service.title}
      shadow="sm"
      padding="lg"
      radius="md"
      className={classes.card}
    >
      <Image
        src={service.image}
        alt={service.title}
        className={classes.image}
      />
      <Title order={2} className={classes.title}>
        {service.title}
      </Title>
      <Text className={classes.description}>{service.description}</Text>
      <Divider my="sm" />
      {/* <SimpleGrid cols={2} className={classes.details}>
        <Text fw={700}>Price</Text>
        <Text>{service.price}</Text>
        <Text fw={700}>Duration</Text>
        <Text>{service.duration}</Text>
      </SimpleGrid> */}
      <Button
        variant="filled"
        color="pink"
        size="sm"
        className={classes.bookButton}
        component={Link}
        to={service.link}
      >
        View Details
      </Button>
    </Card>
  ));

  return (
    <Container size="lg" className={classes.wrapper}>
      <Container size={660} p={0} mt="md" align="center">
        <Title className={classes.title}>Bella Lashes Inc</Title>
        <Text className={classes.subtitle}>
          Longer, thicker, and fuller lashes! Bella Lashes Inc offers
          semi-permanent eyelash extensions to enhance your natural beauty.
        </Text>
      </Container>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
}

export default Services;
