import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { CategoryState, setCategory } from '../store/stringSlice';

const options = ["Pets", "Bags", "Vehicle", "Sports", "Music", "Travel"];

const InterestSelectionScreen = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const toggleOption = (option: string) => {
    setSelectedOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };
  const handleCategorySelection = (category: string, route: string) => {
    dispatch(setCategory(category as CategoryState));
    navigate(route);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E0E0E2]">
      <div className="flex justify-center py-4">
        <div className="bg-[#727774] rounded-full w-76 h-14 md:w-76 md:h-16 flex items-center justify-center p-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">Data Market Categories</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div onClick={() => handleCategorySelection("cat", "/screen3")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/categories/cat.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Cat</p>
        </div>
        <div onClick={() => handleCategorySelection("banana", "/screen7")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/categories/banana.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Banana</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div onClick={() => handleCategorySelection("garbage", "/screen7")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/waste/waste.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Waste / Garbage</p>
        </div>
        <div onClick={() => handleCategorySelection("skin", "/screen3")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/skin-rash.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Skin Rashes</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div onClick={() => handleCategorySelection("plant", "/screen7")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/plant/plant.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Plants</p>
        </div>
        <div onClick={() => handleCategorySelection("automobile", "/screen7")} className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">
          <img src="/images/automobile/automobile.jpg" className="w-full h-[131px] rounded-lg" />
          <p className="text-white text-2xl flex justify-center items-center pt-2">Automobile</p>
        </div>
      </div>

    </div>
  );
};

export default InterestSelectionScreen;
