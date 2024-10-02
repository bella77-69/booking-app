// // import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
// // import { Link } from 'react-router-dom';
// // import classicImage from '../../assets/images/classic.jpg';
// // import hybridImage from '../../assets/images/hybrid.jpg';
// // import volumeImage from '../../assets/images/volume.jpg';
// // import liftImage from '../../assets/images/lift.jpg';
// // import classes from './Welcome.module.css';

// // const data = [
// //   {
// //     image: classicImage,
// //     title: 'Classic Lashes',
// //     description: 'Classic Lashes are a single extension applied to a single natural lash',
// //     link: '/classic-lashes',
// //   },
// //   {
// //     image: hybridImage,
// //     title: 'Hybrid Lashes',
// //     description: 'Hybrid Lashes are a mix of Classic and Volume Lashes',
// //     link: '/hybrid-lashes',
// //   },
// //   {
// //     image: volumeImage,
// //     title: 'Volume Lashes',
// //     description: 'Volume Lashes are multiple extensions applied to a single natural lash',
// //     link: '/volume-lashes',
// //   },
// //   {
// //     image: liftImage,
// //     title: 'Lash Lifts',
// //     description: 'Lash lifts are a semi-permanent treatment that enhances your natural lashes',
// //     link: '/lash-lifts', 
// //   },
// // ];

// // export function Welcome() {
// //   const items = data.map((item) => (
// //     <Link to={item.link} key={item.title} className={classes.link}> 
// //       <div className={classes.item}>
// //         <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
// //           <Image src={item.image} />
// //         </ThemeIcon>
// //         <div>
// //           <Text fw={700} fz="lg" className={classes.itemTitle}>
// //             {item.title}
// //           </Text>
// //           <Text c="dimmed">{item.description}</Text>
// //         </div>
// //       </div>
// //     </Link>
// //   ));

// //   return (
// //     <Container size={700} className={classes.wrapper}>
// //       <Title className={classes.title} order={2}>
// //         Bella Lashes Inc
// //       </Title>
// //       <Container size={660} p={0}>
// //         <Text c="dimmed" className={classes.description}>
// //           Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
// //           Extensions are a semi-permanent way of lengthening and thickening
// //           your Natural Eyelashes without the need for mascara or curlers.
// //         </Text>
// //         <Text c="dimmed" className={classes.description}>
// //           We offer a variety of lengths, thicknesses, and curls to create a customized look for each client. 
// //           Our lash extensions are safe, comfortable, and long-lasting. 
// //           They are perfect for everyday wear, special occasions, or for those who just want to wake up looking fabulous!
// //         </Text>
// //       </Container>
// //       <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
// //         {items}
// //       </SimpleGrid>
// //     </Container>
// //   );
// // }
// import React from 'react';
// import { Text, Container,  Title, SimpleGrid } from '@mantine/core';

// import classes from './Welcome.module.css';

// export function Welcome() {
//   return (
//     <Container size={700} className={classes.wrapper}>
//       <Title className={classes.title} order={2}>
//         Bella Lashes Inc
//       </Title>
//       <Container size={660} p={0}>
//         <Text c="dimmed" className={classes.description}>
//           Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
//           Extensions are a semi-permanent way of lengthening and thickening
//           your Natural Eyelashes without the need for mascara or curlers.
//         </Text>
//         <Text c="dimmed" className={classes.description}>
//           We offer a variety of lengths, thicknesses, and curls to create a customized look for each client. 
//           Our lash extensions are safe, comfortable, and long-lasting. 
//           They are perfect for everyday wear, special occasions, or for those who just want to wake up looking fabulous!
//         </Text>
//       </Container>
    
//     </Container>
//   );
// }

// import React from 'react';
// import { Text, Container, Title, SimpleGrid, Button, Image, Group, Card, Divider } from '@mantine/core';
// import { IconEye } from '@tabler/icons-react';
// import eyelashImage from '../../assets/images/banner.jpg';
// import classes from './Welcome.module.css';


// export function Welcome() {
//   return (
//     <Container size="lg" className={classes.wrapper}>

//       {/* Main Title */}
//       {/* <Title className={classes.title} align="center" order={1}>
//         Welcome to Bella Lashes Inc
//       </Title> */}

//       {/* Description */}
//       <Container size={660} p={0} mt="md" align='center'>
//       <SimpleGrid cols={2} spacing="lg" mt="md">
//         <Card padding="lg" radius="md">
//           <Button size="sm" variant="filled" color="pink" radius="md" component="a" href="/services">
//           View Services
//         </Button>
//         </Card>

//         <Card padding="lg" radius="md">
//         <Button size="sm" variant="outline" color="pink" radius="md" component="a" href="/book-appointment">
//           Book an Appointment
//         </Button>
        
//         </Card>

    
//       </SimpleGrid>


    
     
//         {/* <Text c="dimmed" align="center" size="lg" className={classes.description}>
//           Experience the best eyelash extensions in town! We specialize in creating longer, thicker, and fuller lashes without the need for mascara or curlers.
//         </Text>
//         <Text c="dimmed" align="center" size="lg" className={classes.description}>
//           Offering a variety of lengths, thicknesses, and curls, we ensure each look is personalized to suit you. Whether for everyday wear or special occasions, wake up looking fabulous!
//         </Text> */}
//       </Container>

//       {/* CTA Section */}
//       {/* <Group position="center" mt="xl">
//         <Button size="lg" variant="filled" color="pink" radius="md" component="a" href="/services">
//           View Services
//         </Button>
//         <Button size="lg" variant="outline" color="pink" radius="md" component="a" href="/book-appointment">
//           Book an Appointment
//         </Button>
//       </Group> */}

//       {/* Services Section */}
//       <Divider my="xl" />
//       <Title order={2} align="center" className={classes.subtitle}>
//         Our Services
//       </Title>

//       <SimpleGrid cols={3} spacing="lg" mt="md">
//         <Card shadow="sm" padding="lg" radius="md">
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Classic Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             Natural-looking extensions to enhance your beauty. Perfect for a subtle yet stunning look.
//           </Text>
//           <Text weight={700} mt="sm">$100</Text>
//         </Card>

//         <Card shadow="sm" padding="lg" radius="md">
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Volume Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             For a more dramatic and fuller lash appearance, ideal for bold beauty lovers.
//           </Text>
//           <Text weight={700} mt="sm">$150</Text>
//         </Card>

//         <Card shadow="sm" padding="lg" radius="md">
//           <IconEye size={40} color="pink" />
//           <Text weight={500} size="md" mt="sm">
//             Hybrid Lash Extensions
//           </Text>
//           <Text color="dimmed" size="sm">
//             A mix of classic and volume extensions for the best of both worlds.
//           </Text>
//           <Text weight={700} mt="sm">$130</Text>
//         </Card>
//       </SimpleGrid>

//       {/* Testimonials Section */}
//       {/* <Divider my="xl" />
//       <Title order={2} align="center" className={classes.subtitle}>
//         What Our Clients Say
//       </Title>

//       <SimpleGrid cols={2} spacing="lg" mt="md">
//         <Card shadow="sm" padding="lg" radius="md">
//           <Text size="md" weight={500}>
//             "Bella Lashes transformed my lashes! I feel confident without even using makeup!"
//           </Text>
//           <Text color="dimmed" size="sm" mt="xs">
//             – Emma, Regular Client
//           </Text>
//         </Card>

//         <Card shadow="sm" padding="lg" radius="md">
//           <Text size="md" weight={500}>
//             "Amazing service! I got the volume lashes for my wedding and couldn't be happier!"
//           </Text>
//           <Text color="dimmed" size="sm" mt="xs">
//             – Sarah, Bride
//           </Text>
//         </Card>
//       </SimpleGrid> */}

//       {/* Image Section */}
//       <Divider my="xl" />
//       <Container mt="xl" align="center">
//         <Image src={eyelashImage} alt="Eyelash Extensions" radius="md" />
//       </Container>
//       <Divider my="xl" />
//       {/* Call to Action Section */}
//       {/* <Group position="center" mt="xl">
//         <Button size="lg" variant="filled" color="pink" radius="md" component="a" href="/book-appointment">
//           Book Your Appointment Now
//         </Button>
//       </Group> */}

//     </Container>
//   );
// }

// export default Welcome;
import React from 'react';
import { Text, Container, Title, SimpleGrid, Button, Image, Group, Card, Divider } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import eyelashImage from '../../assets/images/banner.jpg';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <Container size="lg" className={classes.wrapper}>
      <Container size={660} p={0} mt="md" align='center'>
        <Title className={classes.title} order={1}>Welcome</Title>
        <Text c="dimmed" className={classes.description} mb="xl">
          Longer, thicker, and fuller lashes! Our eyelash extensions are designed to enhance your natural beauty without the need for mascara.
        </Text>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt="md">
          {/* <Button size="sm" variant="filled" color="pink" radius="md" fullWidth component="a" href="/services">
            View Services
          </Button> */}
          {/* <Button size="sm" variant="outline" color="pink" radius="md" fullWidth component="a" href="/book-appointment">
            Book an Appointment
          </Button> */}
        </SimpleGrid>
      </Container>

      <Divider my="xl" />
      <Title order={2} align="center" className={classes.subtitle}>
        Our Services
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Classic Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            Natural-looking extensions to enhance your beauty. Perfect for a subtle yet stunning look.
          </Text>
          <Text weight={700} mt="sm">$100</Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Volume Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            For a more dramatic and fuller lash appearance, ideal for bold beauty lovers.
          </Text>
          <Text weight={700} mt="sm">$150</Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <IconEye size={40} color="pink" />
          <Text weight={500} size="md" mt="sm">
            Hybrid Lash Extensions
          </Text>
          <Text color="dimmed" size="sm">
            A mix of classic and volume extensions for the best of both worlds.
          </Text>
          <Text weight={700} mt="sm">$130</Text>
        </Card>
      
      </SimpleGrid>
       <Divider my="xl" />
      <Button size="sm" variant="filled" color="pink" radius="md" fullWidth component="a" href="/services">
            View Services
          </Button>
      <Divider my="xl" />
      {/* <Container mt="md" align="center">
        <Image src={eyelashImage} alt="Eyelash Extensions" radius="md" withPlaceholder />
      </Container> */}
      {/* <Divider my="xl" /> */}

      {/* <Group position="center" mt="md">
        <Button size="lg" variant="filled" color="pink" radius="md" component="a" href="`/book-appointment/${userId}`">
          Book Your Appointment Now
        </Button>
      </Group> */}
    </Container>
  );
}

export default Welcome;
