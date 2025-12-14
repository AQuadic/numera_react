import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getSlider, type SliderItem } from "../../lib/api/slider/getSlider";
import { Skeleton } from "../ui/skeleton";

export default function SimpleSlider() {
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
            const imageUrl = item.ar_image?.url || item.en_image?.url || "";

            return (
            <div key={i}>
              <a href={item.url} rel="noopener noreferrer">
                <img
                src={imageUrl}
                alt={item.name}
                className="rounded-[50px] w-full md:h-[597px] cursor-pointer"
                />
              </a>
            </div>
            );
        })}
        </Slider>
    );
}