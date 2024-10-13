"use client";
import React, { useState } from "react";
import Header from "../components/Header";
import { useAccount } from "wagmi";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { parseEther } from "viem";
import type { SendTransactionVariables } from 'wagmi/query';
import type { Config } from 'wagmi';

const fruitData = [
  { img: "/images/fruits/fruit1.jpeg", question: "Rate the Banana" },
  { img: "/images/fruits/fruit2.jpeg", question: "Rate the Banana" },
  { img: "/images/fruits/fruit3.jpeg", question: "Rate the Banana" },
  { img: "/images/fruits/fruit4.jpeg", question: "Rate the Banana" },
  { img: "/images/fruits/fruit5.jpeg", question: "Rate the Banana" },
];

const userData = [
  { img: "/images/users/user1.png" },
  { img: "/images/users/user2.png" },
  { img: "/images/users/user3.png" },
  { img: "/images/users/user4.png" },
  { img: "/images/users/user5.png" },
];

const FruitConfirmationScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const account = useAccount();
  const key = process.env.REACT_APP_PUBLIC_PRIVATE_KEY;
  const sa = privateKeyToAccount(
    key as `0x${string}`
  );
  const to = account.address;
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
    if (currentIndex == 2) {
      setIsPopupVisible(true);
      const transactionRequest: SendTransactionVariables<Config, number> = {
        account: sa,
        to: to,
        value: parseEther('0.00001'),
        type: 'eip1559',
      };
      sendTransaction(transactionRequest)
      console.log(hash);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fruitData.length);
    }
  };

  const handleButtonClick = (title: string) => {
    setPopupTitle(title);
    onTaskComplete();
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setPopupTitle("");
  };

  const handleKeepTagging = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fruitData.length);
    handleClosePopup();
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#E0E0E2]">
      <div
        id="cat-details"
        className="bg-cover bg-center bg-no-repeat flex flex-col rounded-3xl flex-grow mx-4 my-5 sm:mx-8 sm:my-6"
        style={{ backgroundImage: `url(${fruitData[currentIndex].img})` }}
      >
        {/* <div className="flex justify-start p-5">
          <img
            src={userData[currentIndex].img}
            alt="User Profile"
            className="w-12 h-12 rounded-full sm:w-20 sm:h-20"
          />
        </div> */}
        <div className="flex flex-col items-center flex-grow p-4 sm:p-5 ">
          <div className="relative w-full flex-grow flex items-center justify-center"></div>

          <div className="flex space-x-4 mt-4 w-10/12 justify-center">
            {/* <button
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            >
              ✖
            </button>
            <button
              onClick={() =>
                handleButtonClick(
                  "Awesome, you completed 3 Tags today, reward on the way!"
                )
              }
              className="bg-green-500 text-white px-4 py-2 rounded-full text-sm sm:text-base"
            >
              ✔
            </button> */}
            <div className="bg-[#E0E0E2] bg-opacity-80 rounded-md w-[100%] flex flex-col justify-center px-4">
              <div className="flex justify-center p-2">
                {fruitData[currentIndex].question}
              </div>

              <div className="gap-2 gap-x-12  py-2 grid grid-cols-2">
                <div onClick={() =>
                  handleButtonClick(
                    "Awesome, you completed 3 Tags today, reward on the way!"
                  )
                }>
                  <input
                    className="peer sr-only"
                    value="male"
                    name="gender"
                    id="male"
                    type="radio"
                  />
                  <div
                    className="flex h-8 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                  >
                    <label
                      className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"
                    >
                      Raw
                    </label>
                  </div>
                </div>
                <div onClick={() =>
                  handleButtonClick(
                    "Awesome, you completed 3 Tags today, reward on the way!"
                  )
                }>
                  <input
                    className="peer sr-only"
                    value="female"
                    name="gender"
                    id="female"
                    type="radio"
                  />
                  <div
                    className="flex h-8 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                  >
                    <label
                      className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"

                    >
                      Ripe
                    </label>
                  </div>
                </div>

                <div onClick={() =>
                  handleButtonClick(
                    "Awesome, you completed 3 Tags today, reward on the way!"
                  )
                }>
                  <input
                    className="peer sr-only"
                    value="other"
                    name="gender"
                    id="other"
                    type="radio"
                  />
                  <div
                    className="flex h-8 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                  >
                    <label
                      className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"

                    >
                      Overripe
                    </label>
                  </div>
                </div>
                <div onClick={() =>
                  handleButtonClick(
                    "Awesome, you completed 3 Tags today, reward on the way!"
                  )
                }>
                  <input
                    className="peer sr-only"
                    value="other"
                    name="gender"
                    id="other"
                    type="radio"
                  />
                  <div
                    className="flex h-8 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400"
                  >
                    <label
                      className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"

                    >
                      Rotten
                    </label>
                  </div>
                </div>
              </div>
            </div>
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

export default FruitConfirmationScreen;
