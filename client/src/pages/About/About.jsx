import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';
import Asus from './icons/asus-logo.svg';
import Apple from './icons/apple.svg';
import Acer from './icons/acer.svg';
import HP from './icons/hp.svg';
import Lenovo from './icons/lenovo.svg';
import './About.scss';

const textAnimation = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};

const About = () => {
  return (
    <Container className="about-page" maxWidth="lg">
      <motion.Container
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
      >
        <Container maxWidth="md">
          <motion.h1 className="about-page__header" custom={1} variants={textAnimation}>
            {' '}
            Best Laptop<span className="about-page__header--span">24</span> &nbsp;{' '}
            <span className="about-page__header--sinse">since 2020</span>
          </motion.h1>
          <motion.p className="about-page__description" custom={2} variants={textAnimation}>
            The BestLaptop24 makes it possible to use modern laptops to ensure the productivity of
            successful companies. We choose only the most modern technologies from the world's best
            laptop manufacturers. Therefore, we guarantee you the quality of our products, which
            will ensure the productivity of your company for years. We also cooperate with
            educational institutions and provide our services for building effective learning and
            maximizing the efficiency of the interaction process of students, workers and people
            with a laptop. Therefore, our team will be happy to select equipment for your needs. The
            importance and necessity of laptops is difficult to overestimate. This is a very useful
            device that is simply indispensable for work, study and many other purposes. Buy devices
            at Best Laptop 24, because this is the best guarantee that in the end you will get a
            high-quality and reliable laptop that will serve stably, without interruptions and as
            long as possible.
          </motion.p>
        </Container>
        <motion.h1 className="about-page__header" custom={4} variants={textAnimation}>
          {' '}
          Our partners
        </motion.h1>

        <Box className="block-partners-logo">
          <motion.img
            className="size-logo-mobille"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={3}
            variants={textAnimation}
            src={Asus}
            alt="Asus"
          />
          <motion.img
            className="size-logo-mobille"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={5}
            variants={textAnimation}
            src={Acer}
            alt="Acer"
          />
          <motion.img
            className="size-logo-mobille"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={3}
            variants={textAnimation}
            src={Apple}
            alt="Apple"
          />
          <motion.img
            className="size-logo-mobille"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={5}
            variants={textAnimation}
            src={HP}
            alt="HP"
          />
          <motion.img
            className="size-logo-mobille"
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            custom={3}
            variants={textAnimation}
            src={Lenovo}
            alt="Lenovo"
          />
        </Box>
      </motion.Container>
    </Container>
  );
};

export default About;
