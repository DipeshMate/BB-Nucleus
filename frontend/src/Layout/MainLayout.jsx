import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
// import { ToastContainer, toast } from "react-toastify";
import { SnackbarProvider } from "notistack";

// import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import AnnouncementSlider from "../pages/AnnouncementSlider";
import FloatingButtons from "../pages/FloatingButtons";
const MainLayout = () => {

  return (
    <div>
      <AnnouncementSlider />
      <Navbar />
      {/* <ToastContainer /> */}
      <SnackbarProvider maxSnack={3}/>
      <Outlet />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default MainLayout;
