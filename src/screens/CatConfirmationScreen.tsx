"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useAccount } from "wagmi";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { parseEther } from "viem";
import type { SendTransactionVariables } from 'wagmi/query';
import type { Config } from 'wagmi';

const catData = [
  { img: "/images/cat1.jpg", question: "Is this a cat?" },
  { img: "/images/cat2.jpg", question: "Is this a cat?" },
  { img: "/images/cat3.jpg", question: "Is this a cat?" },
  { img: "/images/cat4.jpg", question: "Is this a cat?" },
  { img: "/images/cat5.jpg", question: "Is this a cat?" },
];

const CatConfirmationScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const account = useAccount();
  const key = process.env.REACT_APP_PUBLIC_PRIVATE_KEY;
  console.log(key)
  const sa = privateKeyToAccount(
    key as `0x${string}`
  );
  console.log("sa : ", sa);
  const to = account.address;
  console.log("ta : ", to);
  const {
    data: hash,
    isPending,
    isError,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const onTaskComplete = async () => {
    console.log(sa);
    console.log(to);
    const transactionRequest: SendTransactionVariables<Config, number> = {
      account: sa,
      to: to,
      value: parseEther('0.00001'),
      type: 'eip1559',
    };
    sendTransaction(transactionRequest)
    console.log(hash);
    if (isError) {
      console.log(hash)
    }
  };

  const handleButtonClick = (title: string) => {
    setPopupTitle(title);
    setIsPopupVisible(true);
    onTaskComplete();
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPopupTitle("");
  };

  const handleKeepTagging = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % catData.length);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#E0E0E2]">
      <div
        id="cat-details"
        className="bg-cover bg-center bg-no-repeat flex flex-col rounded-3xl flex-grow mx-4 my-5 sm:mx-8 sm:my-6"
        style={{ backgroundImage: `url(${catData[currentIndex].img})` }}
      >
        <div className="flex justify-start p-5">
          <img
            src="/images/user-profile.jpg"
            alt="User Profile"
            className="w-12 h-12 rounded-full sm:w-20 sm:h-20"
          />
        </div>
        <div className="flex flex-col items-center flex-grow p-4 sm:p-5">
          <div className="relative w-full flex-grow flex items-center justify-center"></div>
          <span className="text-lg mt-4 bg-white p-3 rounded-md shadow-[10px_10px_#727774] sm:text-xl">
            {catData[currentIndex].question}
          </span>
          <div className="flex space-x-4 mt-4 w-10/12 justify-between">
            <button
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 25 Tags today, reward on the way!"
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            >
              ✖
            </button>
            <button
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 25 Tags today, reward on the way!"
                )
              }
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            >
              ✔
            </button>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Header onOptionChange={() => { }} />
      </div>
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/3 text-center">
            <h3 className="text-lg font-semibold mb-4">{popupTitle}</h3>

            {isConfirming && (
              <div className="flex justify-center items-center">
                <div
                  className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin
                              aspect-square w-8 flex justify-center items-center text-yellow-700"
                ></div>
              </div>
            )}
            {isConfirmed && (
              <div className="flex gap-2 justify-center">
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  View Reward
                </a>
                <button
                  onClick={handleKeepTagging}
                  className="bg-gray-500 text-white px-4 py-2 rounded-full"
                >
                  Keep tagging
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatConfirmationScreen;
