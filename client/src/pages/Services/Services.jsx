// File: src/pages/Services.jsx

import { Image, Text, Container, ThemeIcon, Title, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import classicImage from '../../assets/images/classic.jpg';
import hybridImage from '../../assets/images/hybrid.jpg';
import volumeImage from '../../assets/images/volume.jpg';
import liftImage from '../../assets/images/lift.jpg';
import classes from './Services.module.css';

class Service {
  constructor(image, title, description, link, basePrice, isAvailable = true) {
    this.image = image;
    this.title = title;
    this.description = description;
    this.link = link;
    this.basePrice = basePrice;
    this.isAvailable = isAvailable;
  }

  // Method to apply a discount
  applyDiscount(discountPercent) {
    const discountMessage = `Now with ${discountPercent}% off!`;
    this.description = `${this.description} ${discountMessage}`;
  }

  // Method to update availability status
  updateAvailability(status) {
    this.isAvailable = status;
  }

  // Method to dynamically adjust price based on user preferences
  adjustPriceBasedOnPreferences(userPreferences) {
    let finalPrice = this.basePrice;

    // Example: Increase price for premium options (e.g., premium lash material)
    if (userPreferences.premiumMaterial) {
      finalPrice += 20; // Add $20 for premium material
    }

    // Example: Apply discount for first-time customers
    if (userPreferences.isFirstTimeCustomer) {
      finalPrice -= finalPrice * 0.1; // 10% off for first-time customers
    }

    return finalPrice.toFixed(2); // Return price with two decimal points
  }
}

// Instantiate the Service objects
const servicesData = [
  new Service(
    classicImage,
    'Classic Lashes',
    'Classic Lashes are a single extension applied to a single natural lash',
    '/classic-lashes',
    100 // base price
  ),
  new Service(
    hybridImage,
    'Hybrid Lashes',
    'Hybrid Lashes are a mix of Classic and Volume Lashes',
    '/hybrid-lashes',
    120 // base price
  ),
  new Service(
    volumeImage,
    'Volume Lashes',
    'Volume Lashes are multiple extensions applied to a single natural lash',
    '/volume-lashes',
    140 // base price
  ),
  new Service(
    liftImage,
    'Lash Lifts',
    'Lash lifts are a semi-permanent treatment that enhances your natural lashes',
    '/lash-lifts',
    80 // base price
  ),
];

// Example: Apply a discount and adjust availability for certain services
servicesData[0].applyDiscount(20); // 20% off Classic Lashes
servicesData[2].updateAvailability(false); // Volume Lashes are out of stock

// Example of user preferences to adjust pricing
const userPreferences = {
  premiumMaterial: true,
  isFirstTimeCustomer: true,
};

// Dynamically calculate the price for the first service (Classic Lashes)
const adjustedPrice = servicesData[0].adjustPriceBasedOnPreferences(userPreferences);

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
          {!service.isAvailable && (
            <Text c="red" fw={700}>Currently Unavailable</Text>
          )}
          <Text fw={700}>Price: ${service.adjustPriceBasedOnPreferences(userPreferences)}</Text>
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
