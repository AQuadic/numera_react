import FilterYourPlates from "../components/home/FilterYourPlates";
import HomeCategories from "../components/home/HomeCategories";
import HomeHero from "../components/home/HomeHero";
import HomeImageSection from "../components/home/HomeImageSection";
import WhyChooseNumra from "../components/home/WhyChooseNumra";

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <HomeCategories />
      <FilterYourPlates />
      <HomeImageSection />
      <WhyChooseNumra />
    </div>
  );
};

export default HomePage;
