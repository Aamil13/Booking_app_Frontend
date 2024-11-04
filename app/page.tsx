import Image from "next/image";
import Hero from "./components/hero/Hero";
import Featured from "./components/Featured/Featured";
import PropertyCarousels from "./components/Carousel/PropertyCarousels";

import HomeGuestCarousel from "./components/Carousel/HomeGuestCarousel";
import Suscribe from "./components/Suscribe/Suscribe";
import Footer from "./components/shared/Footer";
import Copyright from "./components/shared/Copyright";

export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <PropertyCarousels />
      <HomeGuestCarousel />
      <Suscribe />
      <Footer />
      <Copyright />
    </>
  );
}
