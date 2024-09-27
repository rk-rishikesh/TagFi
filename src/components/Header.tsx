import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onOptionChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOptionChange }) => {
    const navigate = useNavigate();

    const handleCameraClick = () => {
        onOptionChange();
        navigate('/screen4');
    };

    const handleCatClick = () => {
        onOptionChange();
        navigate('/screen3');
    };

    const handleUserProfileClick = () => {
        onOptionChange();
        navigate('/screen5');
    };

    return (
        <div className='w-full flex justify-center items-center mb-4'>
            <div className="flex justify-around py-4 bg-[#727774] rounded-full mt-6 w-[80%] lg:w-[30%]">
                <div
                    className='bg-white rounded-full w-14 h-14 cursor-pointer'
                    onClick={handleCameraClick}
                >
                    <img src='/images/camera.png' alt='Camera' className='w-full h-full' />
                </div>

                <div
                    className='bg-white rounded-full w-14 h-14 cursor-pointer flex justify-center items-center'
                    onClick={handleCatClick}
                >
                    Cat
                </div>

                <div
                    className='bg-white rounded-full w-14 h-14 cursor-pointer'
                    onClick={handleUserProfileClick}
                >
                    <img src='/images/user-profile.png' alt='User Profile' className='w-full h-full' />
                </div>
            </div>
        </div>
    );
};

export default Header;
