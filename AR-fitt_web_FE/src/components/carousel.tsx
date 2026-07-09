import { Navigation, EffectCoverflow } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Grid, useMediaQuery } from "@mui/material";
import { useState } from "react";
import CONSTANTS from "../utils/constants/CONSTANTS";

const Carousel = () => {
  const numberOfSlides = Array.from({ length: 4 });
  const slideContent = [
    "Step 1: Begin your style journey by signing up for AR-Fitt. Provide basic information and complete payment to unlock personalized features. Dive into a world of fashion tailored just for you.",
    "Step 2: Experience custom fashion with a body scan via your device's camera. Our AI analyzes your measurements and skin profile to curate an inventory perfectly suited to you. Say goodbye to ill-fitting clothes.",
    "Step 3: Step into your personalized homepage and explore a carefully curated selection of clothing articles. Each item is handpicked by our AI model, reflecting your unique style and body shape. Find your perfect look effortlessly.",
    'Step 4: Try before you buy with our virtual try-on feature. Select an item from your recommended inventory and click " Try On". Use your device\'s camera to see how it fits before making a purchase. Shopping has never been easier.',
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const handleNext = () => {
    setActiveIndex(activeIndex + 1);
  };
  const handlePrev = () => {
    setActiveIndex(activeIndex - 1);
  };
  const isMobileView = useMediaQuery(CONSTANTS.MOBILE_VIEW_MAX_WIDTH);
  return (
    <Swiper
      effect={"coverflow"}
      allowTouchMove={false}
      centeredSlides={true}
      loop={true}
      slidesPerView={isMobileView ? 1 : 2}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 400,
        modifier: -1,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      modules={[EffectCoverflow, Navigation]}
      className="swiper_container"
      onSlideNextTransitionEnd={() => handleNext()}
      onSlidePrevTransitionEnd={() => handlePrev()}
    >
      {numberOfSlides.map((_, index) => (
        <SwiperSlide className="">
          <Grid
            direction="column"
            className=" flex justify-center items-center"
          >
            <img
              src={`/assets/images/howItWorks/img_step${index + 1}.png`}
              alt="slide_image"
              className="xs:w-[250px] xs:h-[250px] sm:w-[300px] sm:h-[300px]"
            />
            {activeIndex === index ? (
              <div className="font-Dhurjati font-normal text-center text-sm lg:text-sm xl:text-base leading-[1.5] mt-6 xs:hidden md:flex">
                {slideContent[index]}
              </div>
            ) : (
              ""
            )}
          </Grid>
        </SwiperSlide>
      ))}

      <div className="slider-controler">
        <div
          className="swiper-button-prev slider-arrow"
          style={{ display: `${activeIndex === 0 ? "none" : "block"}` }}
        ></div>

        <div
          className="swiper-button-next slider-arrow"
          style={{
            display: `${
              activeIndex === numberOfSlides.length - 1 ? "none" : "block"
            }`,
          }}
        ></div>
      </div>
    </Swiper>
  );
};
export default Carousel;
