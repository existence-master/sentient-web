import Context from "@pages/Context";
import Evolution from "@pages/Evolution";
import Features from "@pages/Features";
import Footer from "@pages/Footer";
import Hero from "@pages/Hero";
import Nav from "@components/Nav";
import Steps from "@pages/Steps";
import { Fragment } from "react";

const Home = () => {
  return (
    <Fragment>
      <Nav />
      <Hero />
      <Context />
      <Steps />
      <Evolution />
      <Features />
      <Footer />
    </Fragment>
  );
};

export default Home;
