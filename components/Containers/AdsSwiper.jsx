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
    data: adsData,
    error,
    isLoading,
  } = useSWR(`http://localhost:5000/ads/`, fetcher);

  if (isLoading) {
    return (
      <p className="border bg-grey-100 rounded-[4px] animate-pulse center h-[180px] md:h-[220px] lg:h-[250px] max-width">
        Loading...
      </p>
    );
  }

  if (error) {
    console.error("Error fetching ads:", error);
    return (
      <p className="border border-red-500 bg-red-200 rounded-[4px] center h-[180px] md:h-[220px] lg:h-[250px] max-width">
        Error
      </p>
    );
  }

  return (
    <div className="max-width">
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
          {adsData.map((item) => {
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
