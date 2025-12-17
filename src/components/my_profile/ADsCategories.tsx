import { Link } from "react-router";
import Bike from "../icons/home/Bike";
import Car from "../icons/home/Car";
import Phone from "../icons/home/Phone";

const categories = [
  { type: "cars", label: "Cars Plates", icon: <Car />, style: "bg-[#ECEDEF] text-[#192540] h-[310px]" },
  { type: "bikes", label: "Fun & Motorcycle", icon: <Bike />, style: "bg-[#FCF8ED] text-[#966A08] h-[135px]" },
  { type: "sims", label: "Phone Numbers", icon: <Phone />, style: "bg-[#F1FCEE] text-[#154D23] h-[135px]" },
];

const ADsCategories = () => {
  return (
    <div className="md:py-20">
      <h2 className="text-[#192540] text-2xl font-medium">ADs Categories</h2>

      <div className="mt-6 flex gap-6">
        <Link
          to={`/profile/allAds?types=cars`}
          className={`w-full rounded-md flex flex-col items-center justify-center gap-3 ${categories[0].style}`}
        >
          {categories[0].icon}
          <p className="md:text-2xl font-semibold">{categories[0].label}</p>
        </Link>

        <div className="flex flex-col gap-10 w-full">
          {categories.slice(1).map((cat) => (
            <Link
              key={cat.type}
              to={`/profile/allAds?types=${cat.type}`}
              className={`w-full rounded-md flex flex-col items-center justify-center gap-3 ${cat.style}`}
            >
              {cat.icon}
              <p className="md:text-2xl font-semibold">{cat.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    )
}

export default ADsCategories
