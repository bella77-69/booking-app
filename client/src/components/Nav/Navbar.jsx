import React, { useState, useEffect } from 'react';
import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  Divider,
  ScrollArea,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ActionToggle } from '../ColorScheme/ActionToggle';
import classes from './Navbar.module.css';
import {
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
} from '@tabler/icons-react';

export function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId'); // userId is stored in localStorage
    if (token) {
      setIsLoggedIn(true);
      setUserId(storedUserId); // Set userId from localStorage
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Remove userId on logout
    setIsLoggedIn(false);
    setUserId(null);
    window.location.href = "/login";
  };

  const loginHref = '/login';
  const signupHref = '/register';

  // Define menu links
  const menuLinks = [
    { icon: IconCode, title: 'Home', description: 'Home Page', href: '/' },
    { icon: IconCoin, title: 'About Us', description: 'About Us Page', href: '/about' },
    // { icon: IconBook, title: 'Services', description: 'Services Page', href: '/services' },
  ];

  // Conditionally add dashboard and appointment links if user is logged in
  if (isLoggedIn && userId) {
    menuLinks.push(
      { icon: IconChartPie3, title: 'Dashboard', description: 'Your Dashboard', href: `/dashboard/${userId}` },
      { icon: IconFingerprint, title: 'Book Appointment', description: 'Book an Appointment', href: `/book-appointment/${userId}` }
    );
  }

  // Render links
  const links = menuLinks.map((link) => (
    <a href={link.href} className={classes.link} key={link.title}>
      {link.title}
    </a>
  ));

  return (
    <Box pb={5} mt={5}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group h="100%" gap={0} visibleFrom="sm">
            {links}
          </Group>

          <Group visibleFrom="sm">
            {!isLoggedIn ? (
              <>
                <Button component="a" href={loginHref} variant="default">Log in</Button>
                <Button component="a" href={signupHref}>Sign up</Button>
              </>
            ) : (
              <>
                <Button onClick={logout} variant="default">Log out</Button>
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
          {links}

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            {!isLoggedIn ? (
              <>
                <Button component="a" href={loginHref} variant="default">Log in</Button>
                <Button component="a" href={signupHref}>Sign up</Button>
              </>
            ) : (
              <>
                <Button onClick={logout} variant="default">Log out</Button>
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

