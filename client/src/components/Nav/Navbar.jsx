import React, { useState, useEffect } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []); // Run once when component mounts

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
    <Box pb={20} mt={20}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>
          <Group visibleFrom="sm">
            {!isLoggedIn && ( 
              <>
                <Button component="a" href={loginHref} variant="default">Log in</Button>
                <Button component="a" href={signupHref}>Sign up</Button>
              </>
            )}
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
            {!isLoggedIn && ( // Conditionally render login and signup buttons
              <>
                <Button component="a" href={loginHref} variant="default">Log in</Button>
                <Button component="a" href={signupHref}>Sign up</Button>
              </>
            )}
            <ActionToggle />
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default Navbar;
