import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Nav/Navbar";
import AboutUs from "./pages/About/AboutUs";
import LoginPage from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";
import BookAppointment from "./pages/Dashboard/BookAppointment";
import UpdateAppointment from './pages/Dashboard/UpdateAppointment'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path='/about' element={<AboutUs/>} /> */}
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard/:id" exact element={<Dashboard />} />
          <Route path="/book-appointment/:id" element={<BookAppointment />} />
          <Route path="/update-appointment/:id" element={<UpdateAppointment />} />
          <Route path="/delete-appointment/:id" element={<Dashboard />} />
         
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
