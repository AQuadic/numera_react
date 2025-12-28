import { Link } from "react-router";
import Bike from "../icons/home/Bike";
import Car from "../icons/home/Car";
import Phone from "../icons/home/Phone";
import { useTranslation } from "react-i18next";

const HomeCategories = () => {
  const { t } = useTranslation("home");
  const categories = [
    {
      title: t('car_plates'),
      bg: "#ECEDEF",
      textColor: "#192540",
      icon: <Car />,
      link: "/plates_filter?vehicle_types[]=cars&vehicle_types[]=classic",
    },
    {
      title: t('fun'),
      bg: "#FCF8ED",
      textColor: "#966A08",
      icon: <Bike />,
      link: "/plates_filter?vehicle_types[]=fun&vehicle_types[]=bikes",
    },
    {
      title: t('mobile_numbers'),
      bg: "#F1FCEE",
      textColor: "#154D23",
      icon: <Phone />,
      link: "/sims",
    },
  ];

  return (
    <section className="container md:py-[58px] py-5">
      <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
        {t('categories')}
      </h2>

      <div className="mt-8 flex flex-wrap gap-6">
        {categories.map((item) => (
          <Link
            to={item.link}
            key={item.title}
            className="md:w-[384px] w-full h-[134px] rounded-md flex flex-col items-center justify-center gap-3 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: item.bg }}
          >
            {item.icon}
            <p
              className="md:text-2xl text-xl font-semibold"
              style={{ color: item.textColor }}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
