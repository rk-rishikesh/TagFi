import React, { useState } from 'react';

const options = ['Pets', 'Bags', 'Vehicle', 'Sports', 'Music', 'Travel'];

const InterestSelectionScreen = () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleOption = (option: string) => {
        setSelectedOptions(prevState =>
            prevState.includes(option)
                ? prevState.filter(item => item !== option)
                : [...prevState, option]
        );
    };

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
            <div className="flex flex-col items-center mb-4 mt-4 mb-8">
                <h3 className="text-xl w-full text-left p-5">Select Your Interest</h3>
                <div
                    className="flex flex-col space-y-4 px-5 w-full max-h-64 overflow-y-auto items-center"
                >
                    {options.map(option => (
                        <button
                            key={option}
                            onClick={() => toggleOption(option)}
                            className={`p-5 rounded-lg h-16 text-xl w-full lg:w-5/12 ${selectedOptions.includes(option)
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-black'
                                }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterestSelectionScreen;
