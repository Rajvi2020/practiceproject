import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 mt-[76px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
