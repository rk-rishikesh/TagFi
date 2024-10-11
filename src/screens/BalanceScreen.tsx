import { FaCopy } from "react-icons/fa";
import Header from '../components/Header';
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useBalance } from "wagmi";

const BalanceScreen = () => {

    // Privy hooks
    const { ready, authenticated, login, logout } = usePrivy();

    // WAGMI hooks
    const { address, isConnected } = useAccount();

    const { data: addressData, isError, isLoading } = useBalance({ address });

    const [isCopied, setIsCopied] = useState(false);
    const textToCopy = address;
    const displayText = `${textToCopy?.slice(0, 6)}...${textToCopy?.slice(-6)}`;
    const postImages = [
        "/images/user-posts/cat1.jpg",
        "/images/user-posts/cat2.jpg",
        "/images/user-posts/cat3.jpg",
        "/images/user-posts/cat4.jpg",
        "/images/user-posts/cat5.jpg",
    ];

    const handleCopy = () => {
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            });
        }
    };

    if (!ready) {
        return null;
      }
      
    return (
        <div className="flex flex-col min-h-screen bg-[#E0E0E2]">
            <div className="flex-grow overflow-y-auto p-2">
                <div className="w-full sm:w-3/4 md:w-2/3 lg:w-full h-36 sm:h-40 bg-[#727774] rounded-xl mt-4 relative p-12">
                    <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-white rounded-full">
                        <button onClick={logout}>
                            <img

                                src="/images/user-profile.jpg"
                                alt="User Profile"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white"
                            />
                        </button>

                    </div>
                </div>
                {ready && authenticated ?
                    <div className="flex-grow flex flex-col items-center justify-start p-4 mt-6">
                        <div className="mt-2 text-2xl sm:text-3xl text-center flex justify-center items-center space-x-2">
                            <span className="truncate max-w-xs">{displayText}</span>
                            <FaCopy
                                className="cursor-pointer text-gray-500 hover:text-gray-700"
                                onClick={handleCopy}
                            />
                            {isCopied && <span className="text-sm text-green-500">Copied!</span>}
                        </div>
                        <div className='w-full flex gap-8 mt-4'>
                            <div className='w-full flex flex-col p-4 justify-center items-center bg-gray-300 rounded-lg'>
                                <span className='text-[#727774] font-semibold text-lg'>Balance</span>
                                <span className='text-gray-800 text-2xl'><b>{`${addressData?.formatted.slice(0, 10)} ${addressData?.symbol}`}</b></span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center mt-4">
                            <img
                                src="/images/watch.png"
                                alt="/images/watch.png"
                                className="w-8 h-8 object-cover"
                            />
                            <hr className="w-1/3 h-px my-4 bg-gray-500 border-0" />
                            <div className="grid grid-cols-2 gap-4 w-full p-4">
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
                    :
                    <div className='w-full flex gap-8 mt-16'>
                        <div className='w-full flex flex-col p-4 justify-center items-center bg-gray-300 rounded-lg'>
                            <button
                                className="px-4 py-2 text-black rounded w-full max-w-xs h-64 sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
                                onClick={login}
                                type="button"
                            >
                                Login
                            </button>
                        </div>
                    </div>}


            </div>
            <div className="sticky bottom-0 w-full">
                <Header onOptionChange={() => { }} />
            </div>
        </div>
    );
};

export default BalanceScreen;
