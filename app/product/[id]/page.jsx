"use client";

import ProductViewSwiper from "components/Containers/ProductViewSwiper";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function ProductViewPage({ params }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row min-h-72">
      <div className="w-full md:flex-[50%] md:max-w-[50%]">
        <ProductViewSwiper
          images={[
            "https://img.freepik.com/free-vector/hand-drawn-tuna-cartoon-illustration_23-2150659927.jpg?w=1000&t=st=1708025757~exp=1708026357~hmac=851ec05b7ba708495a083ab1c043774e3a709f18cf937b1fb5569819b1d7490c",
            "https://img.freepik.com/free-vector/organic-cactus-plant-illustration_24908-81969.jpg?w=1000&t=st=1708025760~exp=1708026360~hmac=a117590653724e9bb1992da88b4aa5fdc122646b369e90a1016b084bef6bb30a",
            "https://img.freepik.com/free-vector/school-fishes-background-with-deep-sea-flat-style_23-2147796029.jpg?w=1000&t=st=1708025762~exp=1708026362~hmac=137845561ce901c0ac766066cda6d629d91b88fc029f56401b0a4095112666cc",
            "https://img.freepik.com/free-vector/hand-drawn-clown-fish-cartoon-illustration_23-2150696050.jpg?w=1000&t=st=1708025767~exp=1708026367~hmac=710cf394c6e3080e8a207fab2ba52ad1631b0c46b35a6531ac5cc83a8e68f3ad",
          ]}
        />
      </div>
      <div className="sm:text-base flex flex-col gap-2 w-full md:flex-[50%] md:max-w-[50%]">
        <h3 className="text-xl font-bold">Super cute kitten bundle</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
          adipisci expedita, dolore debitis officia sunt quas est nihil et
          maxime excepturi id eveniet aperiam iste fuga dolor autem illo
          provident! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Nesciunt adipisci expedita, dolore debitis officia sunt quas est nihil
          et maxime excepturi id eveniet aperiam iste fuga dolor autem illo
          provident!
        </p>
        <div className="flex flex-col gap-2">
          <div className="info-holder">
            <>Бренд :</>
            <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
              MeowMeow Inc.
            </p>
          </div>
          <div className="info-holder">
            <>Ед. измерения :</>
            <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
              Килограмм.
            </p>
          </div>
          <div className="info-holder">
            <>Категория :</>
            <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
              Питомцы
            </p>
          </div>
          <div className="info-holder">
            <>Под категория :</>
            <p className="bg-haze-100 rounded-3xl flex-row-center px-4 h-8">
              Коты
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between sm:text-base mt-4">
          <div className="bg-haze-100 rounded-3xl flex-row-center justify-center gap-8 h-9 sm:h-11 w-48">
            269 ман.
          </div>
          <div className="bg-haze-100 rounded-3xl flex-row-center justify-between px-4 h-9 sm:h-11 w-48">
            <button className="center">
              <FiMinus className="icons nav-link" />
            </button>
            <p>0</p>
            <button className="center">
              <FiPlus className="icons nav-link" />
            </button>
          </div>
          <button className="button-primary justify-center px-8 w-48">
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
