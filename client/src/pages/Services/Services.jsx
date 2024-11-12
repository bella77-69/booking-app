// File: src/pages/Services.jsx

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import classicImage from '../../assets/images/classic.jpg';
import hybridImage from '../../assets/images/hybrid.jpg';
import volumeImage from '../../assets/images/volume.jpg';
import liftImage from '../../assets/images/lift.jpg';
import classes from './Services.module.css';

// Service Class
class Service {
  constructor(image, title, description, link) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.link = link;
  }

  // Method to apply a discount
  applyDiscount(discountPercent) {
    const discountMessage = `Now with ${discountPercent}% off!`;
    this.description = `${this.description} ${discountMessage}`;
  }
}

// Instantiate the Service objects
const servicesData = [
  new Service(
    classicImage,
    'Classic Lashes',
    'Classic Lashes are a single extension applied to a single natural lash',
    '/classic'
  ),
  new Service(
    hybridImage,
    'Hybrid Lashes',
    'Hybrid Lashes are a mix of Classic and Volume Lashes',
    '/hybrid'
  ),
  new Service(
    volumeImage,
    'Volume Lashes',
    'Volume Lashes are multiple extensions applied to a single natural lash',
    '/volume'
  ),
  new Service(
    liftImage,
    'Lash Lifts',
    'Lash lifts are a semi-permanent treatment that enhances your natural lashes',
    '/lash-lifts'
  ),
];

// Apply a discount to certain services (e.g., 20% off)
servicesData[0].applyDiscount(20); // 20% off Classic Lashes
servicesData[2].applyDiscount(15); // 15% off Volume Lashes

export function Services() {
  const items = servicesData.map((service) => (
    <Link to={service.link} key={service.title} className={classes.link}> 
      <div className={classes.item}>
        <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md">
          <Image src={service.image} />
        </ThemeIcon>
        <div>
          <Text fw={700} fz="lg" className={classes.itemTitle}>
            {service.title}
          </Text>
          <Text c="dimmed">{service.description}</Text>
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
