import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    return (
        <Slider {...settings}>
            <div>
                <img 
                    src="/images/hero/heroImg.png"
                    alt="hero image"
                    className="rounded-[50px]"
                />
            </div>

            <div>
                <img 
                    src="/images/hero/heroImg.png"
                    alt="hero image"
                    className="rounded-[50px]"
                />
            </div>

            <div>
                <img 
                    src="/images/hero/heroImg.png"
                    alt="hero image"
                    className="rounded-[50px]"
                />
            </div>

            <div>
                <img 
                    src="/images/hero/heroImg.png"
                    alt="hero image"
                    className="rounded-[50px]"
                />
            </div>
        </Slider>
    );
}