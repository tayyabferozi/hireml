import React from "react";

import MainLayout from "../../layouts/MainLayout";
import Features from "./Features";
import Hero from "./Hero";

const Landing = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
    </MainLayout>
  );
};

export default Landing;
