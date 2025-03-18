import Feature from "../Feature/Feature";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import AnnouncementSlider from "../../pages/AnnouncementSlider";
import FloatingButtons from "../../pages/FloatingButtons";

// this is just a home front page...

const HomePage = () => {  

  return (
    <>
      <AnnouncementSlider />
      <Navbar />
      <Feature />
      <Footer />
      <FloatingButtons />
    </>
  );
};

export default HomePage;
