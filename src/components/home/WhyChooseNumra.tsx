import { useQuery } from "@tanstack/react-query";
import { getWhyChooseNumra, type ChooseNumraItem } from "../../lib/api/whyChooseNumra";
import Spinner from "../icons/general/Spinner";

const WhyChooseNumra = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["whyChooseNumra"],
    queryFn: getWhyChooseNumra,
  });

  if (isLoading) return <div className="flex items-center justify-center py-10">
    <Spinner />
  </div>

    return (
        <section className="container md:py-[58px] py-10">
            <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">Why Choose <span className="text-[#B48110]">Numra</span></h2>

            <div className="md:mt-20 mt-5 flex flex-wrap items-center justify-between gap-8">
                {data?.choose_numera.map((item: ChooseNumraItem, index: number) => (
                <div key={index} className="relative">
                    <img src={`/images/home/${index + 1}.png`} className="md:block hidden absolute -left-16 top-0 text-[240px] font-bold text-[#F0F0F0] select-none -z-10"/>
                    <div className="bg-[#FDFAF3] rounded-full w-[86px] h-[86px] flex items-center justify-center">
                        <img src={item.icon} alt="icon" className="relative z-10 w-[50px] h-[50px] " />
                    </div>
                    <h2 className="text-[#192540] md:text-2xl text-xl font-semibold mt-5">{item.Question.en}</h2>
                    <p className="w-[315px] text-[#717171] text-sm font-medium mt-3">{item.Answer.en}</p>
                </div>
            ))}
            </div>
        </section>
    )
}

export default WhyChooseNumra
