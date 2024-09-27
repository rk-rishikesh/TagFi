import React from 'react';

const LoginScreen = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen py-8 bg-[#E0E0E2] px-4 sm:px-8">
            <div className="bg-[#727774] rounded-full w-36 h-12 flex items-center justify-center p-2 sm:w-48 sm:h-14">
                <h1 className="text-xl font-bold text-white sm:text-2xl">TagFi</h1>
            </div>
            <div className="flex flex-col items-center mt-8 sm:mt-12">
                <div className="bg-gray-300 rounded-md w-56 h-32 flex items-center justify-center sm:w-64 sm:h-40">
                    <h2 className="text-lg font-bold sm:text-xl">Tag and Earn</h2>
                </div>
            </div>
            <div className="flex items-center justify-center mb-8 sm:mb-12">
                <button className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl">
                    Login
                </button>
            </div>
        </div>
    );
};

export default LoginScreen;
