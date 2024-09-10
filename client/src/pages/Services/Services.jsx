import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import classicImage from '../../assets/images/classic.jpg';
import hybridImage from '../../assets/images/hybrid.jpg';
import volumeImage from '../../assets/images/volume.jpg';
import liftImage from '../../assets/images/lift.jpg';
import classes from './Services.module.css';

const data = [
  {
    image: classicImage,
    title: 'Classic Lashes',
    description: 'Classic Lashes are a single extension applied to a single natural lash',
    link: '/classic-lashes',
  },
  {
    image: hybridImage,
    title: 'Hybrid Lashes',
    description: 'Hybrid Lashes are a mix of Classic and Volume Lashes',
    link: '/hybrid-lashes',
  },
  {
    image: volumeImage,
    title: 'Volume Lashes',
    description: 'Volume Lashes are multiple extensions applied to a single natural lash',
    link: '/volume-lashes',
  },
  {
    image: liftImage,
    title: 'Lash Lifts',
    description: 'Lash lifts are a semi-permanent treatment that enhances your natural lashes',
    link: '/lash-lifts', 
  },
];

export function Services() {
  const items = data.map((item) => (
    <Link to={item.link} key={item.title} className={classes.link}> 
      <div className={classes.item}>
        <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
          <Image src={item.image} />
        </ThemeIcon>
        <div>
          <Text fw={700} fz="lg" className={classes.itemTitle}>
            {item.title}
          </Text>
          <Text c="dimmed">{item.description}</Text>
        </div>
      </div>
    </Link>
  ));

  return (
    <Container size={700} className={classes.wrapper} mt='xl'>
      <Title className={classes.title} order={2}>
        Bella Lashes Inc
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

export default Services;
