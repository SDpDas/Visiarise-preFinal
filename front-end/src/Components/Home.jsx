import Footer from "./Footer";
import Hero from "./Hero"; 
import Navbar from "./Navbar.jsx";
import Hero_page from "./Hero_page.jsx";
import Headset from "./Headset.jsx";
import Services from "./Services.jsx";
import Content from "./Content.jsx";

const Home = () => {
    return (
      <div>  
      <Navbar />
       <Hero_page/>
       <Headset/>
       <Services/>
       <Hero/>
       <Content/>
       <Footer />
      </div>
    );
  };
  
  export default Home;

  