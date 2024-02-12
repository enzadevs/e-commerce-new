// import AdsSwiper from "components/Containers/AdsSwiper";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* <AdsSwiper /> */}
      <Image
        // src={undefined}
        alt="image"
        height={0}
        width={0}
        style={{ height: "auto", width: "100%" }}
        className=""
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      ></Image>
    </div>
  );
}
