import { useQuery } from "@tanstack/react-query";
import { getWhyChooseNumra, type ChooseNumraItem } from "../../lib/api/whyChooseNumra";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "react-i18next";

const WhyChooseNumra = () => {
  const { t, i18n } = useTranslation("home");
  const { data, isLoading } = useQuery({
    queryKey: ["whyChooseNumra"],
    queryFn: getWhyChooseNumra,
  });

    return (
        <section className="container md:py-[58px] py-10">
          {isLoading ? (
            <Skeleton className="h-8 w-[260px] rounded-md" />
          ) : (
            <h2 className="text-[#192540] md:text-[32px] text-2xl font-medium">
              {t('why_choose')} <span className="text-[#B48110]">{t('numra')}</span>
            </h2>
          )}

            <div className="md:mt-20 mt-5 flex flex-wrap items-center justify-between gap-8">
              {isLoading
                ? [...Array(3)].map((_, index) => (
                    <div key={index} className="relative md:w-[385px] w-full">
                      <Skeleton className="absolute md:-left-16 -left-4 top-0 h-[200px] w-[120px] -z-10" />
                      <Skeleton className="rounded-full w-[86px] h-[86px]" />
                      <Skeleton className="h-2xl w-[315px] mt-4" />

                      <Skeleton className="h-sm w-[315px] mt-2" />
                      <Skeleton className="h-sm w-[260px] mt-1" />
                    </div>
                  ))
                : data?.choose_numera.map((item: ChooseNumraItem, index: number) => (
                <div key={index} className="relative md:w-[385px] w-full">
                    <img src={`/images/home/${index + 1}.png`} className="absolute ltr:md:-left-16 rtl:md:-right-4 ltr:-left-4 rtl:right-0 top-0 text-[240px] font-bold text-[#F0F0F0] select-none -z-10"/>
                    <div className="bg-[#FDFAF3] rounded-full w-[86px] h-[86px] flex items-center justify-center">
                        <img src={item.icon} alt="icon" className="relative z-10 w-[50px] h-[50px] " />
                    </div>
                    <h2 className="text-[#192540] md:text-2xl text-xl font-semibold mt-3 md:w-[315px]">
                      {i18n.language === "ar" ? item.Question.ar : item.Question.en}
                    </h2>
                    <p className="w-[315px] text-[#717171] text-sm font-medium mt-2">
                      {i18n.language === "ar" ? item.Answer.ar : item.Answer.en}
                    </p>
                </div>
            ))}
            </div>
        </section>
    )
}

export default WhyChooseNumra
