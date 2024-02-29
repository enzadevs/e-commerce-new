"use client";

import Image from "next/image";
import { UseFetcher } from "components/Functions/UseFetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import LoadingBlock from "components/Functions/LoadingBlock";
import ErrorBlock from "components/Functions/ErrorBlock";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "styles/ads_swiper.css";

export default function AdsSwiper() {
  const {
    data: ads,
    error,
    isLoading,
  } = UseFetcher(`http://localhost:5000/ads/all`);

  if (isLoading)
    return (
      <div className="center w-full">
        <LoadingBlock height={"h-20 lg:h-[280px]"} width="w-full max-w-7xl" />
      </div>
    );
  if (error)
    return (
      <div className="center w-full">
        <ErrorBlock height={"h-20 lg:h-[280px]"} width="w-full max-w-7xl" />
      </div>
    );

  return (
    <div className="px-3 md:px-0 max-width">
      <div className="rounded-3xl text-fancy-600 center min-h-[10vh] sm:min-h-[20vh] w-full">
        <Swiper
          navigation
          pagination={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-3xl h-full w-full"
          loop="true"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {ads?.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <span className="center h-full w-full">
                  <Image
                    className="rounded-3xl"
                    src={`http://localhost:5000/images/${item.posterImage}`}
                    alt="image"
                    height={0}
                    width={0}
                    style={{ height: "auto", width: "100%" }}
                    quality={100}
                    sizes="100v"
                  ></Image>
                </span>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
