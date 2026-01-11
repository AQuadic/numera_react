import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getSlider, type SliderItem } from "../../lib/api/slider/getSlider";
import { Skeleton } from "../ui/skeleton";
import { getImgProps } from "../../lib/utils/imageUtils";
import { useTranslation } from "react-i18next";

export default function SimpleSlider() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { data: sliderItems, isLoading } = useQuery({
    queryKey: ["slider"],
    queryFn: getSlider,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    rtl: isRtl,
  };

  if (isLoading)
    return (
      <Slider {...settings}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="px-4">
            <Skeleton className="rounded-[50px] w-full md:h-[597px]" />
          </div>
        ))}
      </Slider>
    );

  return (
    <Slider {...settings}>
      {sliderItems?.map((item: SliderItem, i: number) => {
        const imageObj = item.ar_image || item.en_image;
        const imgProps = getImgProps(imageObj, item.name, "large");

        return (
          <div key={i}>
            <a href={item.url} rel="noopener noreferrer">
              <img
                {...imgProps}
                className="rounded-[50px] w-full md:h-[597px] cursor-pointer"
              />
            </a>
          </div>
        );
      })}
    </Slider>
  );
}
