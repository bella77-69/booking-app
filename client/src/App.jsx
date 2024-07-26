import React from "react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Nav/Navbar";
import LoginPage from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import HomePage from "./pages/Home/HomePage";
import BookAppointment from "./pages/Dashboard/BookAppointment";
import DeleteAppointment from "./pages/Admin/DeleteAppointment";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UpdateAppointment from "./pages/Admin/UpdateAppointment";
import RequestUpdateAppointment from "./pages/Dashboard/RequestUpdateAppointment";
import Register from "./pages/Login/RegisterPage";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<Register/>} />

          <Route path="/dashboard/:userId" exact element={<Dashboard />} />
          <Route
            path="/admin-dashboard/:userId"
            exact
            element={<AdminDashboard />}
          />
          <Route
            path="/admin/update-appointment/:id"
            element={<UpdateAppointment />}
          />
          <Route path="/book-appointment/:id" element={<BookAppointment />} />

          <Route
            path="/admin/delete-appointment/:id"
            element={<DeleteAppointment />}
          />
          <Route path="/update-appointment/:id" element={<RequestUpdateAppointment />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
