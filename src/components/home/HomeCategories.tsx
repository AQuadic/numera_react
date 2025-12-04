import Bike from "../icons/home/Bike";
import Car from "../icons/home/Car";
import Phone from "../icons/home/Phone";

const HomeCategories = () => {
    const categories = [
    { title: "Cars Plates", bg: "#ECEDEF", textColor: "#192540", icon: <Car /> },
    { title: "Boats Plates", bg: "#FCF8ED", textColor: "#966A08", icon: <Bike /> },
    { title: "Mobile Numbers", bg: "#F1FCEE", textColor: "#154D23", icon: <Phone /> },
    ];

    return (
        <section className="container md:py-[58px] py-5">
        <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">Categories</h2>

        <div className="mt-8 flex flex-wrap gap-6">
            {categories.map((item, i) => (
            <div
                key={i}
                className="md:w-[384px] w-full h-[134px] rounded-md flex flex-col items-center justify-center gap-3"
                style={{ backgroundColor: item.bg }}
            >
                {item.icon}
                <p
                    className="md:text-2xl text-xl font-semibold"
                    style={{ color: item.textColor }}
                    >
                    {item.title}
                </p>
            </div>
            ))}
        </div>
        </section>
    );
};

export default HomeCategories;
