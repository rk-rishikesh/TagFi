import { FaCopy } from "react-icons/fa";
import Header from '../components/Header';
import { useState } from "react";

const BalanceScreen = () => {
    const [isCopied, setIsCopied] = useState(false);
    const textToCopy = "#00x000x0x0x0x0";
    const displayText = `${textToCopy.slice(0, 6)}...${textToCopy.slice(-6)}`;
    const postImages = [
        "/images/user-posts/cat1.jpg",
        "/images/user-posts/cat2.jpg",
        "/images/user-posts/cat3.jpg",
        "/images/user-posts/cat4.jpg",
        "/images/user-posts/cat5.jpg",
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        });
    };

    return (
        <div className="relative flex flex-col h-screen bg-[#E0E0E2] p-4 lg:p-5 justify-center items-center overflow-y-scroll">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-36 sm:h-40 bg-[#727774] rounded-xl relative">
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1">
                    <img
                        src="/images/user-profile.png"
                        alt="User Profile"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="w-full flex-grow flex flex-col items-center justify-start mt-4 sm:mt-16">
                <div className="mt-2 text-2xl sm:text-3xl text-center flex justify-center items-center space-x-2">
                    <span className="truncate max-w-xs">{displayText}</span>
                    <FaCopy
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={handleCopy}
                    />
                    {isCopied && <span className="text-sm text-green-500">Copied!</span>}
                </div>
                <div className='w-full flex gap-8 mt-4'>
                    <div className='w-1/2 flex flex-col p-4 justify-center items-center bg-gray-300 rounded-lg'>
                        <span className='text-[#727774] font-semibold text-lg'>Balance</span>
                        <span className='text-gray-800 text-2xl'><b>0.25 ETH</b></span>
                    </div>
                    <div className='w-1/2 flex flex-col p-4 justify-center items-center bg-gray-300 rounded-lg'>
                        <span className='text-[#727774] font-semibold text-lg'>Rewards</span>
                        <span className='text-gray-800 text-2xl'><b>0.15 ETH</b></span>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-4">
                    <img
                        src="/images/watch.png"
                        alt="/images/watch.png"
                        className="w-8 h-8 object-cover"
                    />
                    <hr className="w-1/3 h-px my-4 bg-gray-500 border-0" />
                    <div className="grid grid-cols-2 gap-4 w-full p-4 overflow-y-scroll max-h-[150px]">
                        {postImages.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`post-${index}`}
                                className="w-full h-44 rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 w-full">
                <Header onOptionChange={() => { }} />
            </div>
        </div>
    );
};

export default BalanceScreen;
