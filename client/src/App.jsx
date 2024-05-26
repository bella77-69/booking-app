// import '@mantine/core/styles.css';
// import { MantineProvider } from '@mantine/core';
// import { Header } from './components/Nav/Header';
// import { Welcome } from './components/Welcome/Welcome';
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import { Hero } from './components/Hero/Hero';
// import { Footer } from './components/Footer/Footer';

// export default function App() {
//   return <MantineProvider>
//     <>
//     <Router />
//       <Header />
//       <Hero />
//       <Welcome />
//       <Footer />
//     </>
    
//     </MantineProvider>;
// }

// import { RouterProvider } from "react-router-dom";
// import ProviderLayout from "./ProviderLayout";
// import { Router } from "./Router";
// import "@mantine/core/styles.css";

// function App() {
//   const router = Router();
//   return (
//     <ProviderLayout>
//       <RouterProvider router={router} />
//     </ProviderLayout>
//   );
// }

// export default App;

import React from "react";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Nav/Navbar";
import AboutUs from "./pages/About/AboutUs";
import LoginPage from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";



function App() {
  return <MantineProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        {/* <Route path='/about' element={<AboutUs/>} /> */}
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
    </MantineProvider>;
  
}

export default App;