import { Container, Title, Text, Button, Divider } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
       
            Welcome to {" "}
             {/* Bella Lashes Inc{" "}*/}
        
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'white' }}
              >
                Bella Lashes Inc.
              </Text>{' '}
              {/* offers Classic, Volume and Max Volume Eyelash
              Extensions  */}
              
            </Title>
            <Divider my="xl" />

            {/* <Text className={classes.description} mt={30}>
              Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
              Extensions are a semi-permanent way of lengthening and thickening
              your Natural Eyelashes without the need for mascara or curlers.
            </Text> */}
  <Text size="lg" className={classes.description} mt={30}>
          Experience the best eyelash extensions in town! We specialize in creating longer, thicker, and fuller lashes without the need for mascara or curlers.
        </Text>
        <Text size="lg" className={classes.description}>
          Offering a variety of lengths, thicknesses, and curls, we ensure each look is personalized to suit you. Whether for everyday wear or special occasions, wake up looking fabulous!
        </Text>
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'grey' }}
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