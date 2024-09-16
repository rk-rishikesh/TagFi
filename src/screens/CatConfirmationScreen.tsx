import React, { useState } from 'react';
import Header from '../components/Header';

const catData = [
    { img: '/images/cat1.jpg', question: 'Is this a cat?' },
    { img: '/images/cat2.jpg', question: 'Is this a different cat?' },
    { img: '/images/cat3.jpg', question: 'Does this look like a cat?' },
    { img: '/images/cat4.jpg', question: 'How about this cat?' },
    { img: '/images/cat5.jpg', question: 'Can you confirm this cat?' }
];

const CatConfirmationScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');

    const handleButtonClick = (title: string) => {
        setPopupTitle(title);
        setIsPopupVisible(true);
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
        setPopupTitle('');
    };

    const handleKeepTagging = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % catData.length);
        handleClosePopup();
    };

    return (
        <div className="flex flex-col justify-between h-screen py-5 bg-[#E0E0E2] px-5">
            <div
                id='cat-details'
                className='bg-cover bg-center bg-no-repeat flex flex-col rounded-3xl flex-grow'
                style={{ backgroundImage: `url(${catData[currentIndex].img})` }}
            >
                <div className="flex justify-start py-5">
                    <img src="/images/user-profile.png" alt="User Profile" className="w-20 h-20 rounded-full" />
                </div>
                <div className="flex flex-col items-center flex-grow p-5 rounded-lg">
                    <div className="relative w-full flex-grow flex items-center justify-center">
                    </div>
                    <span className="text-xl mt-4 bg-white p-4 rounded-md shadow-[10px_10px_#727774]">{catData[currentIndex].question}</span>
                    <div className="flex space-x-4 mt-4 w-9/12 justify-between">
                        <button
                            onClick={() => handleButtonClick('Awesome, you completed 25 Tags today, reward on the way ! ')}
                            className="bg-red-500 text-white px-4 py-2 rounded-full"
                        >
                            ✖
                        </button>
                        <button
                            onClick={() => handleButtonClick('Awesome, you completed 25 Tags today, reward on the way ! ')}
                            className="bg-green-500 text-white px-4 py-2 rounded-full"
                        >
                            ✔
                        </button>
                    </div>
                </div>
            </div>

            <Header onOptionChange={() => { }} />

            {isPopupVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-1/3 text-center">
                        <h3 className="text-lg font-semibold mb-4">{popupTitle}</h3>
                        <button
                            onClick={handleKeepTagging}
                            className="bg-gray-500 text-white px-4 py-2 rounded-full"
                        >
                            Keep tagging
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CatConfirmationScreen;
