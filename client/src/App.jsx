import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Nav/Navbar";
import LoginPage from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";
import AboutUs from "./pages/About/AboutUs";
// import Services from "./pages/Services/Services";
import BookAppointment from "./pages/Dashboard/BookAppointment";
import DeleteAppointment from "./pages/Admin/DeleteAppointment";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateAppointment from "./pages/Admin/UpdateAppointment";
import Register from "./pages/Login/RegisterPage";
import DeleteRequest from "./pages/Dashboard/DeleteRequest";
import UserUpdate from "./pages/Dashboard/UserUpdate";
import AppointmentDetails from "./pages/Admin/AppointmentDetails";
import UserAppointmentDetails from "./pages/Dashboard/UserAppointmentDetails";
import Classic from "./pages/Services/Classic";
import Hybrid from "./pages/Services/Hybrid";
import Volume from "./pages/Services/Volume";
import Lift from "./pages/Services/LashLift";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/services" element={<Services />} /> */}
          <Route path="/services/classic" element={<Classic />} />
          <Route path="/services/hybrid" element={<Hybrid />} />
          <Route path="/services/volume" element={<Volume />} />
          <Route path="/services/lash-lifts" element={<Lift />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        
          <Route path="/dashboard/:userId" exact element={<Dashboard />} />
          <Route
            path="/user/appointment-details/:id"
            element={<UserAppointmentDetails />}
          />
          <Route path="/admin-dashboard" exact element={<AdminDashboard />} />
          <Route
            path="/admin/appointment-details/:id"
            element={<AppointmentDetails />}
          />
          <Route
            path="/admin/delete-appointment/:id"
            element={<DeleteAppointment />}
          />
          <Route
            path="/admin/update-appointment/:id"
            element={<UpdateAppointment />}
          />
          <Route path="/book-appointment/:id" element={<BookAppointment />} />

          <Route path="/update-appointment/:id" element={<UserUpdate />} />
          <Route
            path="/delete-appointment/:user_id/:id"
            element={<DeleteRequest />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
