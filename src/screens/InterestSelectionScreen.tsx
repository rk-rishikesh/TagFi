import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = ["Pets", "Bags", "Vehicle", "Sports", "Music", "Travel"];

const InterestSelectionScreen = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const toggleOption = (option: string) => {
    setSelectedOptions((prevState) =>
      prevState.includes(option)
        ? prevState.filter((item) => item !== option)
        : [...prevState, option]
    );
  };
  const back = () => {
    navigate("/screen3");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E0E0E2]">
      <div className="flex justify-center py-4">
        <div className="bg-[#727774] rounded-full w-40 h-14 md:w-48 md:h-16 flex items-center justify-center p-4" onClick={back}>
          <h1 className="text-xl md:text-2xl font-bold text-white">TagFi</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/cat.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Cat</p>
        </div>
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/dog.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Dog</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/horse.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Horse</p>
        </div>
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/bike.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Bike</p>
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-4 px-4 py-2">
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/apple.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Apple</p>
        </div>
        <div className="group rounded-lg bg-[#818181] p-5 transition relative duration-300 cursor-pointer hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#383838]">      
          <img src="/images/categories/banana.jpg" className="w-full h-[131px] rounded-lg"/>
          <p className="text-white text-2xl flex justify-center items-center pt-2">Banana</p>
        </div>
      </div>
      
    </div>
  );
};

export default InterestSelectionScreen;
