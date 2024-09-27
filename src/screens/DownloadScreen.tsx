import React from 'react';

const DownloadScreen = () => {
    return (
        <div className="flex flex-col h-screen bg-[#E0E0E2] p-4">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-[#727774] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">TagFi</h1>
                </div>
            </div>
            <div className="flex items-center justify-center mb-8 sm:mb-12">
                <button className="px-4 py-2 bg-white text-black rounded-lg w-8/12 sm:w-5/12 md:w-1/4 font-semibold text-lg sm:text-xl h-12 sm:h-14">
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadScreen;
