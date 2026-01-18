import { Link } from "react-router";
import Bike from "../icons/home/Bike";
import Car from "../icons/home/Car";
import Phone from "../icons/home/Phone";
import { useTranslation } from "react-i18next";

const categories = [
  { type: "cars", labelKey: "cat_cars_plates", icon: <Car />, style: "bg-[#ECEDEF] text-[#192540] h-[310px]" },
  { type: "bikes", labelKey: "cat_fun_motorcycle", icon: <Bike />, style: "bg-[#FCF8ED] text-[#966A08] h-[135px]" },
  { type: "sims", labelKey: "cat_phone_numbers", icon: <Phone />, style: "bg-[#F1FCEE] text-[#154D23] h-[135px]" },
];

const ADsCategories = () => {
  const { t } = useTranslation("profile");
  return (
    <div className="md:py-20">
      <h2 className="text-[#192540] text-2xl font-medium">{t("ads_categories_title")}</h2>

      <div className="mt-6 flex gap-6">
        <Link
          to={`/profile/allAds?types[]=cars&vehicle_types[]=classic`}
          className={`w-full rounded-md flex flex-col items-center justify-center gap-3 ${categories[0].style}`}
        >
          {categories[0].icon}
          <p className="md:text-2xl font-semibold">{t(categories[0].labelKey)}</p>
        </Link>

        <div className="flex flex-col gap-10 w-full">
          {categories.slice(1).map((cat) => (
            <Link
              key={cat.type}
              to={`/profile/allAds?types=${cat.type}`}
              className={`w-full rounded-md flex flex-col items-center justify-center gap-3 ${cat.style}`}
            >
              {cat.icon}
              <p className="md:text-2xl font-semibold">{t(cat.labelKey)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
    )
}

export default ADsCategories
