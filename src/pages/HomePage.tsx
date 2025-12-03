import FilterYourPlates from "../components/home/FilterYourPlates"
import HomeCategories from "../components/home/HomeCategories"
import HomeHero from "../components/home/HomeHero"

const HomePage = () => {
    return (
        <div>
            <HomeHero />
            <HomeCategories />
            <FilterYourPlates />
        </div>
    )
}

export default HomePage
