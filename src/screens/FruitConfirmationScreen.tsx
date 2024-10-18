"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { privateKeyToAccount } from "viem/accounts";
import { parseEther } from "viem";
import type { SendTransactionVariables } from 'wagmi/query';
import type { Config } from 'wagmi';
import { useAccount, useBalance } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { RootState } from "../store/store";
import { CategoryState } from "../store/stringSlice";
import { useSelector } from 'react-redux';


const bananaData = [
  {
    img: "/images/fruits/fruit1.jpeg",
    question: "Rate the Banana",
    properties: ["Raw", "Ripe", "Overripe", "Rotten"]
  },
  {
    img: "/images/fruits/fruit2.jpeg",
    question: "Rate the Banana",
    properties: ["Raw", "Ripe", "Overripe", "Rotten"]
  },
  {
    img: "/images/fruits/fruit3.jpeg",
    question: "Rate the Banana",
    properties: ["Raw", "Ripe", "Overripe", "Rotten"]
  },
  {
    img: "/images/fruits/fruit4.jpeg",
    question: "Rate the Banana",
    properties: ["Raw", "Ripe", "Overripe", "Rotten"]
  },
  {
    img: "/images/fruits/fruit5.jpeg",
    question: "Rate the Banana",
    properties: ["Raw", "Ripe", "Overripe", "Rotten"]
  }
];

const automobileData = [
  {
    img: "/images/automobile/bk1.jpg",
    question: "Rate the Automobile",
    properties: ["Bike", "Car", "Truck", "Auto"]
  },
  {
    img: "/images/automobile/bk2.jpg",
    question: "Rate the Automobile",
    properties: ["Bike", "Car", "Truck", "Auto"]
  },
  {
    img: "/images/automobile/bk3.jpg",
    question: "Rate the Automobile",
    properties: ["Bike", "Car", "Truck", "Auto"]
  },
  {
    img: "/images/automobile/bk4.jpg",
    question: "Rate the Automobile",
    properties: ["Bike", "Car", "Truck", "Auto"]
  },
];

const plantData = [
  {
    img: "/images/plant/pl1.jpg",
    question: "Rate the Plant",
    properties: ["Herbs", "Shrubs", "Trees", "Climbers"]
  },
  {
    img: "/images/plant/pl2.jpg",
    question: "Rate the Plant",
    properties: ["Herbs", "Shrubs", "Trees", "Climbers"]
  },
  {
    img: "/images/plant/pl3.jpg",
    question: "Rate the Plant",
    properties: ["Herbs", "Shrubs", "Trees", "Climbers"]
  },
  {
    img: "/images/plant/pl4.jpg",
    question: "Rate the Plant",
    properties: ["Herbs", "Shrubs", "Trees", "Climbers"]
  }
];


const garbageData = [
  {
    img: "/images/waste/gab1.jpg",
    question: "Rate the Garbage",
    properties: ["Organic", "Paper", "Plastic", "Glass"]
  },
  {
    img: "/images/waste/gab2.jpg",
    question: "Rate the Garbage",
    properties: ["Organic", "Paper", "Plastic", "Glass"]
  },
  {
    img: "/images/waste/gab3.jpg",
    question: "Rate the Garbage",
    properties: ["Organic", "Paper", "Plastic", "Glass"]
  },
  {
    img: "/images/waste/gab4.jpg",
    question: "Rate the Garbage",
    properties: ["Organic", "Paper", "Plastic", "Glass"]
  }
];


const FruitConfirmationScreen = () => {
  const category = useSelector((state: RootState) => state.category.category) as CategoryState;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const { address } = useAccount();
  const { data: addressData } = useBalance({ address });
  const [bal, setBal] = useState(0);
  const { ready, authenticated } = usePrivy();

  const account = useAccount();
  const key = process.env.REACT_APP_PUBLIC_PRIVATE_KEY;
  const sa = privateKeyToAccount(key as `0x${string}`);
  const to = account.address;
  const { data: hash, sendTransaction } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });
  const getCategoryData = () => {
    switch (category) {
      case 'banana':
        return bananaData;
      case 'plant':
        return plantData;
      case 'garbage':
        return garbageData;
      case 'automobile':
        return automobileData;
      default:
        return bananaData;
    }
  };

  const fruitData = getCategoryData();

  const onTaskComplete = async () => {
    if (currentIndex === 2) {
      setIsPopupVisible(true);
      const transactionRequest: SendTransactionVariables<Config, number> = {
        account: sa,
        to: to,
        value: parseEther('0.00001'),
        type: 'eip1559',
      };
      sendTransaction(transactionRequest);
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

  useEffect(() => {
    if (addressData) {
      setBal(Number(addressData?.formatted) * 2500);
    }
  }, [addressData]);

  return (
    <div className="flex flex-col justify-between min-h-screen bg-[#E0E0E2]">
      <div
        id="cat-details"
        className="bg-cover bg-center bg-no-repeat flex flex-col rounded-3xl flex-grow mx-4 my-5 sm:mx-8 sm:my-6"
        style={{
          backgroundImage: `url(${fruitData[currentIndex].img})`
        }}
      >
        {ready && authenticated && (
          <div className="flex justify-start p-5">
            <span className="bg-gray-300 rounded-full text-gray-800 text-2xl p-3 px-4">
              <b> 💰 $ {bal.toString().slice(0, 4)}</b>
            </span>
          </div>
        )}
        <div className="flex flex-col items-center flex-grow p-4 sm:p-5">
          <div className="relative w-full flex-grow flex items-center justify-center"></div>

          <div className="flex space-x-4 mt-4 w-10/12 justify-center">
            <div className="bg-[#E0E0E2] bg-opacity-80 rounded-md w-[100%] flex flex-col justify-center px-4">
              <div className="flex justify-center p-2">
                {fruitData[currentIndex].question}
              </div>

              <div className="gap-2  py-2 grid grid-cols-2">
                {fruitData[currentIndex].properties.map((property, index) => (
                  <div className="flex justify-center"
                    key={index}
                    onClick={() =>
                      handleButtonClick(
                        "Awesome, you completed 3 Tags today, reward on the way!"
                      )
                    }
                  >
                    <input
                      className="peer sr-only"
                      value={property.toLowerCase()}
                      name="ripeness"
                      id={property.toLowerCase()}
                      type="radio"
                    />
                    <div className="flex h-8 w-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-1 transition-transform duration-150 hover:border-blue-400 active:scale-95 peer-checked:border-blue-500 peer-checked:shadow-md peer-checked:shadow-blue-400">
                      <label
                        className="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500 peer-checked:text-blue-500"
                      >
                        {property}
                      </label>
                    </div>
                  </div>
                ))}
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
                <div className="loader border-t-2 rounded-full border-gray-500 bg-gray-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700"></div>
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
