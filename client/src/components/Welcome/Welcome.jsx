import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
import IMAGES from '../../assets/images/main.jpg';
import classes from './Welcome.module.css';

const data = [
  {
    image: 'classic Lashes',
    title: 'Classic Lashes',
    src: '../../assets/images/classic.jpg',
    description: 'Classic Lashes are a single extension applied to a single natural lash',
  },
  {
    image: 'Hybrid Lashes',
    title: 'Hybrid Lashes',
    description: 'Fans obsess over the particular length and angle of its arms',
  },
  {
    image: 'Volume Lashes',
    title: 'Volume Lashes',
    description: 'They divvy up their prey evenly among the members of their pack',
  },
  {
    image: 'Lash Lifts',
    title: 'Lash Lifts',
    description: 'Phanpy uses its long nose to shower itself',
  },
];

export function Welcome() {
  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
        <Image src={IMAGES[item.image]} />
      </ThemeIcon>

      <div>
        <Text fw={700} fz="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text c="dimmed">{item.description}</Text>
      </div>
    </div>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      {/* <Text className={classes.supTitle}>Use cases</Text> */}

      <Title className={classes.title} order={2}>
      Bella  Lashes Inc
      </Title>

      <Container size={660} p={0}>
        <Text c="dimmed" className={classes.description}>
        Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
              Extensions are a semi-permanent way of lengthening and thickening
              your Natural Eyelashes without the need for mascara or curlers.
        </Text>
        <Text c="dimmed" className={classes.description}>
            We offer a variety of lengths, thicknesses, and curls to create a customized look for each client. 
            Our lash extensions are safe, comfortable, and long-lasting. 
            They are perfect for everyday wear, special occasions, or for those who just want to wake up looking fabulous!
        </Text>
      </Container>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
}