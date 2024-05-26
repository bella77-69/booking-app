import { Container, Title, Text, Button } from '@mantine/core';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
            
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

            <Text className={classes.description} mt={30}>
              Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
              Extensions are a semi-permanent way of lengthening and thickening
              your Natural Eyelashes without the need for mascara or curlers.
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'grey' }}
              size="xl"
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