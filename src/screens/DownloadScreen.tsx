import React from 'react';

const DownloadScreen = () => {
    return (
        <div className="flex flex-col h-screen bg-[#E0E0E2]">
            <div className="flex-grow flex flex-col items-center justify-center">
                <div className="flex items-center justify-center rounded-full bg-[#727774] w-32 h-32 md:w-40 md:h-40">
                    <h1 className="text-lg md:text-xl font-bold text-white">TagFi</h1>
                </div>
            </div>
            <div className="flex items-center justify-center mb-12">
                <button className="px-6 py-2 bg-white text-black rounded-lg w-5/12 md:w-1/4 font-semibold text-xl h-14">
                    Download
                </button>
            </div>
        </div>
    );
};

export default DownloadScreen;
