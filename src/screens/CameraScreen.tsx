import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CategoryState } from "../store/stringSlice";


const CameraScreen = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [activeFilterIndex, setActiveFilterIndex] = useState(2);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const category = useSelector((state: RootState) => state.category.category) as CategoryState;

  const filters = (() => {
    switch (category) {
      case "cat":
        return ["/images/fur1.jpg", "/images/fur2.jpg", "/images/fur3.jpg", "/images/fur4.jpg"];
      case "banana":
        return ["/images/fruits/fruit1.jpeg", "/images/fruits/fruit2.jpeg", "/images/fruits/fruit3.jpeg", "/images/fruits/fruit4.jpeg"];
      case "plant":
        return ["/images/plant/plant1.jpg", "/images/plant/plant2.jpg", "/images/plant/plant3.jpg", "/images/plant/plant4.jpg"];
      case "skin":
        return ["/images/rash.jpg"];
      case "garbage":
        return ["/images/waste/waste1.png", "/images/waste/waste2.png", "/images/waste/waste3.png", "/images/waste/waste4.png"];
      case "automobile":
        return ["/images/automobile/bike1.jpg", "/images/automobile/bike2.jpg", "/images/automobile/bike3.jpg", "/images/automobile/bike4.jpg"];
      default:
        return ["/images/fur1.jpg", "/images/fur2.jpg", "/images/fur3.jpg", "/images/fur4.jpg"];
    }
  })()

  useEffect(() => {
    if (isCameraOpen) {
      openCamera();
    } else {
      closeCamera();
    }
    return () => {
      closeCamera();
    };
  }, [isCameraOpen, isFrontCamera]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: isFrontCamera ? "user" : "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as MediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = (index: number) => {
    setActiveFilterIndex(index);
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        setPhoto(canvasRef.current.toDataURL("image/png"));
        setShowPhoto(true);
      }
    }
  };

  const handleCameraFlip = () => {
    setIsFrontCamera((prev) => !prev);
  };

  const handlePublish = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowPhoto(false);
    setPhoto(null);
    setIsCameraOpen(true);
    navigate("/screen3");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F0F4FD] to-[#E0E0E2] relative overflow-hidden">
      {!showPhoto ? (
        <div id="camera-div" className="flex-grow relative mt-8 md:mt-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover fixed inset-0 z-0"
          />
          <canvas
            ref={canvasRef}
            className="hidden"
            width={640}
            height={480}
          ></canvas>
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full overflow-x-auto flex gap-2 justify-center">
            <div
              className="flex p-4"
            >
              {filters.map((filter, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 mx-2 bg-gradient-to-r from-[#e0e4e8] to-[#ffffff] shadow-lg rounded-full border-4 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300`}
                  onClick={() => {
                    capturePhoto(index);
                  }}
                >
                  <img
                    src={filter}
                    alt={`Filter ${index + 1}`}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleCameraFlip}
            className="w-16 h-16 fixed right-2 z-10 bg-white p-3 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
          >
            <img
              src="/images/cameraflip.png"
              alt="Flip Camera"
              className="w-full h-full object-contain"
            />
          </button>
        </div>
      ) : (
        <div
          id="show-picture"
          className="flex flex-col items-center justify-center h-full"
        >
          {photo && !showPopup && (
            <>
              <img
                src={photo}
                alt="Captured"
                className="w-[100%] h-[100vh] object-cover rounded-lg shadow-lg border border-gray-200"
              />
              <button
                onClick={handlePublish}
                className="fixed bottom-8 z-10 mt-6 px-8 py-3 bg-gray-600 text-white text-lg font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                Publish
              </button>
            </>
          )}
        </div>
      )}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="flex flex-col items-center justify-centerp-6 rounded-lg transform scale-100 transition-transform duration-300 hover:scale-105">
            <img
              src="/images/tick.png"
              alt="Captured"
              className="w-full object-cover rounded-lg"
            />
            <h2 className="flex items-center justify-center text-xl text-gray-800 font-semibold">
              Your data is securedly stored on Filecoin
            </h2>

            <button
              onClick={closePopup}
              className="mt-4 px-6 py-2 bg-gray-500 text-white text-sm font-medium rounded-md shadow hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>

      )}
    </div>
  );
};

export default CameraScreen;
