"use client";

import Image from "next/image";
import LoadingBlock from "@/components/Functions/LoadingBlock";
import ErrorBlock from "@/components/Functions/ErrorBlock";
import { baseUrlApi } from "@/utils/Utils";
import { UseFetcher } from "@/components/Functions/UseFetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/ads_swiper.css";

export default function AdsSwiper() {
  const {
    data: response = [],
    error,
    isLoading,
  } = UseFetcher(`${baseUrlApi}/shop/ads/active`);

  if (isLoading)
    return (
      <div className="px-2 md:px-0 max-width">
        <LoadingBlock
          height={"h-20 sm:h-32 lg:h-[265px]"}
          width="w-full max-w-7xl"
        />
      </div>
    );
  if (error)
    return (
      <div className="px-2 md:px-0 max-width">
        <ErrorBlock
          height={"h-20 sm:h-32 lg:h-[265px]"}
          width="w-full max-w-7xl"
        />
      </div>
    );

  return (
    <div className="px-2 md:px-0 max-width">
      <Swiper
        className="rounded-md"
        navigation
        pagination={true}
        modules={[Navigation, Pagination, Autoplay]}
        loop="true"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {response?.ads?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Image
                className="rounded-md"
                src={`${baseUrlApi}/${item.posterImage}`}
                alt="image of current ad"
                height={0}
                width={0}
                priority="true"
                style={{ height: "auto", width: "100%" }}
                quality={100}
                sizes="100v"
              ></Image>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
