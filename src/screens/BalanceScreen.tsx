import React from 'react';
import Header from '../components/Header';

const BalanceScreen = () => {
    return (
        <div className="relative flex flex-col h-screen bg-[#E0E0E2] p-5 justify-center items-center">
            <div className="w-full lg:w-1/2 h-40 bg-[#727774] rounded-xl relative">
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1">
                    <img src="/images/user-profile.png" alt="User Profile" className="w-28 h-28 rounded-full border-4 border-white" />
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center justify-start mt-8">
                <p className="mt-2 text-3xl">#00x000x0x0x0x0</p>
                <div className="flex items-center mt-4">
                    <div className="w-16 h-16 flex items-center border border-2 border-gray-500 bg-[#E0E0E2] justify-center text-black rounded-full text-xl font-bold relative -mr-8">
                        $
                    </div>
                    <div className="w-36 h-14 border border-2 border-gray-500 border-l-0 rounded-full flex justify-center items-center">
                        <p className="text-xl font-bold">$1000</p>
                    </div>
                </div>
            </div>
            <Header onOptionChange={() => { }} />
        </div>
    );
};

export default BalanceScreen;
