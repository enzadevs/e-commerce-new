"use client";

import Image from "next/image";
import { useState } from "react";
import { baseUrlApi } from "@/utils/Utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "@/styles/product_swiper.css";

export default function ProductSwiper({ image }) {
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
        className="h-72 md:h-96 w-full"
      >
        {image.map((item) => (
          <SwiperSlide key={undefined}>
            <div className="border border-gallery-200 rounded-md center h-full w-full">
              <Image
                src={`${baseUrlApi}/${item}`}
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
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="thumbs mt-2 h-20 lg:h-24 w-full"
      >
        {image.map((item) => (
          <SwiperSlide style={{ marginRight: "0px" }} key={undefined}>
            <div className="center h-full w-full">
              <Image
                src={`${baseUrlApi}/${item}`}
                alt="thumbnail of currently selected image"
                className="block border border-gallery-200 rounded-md object-contain h-full w-full"
                sizes="(max-width: 768px) 100vw,50vw"
                width={100}
                height={100}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
