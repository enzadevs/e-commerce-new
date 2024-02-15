"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "styles/product_swiper.css";

export default function ProductViewSwiper({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="container">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-96 w-full"
      >
        {images.map((item) => (
          <SwiperSlide key={undefined}>
            <div className="flex h-full w-full items-center justify-center">
              <Image
                // src={"http://localhost:5000/images/" + item}
                src={item}
                alt="image of product"
                className="block h-full w-full object-contain "
                sizes="(max-width: 768px) 100vw,50vw"
                width={500}
                height={500}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs mt-2 h-24 lg:h-32 w-full"
      >
        {images.map((item) => (
          <SwiperSlide style={{ marginRight: "0px" }} key={undefined}>
            <button className="flex h-full w-full items-center justify-center">
              <Image
                // src={"http://localhost:5000/images/" + item}
                src={item}
                alt="thumbnail of currently selected image"
                className="block h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw,50vw"
                width={100}
                height={500}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
