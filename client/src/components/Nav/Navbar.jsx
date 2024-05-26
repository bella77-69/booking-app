// import {
//   HoverCard,
//   Group,
//   Button,
//   UnstyledButton,
//   Text,
//   SimpleGrid,
//   ThemeIcon,
//   Anchor,
//   Divider,
//   Center,
//   Box,
//   Burger,
//   Drawer,
//   Collapse,
//   ScrollArea,
//   rem,
//   useMantineTheme,
// } from '@mantine/core';
// import logoImage from '../../assets/logo/logo2.png';
// // import { Logo } from '../../assets/logo/logo4.png'
// import { useDisclosure } from '@mantine/hooks';
// import {
//   IconNotification,
//   IconCode,
//   IconBook,
//   IconChartPie3,
//   IconFingerprint,
//   IconCoin,
//   IconChevronDown,
// } from '@tabler/icons-react';
// import classes from './Header.module.css';
// import { ActionToggle } from '../ColorScheme/ActionToggle';

// const mockdata = [
//   {
//     icon: IconCode,
//     title: 'Home',
//     description: 'Home Page',
//   },
//   {
//     icon: IconCoin,
//     title: 'About Us',
//     description: 'About Us Page',
//   },
//   {
//     icon: IconBook,
//     title: 'Services',
//     description: 'Services Page',
//   },
//   {
//     icon: IconFingerprint,
//     title: 'Booking',
//     description: 'Booking Page',
//   },
//   {
//     icon: IconChartPie3,
//     title: 'Login',
//     description: 'Login Page',
//   },
//   {
//     icon: IconNotification,
//     title: 'Sign Up',
//     description: 'Sign Up Page',
//   },
// ];

// export function Header() {
//   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
//   // const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
//   const theme = useMantineTheme();

//   const links = mockdata.map((item) => (
//     <UnstyledButton className={classes.subLink} key={item.title}>
//       <Group wrap="nowrap" align="flex-start">
//         <ThemeIcon size={34} variant="default" radius="md">
//           <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
//         </ThemeIcon>
//         <div>
//           <Text size="sm" fw={500}>
//             {item.title}
//           </Text>
//           <Text size="xs" c="dimmed">
//             {item.description}
//           </Text>
//         </div>
//       </Group>
//     </UnstyledButton>
//   ));

//   return (
    
//     <Box pb={30}>
//      {/* <ActionToggle /> */}
//       <header className={classes.header}>
//         <Group justify="space-between" h="100%">
//         {/* <img src={logoImage} alt="Logo" className={classes.logo} /> */}
    
//         <Group h="100%" gap={0} visibleFrom="sm">
//             <a href="/" className={classes.link}>
//               Home
//             </a>
  
//             <a href="/about" className={classes.link}>
//               About Us
//             </a>
//             <a href="/services" className={classes.link}>
//               Sevices
//             </a>
//             <a href="/booking" className={classes.link}>
//               Booking
//             </a>
//           </Group>
         
//           <Group visibleFrom="sm">
//             <Button variant="default">Log in</Button>
//             <Button>Sign up</Button>
//             <ActionToggle />
//           </Group>
         
//           <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
//         </Group>
//       </header>

//       <Drawer
//         opened={drawerOpened}
//         onClose={closeDrawer}
//         size="100%"
//         padding="md"
//         title="Navigation"
//         hiddenFrom="sm"
//         zIndex={1000000}
        
//       >
  
//         <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
//           <Divider my="sm" />
    
//           <a href="/" className={classes.link}>
//             Home
//           </a>
//           <a href="/about" className={classes.link}>
//             About
//           </a>
//           <a href="/services" className={classes.link}>
//             Services
//           </a>
//           <a href="/booking" className={classes.link}>
//             Booking
//           </a>

//           <Divider my="sm" />

//           <Group justify="center" grow pb="xl" px="md">
//             <Button variant="default">Log in</Button>
//             <Button>Sign up</Button>
//             <ActionToggle />
//           </Group>
//         </ScrollArea>
//       </Drawer>
//     </Box>
//   );
// }

import React from 'react';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import logoImage from '../../assets/logo/logo2.png';
import { useDisclosure } from '@mantine/hooks';
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { ActionToggle } from '../ColorScheme/ActionToggle';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();

  const menuLinks = [
    { icon: IconCode, title: 'Home', description: 'Home Page', href: '/' },
    { icon: IconCoin, title: 'About Us', description: 'About Us Page', href: '/about' },
    { icon: IconBook, title: 'Services', description: 'Services Page', href: '/services' },
    { icon: IconFingerprint, title: 'Booking', description: 'Booking Page', href: '/booking' },
  ];

  const links = menuLinks.map((link) => (
    <a href={link.href} className={classes.link} key={link.title}>
      {link.title}
    </a>
  ));

  const loginHref = '/login';
  const signupHref = '/signup';

  return (
    <Box pb={30}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>
          <Group visibleFrom="sm">
            <Button component="a" href={loginHref} variant="default">Log in</Button>
            <Button component="a" href={signupHref}>Sign up</Button>
            <ActionToggle />
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          {menuLinks.map((link) => (
            <a href={link.href} className={classes.link} key={link.title}>
              {link.title}
            </a>
          ))}
          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button component="a" href={loginHref} variant="default">Log in</Button>
            <Button component="a" href={signupHref}>Sign up</Button>
            <ActionToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;