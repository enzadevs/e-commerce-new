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
    <>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[228px] md:h-[400px]"
      >
        {images.map((item) => (
          <SwiperSlide key={undefined}>
            <div className="relative h-full w-full">
              <Image
                // src={"http://localhost:5000/images/" + item}
                src={item}
                alt="image of product"
                className="object-contain"
                sizes="(max-width: 768px) 100vw,50vw"
                fill
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs mt-2 h-20 sm:h-28"
      >
        {images.map((item) => (
          <SwiperSlide className="" key={undefined}>
            <button className="relative h-full w-full">
              <Image
                // src={"http://localhost:5000/images/" + item}
                src={item}
                alt="thumbnail of currently selected image"
                className="object-cover"
                sizes="(max-width: 768px) 100vw,50vw"
                fill
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
