import React from "react";
import Navbar from "../Modules/Navbar";
import Part from '../Modules/Part'
import Feature from '../Modules/Feature'
import Review from '../Modules/Review'
import Last from '../Modules/Last'

const Home = () => {
  return (
    <div className="max-w-screen">
      <Navbar />
      <Part/>
      <Feature />
      <Review/>
      <Last/>
    </div>
  );
};

export default Home;
