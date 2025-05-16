import React from "react";

//components
import Hero from "../components/home/Hero";
import CategorySectoin from "../components/home/CategorySectoin";
import TopRated from "../components/home/TopRated";
import FeaturedSection from "../components/home/FeaturedSection";
import ReviewSection from "../components/home/ReviewSection";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategorySectoin />
      <TopRated />
      <FeaturedSection />
      <ReviewSection />
    </div>
  );
};

export default Home;
