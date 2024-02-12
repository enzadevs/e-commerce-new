"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "styles/ads_swiper.css";
import Image from "next/image";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AdsSwiper() {
  const {
    data: ads,
    error,
    isLoading,
  } = useSWR(`http://localhost:5000/ads/`, fetcher);

  if (isLoading) {
    return (
      <div className="px-3 md:px-0 max-width">
        <p className="bg-haze-200 rounded-3xl center animate-pulse h-[180px] md:h-[220px] lg:h-[250px] w-full">
          Загрузка...
        </p>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching ads:", error);
    return (
      <div className="px-3 md:px-0 max-width">
        <p className="bg-red-300 rounded-3xl center text-base font-bold text-red-700 h-[180px] md:h-[220px] lg:h-[250px] w-full">
          Упс! Вышла ошибка.
        </p>
      </div>
    );
  }

  return (
    <div className="px-3 md:px-0 max-width">
      <div className="border border-grey-100 rounded-lg text-fancy-600 h-[180px] md:h-[220px] lg:h-[250px] w-full">
        <Swiper
          navigation
          pagination={true}
          modules={[Navigation, Pagination, Autoplay]}
          className="rounded-[4px] h-full w-full"
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
                    src={`http://localhost:5000/images/${item.poster_image}`}
                    alt="image"
                    height={0}
                    width={0}
                    style={{ height: "auto", width: "100%" }}
                    className=""
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
