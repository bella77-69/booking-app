import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Nav/Header";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
