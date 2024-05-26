import { Container, Title, Text } from "@mantine/core";
import aboutImg from "../../assets/images/banner-eyelash.jpg";
import classes from './AboutUs.module.css';

function AboutUs(props) {
    return (
      <Container size={700} className={classes.wrapper}>
  
      <Title className="text-center" order={2}>
        About Us
      </Title>
        {/* <Title title="Our Story" /> */}
        <Container size={660} p={0}>
          <div className="col-md-8">
            {/* <img
              className="img-fluid p-1 mt-2"
              src={aboutImg}
              alt="eyelash-extensions"
            /> */}
          </div>
          <div className="col-md-6 mt-2">
            <Text c="dimmed" className="description">
           
              Longer, thicker and fuller Lashes! Bella Lashes Inc Eyelash
              Extensions are a semi-permanent way of lengthening and thickening
              your Natural Eyelashes without the need for mascara or curlers.
            </Text>
            <p>
              Bella Lashes Inc Eyelashes are virtually weightless, and curved to
              replicate a Natural Eyelash. These Lashes are water-resistant,
              light weight and utterly flawless. No one will ever guess that
              you have Eyelash Extensions.
            </p>
            <p>
              Bella Lashes Inc. offers Classic, Volume and Max Volume Eyelash
              Extensions along with other beauty services including Lash Lifts,
              Lash and Brow Tints. Bella Lashes Inc is your one stop shop for
              all your beauty needs!
            </p>
          </div>
        </Container>
      
      </Container>
    );
}

export default AboutUs;