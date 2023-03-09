import React from "react";
import { Navbar, Footer, Card, Carousel } from "../../components";
import { FoodList } from "../FoodList";
const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <FoodList />
      <Card />
      <Footer />
    </div>
  );
};

export default Home;
