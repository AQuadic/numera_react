import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { getSlider, type SliderItem } from "../../lib/api/slider/getSlider";
import Spinner from "../icons/general/Spinner";

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

  if (isLoading) return <div className="flex items-center justify-center">
    <Spinner />
  </div>

    return (
        <Slider {...settings}>
        {sliderItems?.map((item: SliderItem, i: number) => {
            const imageUrl = item.ar_image?.url || item.en_image?.url || "";

            return (
            <div key={i}>
                <img
                src={imageUrl}
                alt={item.name}
                className="rounded-[50px] w-full md:h-[597px]"
                />
            </div>
            );
        })}
        </Slider>
    );
}