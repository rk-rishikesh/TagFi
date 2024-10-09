import Header from '../components/Header';

const BalanceScreen = () => {
    return (
        <div className="relative flex flex-col h-screen bg-[#E0E0E2] p-4 lg:p-5 justify-center items-center">
            <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-36 sm:h-40 bg-[#727774] rounded-xl relative">
                <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 bg-white rounded-full p-1">
                    <img
                        src="/images/user-profile.png"
                        alt="User Profile"
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center justify-start mt-12 sm:mt-16">
                <p className="mt-2 text-2xl sm:text-3xl text-center">#00x000x0x0x0x0</p>
                <div className="flex items-center mt-6 sm:mt-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center border border-2 border-gray-500 bg-[#E0E0E2] justify-center text-black rounded-full text-lg sm:text-xl font-bold relative -mr-6 sm:-mr-8">
                        $
                    </div>
                    <div className="w-32 h-12 sm:w-36 sm:h-14 border border-2 border-gray-500 border-l-0 rounded-full flex justify-center items-center">
                        <p className="text-lg sm:text-xl font-bold">$1000</p>
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
