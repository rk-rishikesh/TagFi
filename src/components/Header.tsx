import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onOptionChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOptionChange }) => {
  const navigate = useNavigate();

  const handleCameraClick = () => {
    onOptionChange();
    navigate("/screen4");
  };

  const handleCategoryClick = () => {
    onOptionChange();
    navigate("/screen6");
  };

  const handleUserProfileClick = () => {
    onOptionChange();
    navigate("/screen5");
  };

  return (
    <div className="w-full flex justify-center items-center mb-4">
      <div className="flex justify-around py-4 bg-[#727774] rounded-full mt-6 w-[80%] lg:w-[30%]">
        <div
          className="bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center"
          onClick={handleCategoryClick}
        >
          <img
            src="/images/category.jpg"
            alt="Category"
            className="w-8 h-8 rounded-full"
          />
        </div>
        <div
          className="bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center"
          onClick={handleCameraClick}
        >
          <img
            src="/images/camera.png"
            alt="Camera"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div
          className="bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center relative"
          onClick={handleUserProfileClick}
        >
          <img
            src="/images/user-profile.jpg"
            alt="User Profile"
            className="w-10 h-10 rounded-full"
          />
          <img
            src="/images/verified.png"
            alt="Verified"
            className="w-6 h-6 absolute top-0 right-0 transform translate-x-2 -translate-y-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
