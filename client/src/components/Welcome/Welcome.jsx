// import React from "react";
// import {
//   Text,
//   Container,
//   Title,
//   SimpleGrid,
//   Button,
//   Card,
//   Divider,
// } from "@mantine/core";
// import { IconEye } from "@tabler/icons-react";
// import classes from "./Welcome.module.css";

// export function Welcome() {
//   return (
//     <Container size="lg" className={classes.wrapper}>
//       <Container size={660} p={0} mt="md" align="center">
//         <Title className={classes.title} order={1}>
//           Welcome
//         </Title>
//         <Text c="dimmed" className={classes.description} mb="xl">
//           Achieve longer, thicker, and fuller lashes with our expertly crafted
//           eyelash extensions, designed to enhance your natural beauty—no mascara
//           needed. We offer a wide range of lengths, thicknesses, and curls,
//           ensuring each set is uniquely tailored to you. Whether you’re
//           preparing for a special occasion or want to wake up looking
//           effortlessly beautiful every day, our lash extensions are the perfect
//           choice. Safe, comfortable, and long-lasting, they’ll have you looking
//           and feeling fabulous from the moment you wake up.
//         </Text>
//       </Container>

//       <Divider my="xl" />
//       <Title order={2} align="center" className={classes.subtitle}>
//         Our Services
//       </Title>

//       <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Classic Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             Natural-looking extensions to enhance your beauty. Perfect for a
//             subtle yet stunning look.
//           </Text>
//           <Text weight={700} mt="sm">
//             $100
//           </Text>
//         </Card>

//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Volume Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             For a more dramatic and fuller lash appearance, ideal for bold
//             beauty lovers.
//           </Text>
//           <Text weight={700} mt="sm">
//             $150
//           </Text>
//         </Card>

//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Hybrid Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             A mix of classic and volume extensions for the best of both worlds.
//           </Text>
//           <Text weight={700} mt="sm">
//             $130
//           </Text>
//         </Card>
//       </SimpleGrid>
//       <Container mt="md" align="center">
//         <Button
//           size="sm"
//           mt="sm"
//           variant="filled"
//           color="pink"
//           radius="md"
//           component="a"
//           href="/services"
//         >
//           View Services
//         </Button>
//       </Container>

//       <Divider my="xl" />
//     </Container>
//   );
// }

// export default Welcome;
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
    console.log(`Selected service: ${serviceName}`);
    // You could also redirect, open a modal, or perform other actions here.
  };

  return (
    <Container size="lg" className={classes.wrapper}>
      <Container size={660} p={0} mt="md" align="center">
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

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={classes.card}
          onClick={() => handleCardClick("Classic Lash Extensions")}
          style={{ cursor: "pointer" }} // Optional: change cursor on hover
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Classic Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            Natural-looking extensions to enhance your beauty. Perfect for a
            subtle yet stunning look.
          </Text>
          <Text weight={700} mt="sm">
            $100
          </Text>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={classes.card}
          onClick={() => handleCardClick("Volume Lash Extensions")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Volume Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            For a more dramatic and fuller lash appearance, ideal for bold
            beauty lovers.
          </Text>
          <Text weight={700} mt="sm">
            $150
          </Text>
        </Card>

        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={classes.card}
          onClick={() => handleCardClick("Hybrid Lash Extensions")}
          style={{ cursor: "pointer" }}
        >
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Hybrid Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            A mix of classic and volume extensions for the best of both worlds.
          </Text>
          <Text weight={700} mt="sm">
            $130
          </Text>
        </Card>
      </SimpleGrid>

      <Container mt="md" align="center">
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
      </Container>

      <Divider my="xl" />
    </Container>
  );
}

export default Welcome;
