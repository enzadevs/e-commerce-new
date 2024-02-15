"use client";

import ProductViewSwiper from "components/Containers/ProductViewSwiper";

export default function ProductViewPage({ params }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row min-h-72">
      <div className="w-full md:flex-[50%] md:max-w-[50%]">
        <div className="flex-row-center md:hidden mb-2 h-6">
          <h3 className="text-base font-semibold line-clamp-1">
            Super cute kitten bundle
          </h3>
        </div>
        <ProductViewSwiper
          images={[
            "https://img.freepik.com/free-photo/little-grey-kitten-with-blue-eyes-lies-grey-couch_8353-7261.jpg?w=1380&t=st=1707917107~exp=1707917707~hmac=774d7237c3c2a592e3c6f821844148706f22c51927b6bd3fbf764f71824df5e6",
            "https://img.freepik.com/free-photo/cute-soft-kittens-with-bright-eyes-lined-up-eager-fun_157027-4369.jpg?w=1380&t=st=1707917124~exp=1707917724~hmac=c5d5b9ed95164177f75fd122b832bdeaada0fb6ce761484a9d03810a8d8bbe08",
            "https://img.freepik.com/free-photo/beautiful-shot-white-british-shorthair-kitten_181624-57681.jpg?w=1380&t=st=1707917107~exp=1707917707~hmac=7d6d1652d9f7fca21ec2c5cf020bee741588fe3d015ba54c71f68f9f26516274",
            "https://img.freepik.com/free-photo/cute-soft-kittens-with-bright-eyes-lined-up-eager-fun_157027-4369.jpg?w=1380&t=st=1707917124~exp=1707917724~hmac=c5d5b9ed95164177f75fd122b832bdeaada0fb6ce761484a9d03810a8d8bbe08",
          ]}
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:flex-[50%] md:max-w-[50%]">
        <h3 className="text-xl font-bold">Super cute kitten bundle</h3>
        <div className="text-base">
          <p className="font-semibold">О товаре:</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            adipisci expedita, dolore debitis officia sunt quas est nihil et
            maxime excepturi id eveniet aperiam iste fuga dolor autem illo
            provident! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Nesciunt adipisci expedita, dolore debitis officia sunt quas est
            nihil et maxime excepturi id eveniet aperiam iste fuga dolor autem
            illo provident!
          </p>
        </div>
        <div className="flex flex-col gap-2 text-base">
          <div className="bg-haze-100 rounded-3xl flex-row-center justify-center gap-8 h-11 w-48">
            <p className="font-semibold">269 ман.</p>
          </div>
          <button className="button-primary justify-center px-8 w-48">
            Купить
          </button>
        </div>
      </div>
    </div>
  );
}
