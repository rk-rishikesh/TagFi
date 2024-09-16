import React from 'react';

const InterestSelectionScreen = () => {
    return (
        <div className="flex flex-col h-screen bg-[#E0E0E2]">
            <div className="flex justify-center py-4">
                <div className="bg-[#727774] rounded-full w-48 h-14 flex items-center justify-center p-4">
                    <h1 className="text-2xl font-bold text-white">TagFi</h1>
                </div>
            </div>
            <div className="flex flex-grow items-start justify-start text-center p-5 mt-4">
                <div>
                    <h2 className="text-3xl w-full text-left">Hi,</h2>
                    <p className="text-3xl font-semibold w-full text-left mt-4">#00x0de000000000</p>
                </div>
            </div>
            <div className="flex flex-col items-center mb-4 space-y-4 mb-14">
                <h3 className="text-xl w-full text-left p-5">Select Your Interest</h3>
                <div className="flex flex-col space-y-4 px-5 w-full justify-center items-center">
                    <button className="px-6 py-2 bg-white text-black rounded-lg h-14 text-xl w-full lg:w-5/12">Pets</button>
                    <button className="px-6 py-2 bg-white text-black rounded-lg h-14 text-xl w-full lg:w-5/12">WildLife</button>
                    <button className="px-6 py-2 bg-white text-black rounded-lg h-14 text-xl w-full lg:w-5/12">Vehicle</button>
                </div>
            </div>
        </div>
    );
};

export default InterestSelectionScreen;
