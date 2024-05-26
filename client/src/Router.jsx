// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { LoginPage } from './pages/LoginPage';

// const router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <HomePage />,
// //   },
//     {
//         path: '/login',
//         element: <LoginPage />,
//     },
//     {
//         path: '/signup',
//         element: <LoginPage />,
//     }
// ]);

// export function Router() {
//   return <RouterProvider router={router} />;
// }
import Layout from "./components/Misc/Layout";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./services/ProtectedRoute";
import HomePage from "./pages/Home/HomePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/About/AboutUs";
import Dashboard from "./pages/Dashboard/Dashboard";
// import BookingPage from "./pages/BookingPage";
// import BookingDetailsPage from "./pages/BookingDetailsPage";
// import EditBookingPage from "./pages/EditBookingPage";

export const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/auth/regiser"
          element={
            <ProtectedRoute >
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path='/auth/dashboard' element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
        } />

        {/* <Route
          path="/booking"
          element={
            <ProtectedRoute >
              <BookingPage />
            </ProtectedRoute>
          }
          loader={bookingLoader}
        /> */}
        {/* <Route
          path="/booking/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <BookingDetailsPage />
            </ProtectedRoute>
          }
          loader={bookingDetailsLoader}
        /> */}
        {/* <Route
          path="/booking/edit/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <EditBookingPage />
            </ProtectedRoute>
          }
          loader={bookingDetailsLoader}
        /> */}
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return router;
};
