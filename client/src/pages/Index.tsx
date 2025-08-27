import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Membership from "../components/Membership";
import Schedule from "../components/Schedule";
import Trainers from "../components/Trainers";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Membership />
      <Schedule />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
