import React from 'react';

const LoginScreen = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen py-8 bg-[#E0E0E2]">
            <div className="bg-[#727774] rounded-full w-48 h-14 flex items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-white">TagFi</h1>
            </div>
            <div className="flex flex-col items-center">
                <div className="bg-gray-300 rounded-md w-64 h-40 flex items-center justify-center">
                    <h2 className="text-xl font-bold">Tag and Earn</h2>
                </div>
            </div>
            <div className="flex items-center justify-center mb-12">
                <button className="px-6 py-2 bg-white text-black rounded w-48 p-4 font-semibold h-14 text-xl">Login</button>
            </div>
        </div>
    );
};

export default LoginScreen;
