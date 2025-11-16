import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Advantages from "@/components/Advantages/Advantages";
import Properties from "@/components/Properties/Properties";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";
import ContactForm from "@/components/ContactForm/ContactForm";
import Footer from "@/components/Footer/Footer";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Advantages />
      <Properties />
      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />
    </>
  );
}
