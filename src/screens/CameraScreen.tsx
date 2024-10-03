import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CameraScreen = () => {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(true);
    const [photo, setPhoto] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [activeFilterIndex, setActiveFilterIndex] = useState(2);
    const [showPhoto, setShowPhoto] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const filters = [
        '/images/cat1.jpg',
        '/images/cat2.jpg',
        '/images/cat3.jpg',
        '/images/cat4.jpg',
        '/images/cat5.jpg'
    ];

    useEffect(() => {
        if (isCameraOpen) {
            openCamera();
        } else {
            closeCamera();
        }
        return () => {
            closeCamera();
        };
    }, [isCameraOpen]);

    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: isFrontCamera ? 'user' : 'environment' }
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
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };

    const capturePhoto = (index: number) => {
        setActiveFilterIndex(index);
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                setPhoto(canvasRef.current.toDataURL('image/png'));
                setShowPhoto(true);
            }
        }
    };

    const handleCameraFlip = () => {
        setIsFrontCamera(prev => !prev);
    };

    const handlePublish = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
        setShowPhoto(false);
        setPhoto(null);
        setIsCameraOpen(true);
        navigate('/screen3');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F0F4FD] to-[#E0E0E2] relative overflow-hidden">
            {!showPhoto ? (
                <div id='camera-div' className="flex-grow relative mt-8 md:mt-0 overflow-y-auto">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover fixed inset-0 z-0" />
                    <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full overflow-x-auto flex gap-2">
                        <motion.div
                            className="flex p-4"
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {filters.map((filter, index) => (
                                <div key={index} className={`w-16 h-16 mx-2 bg-gradient-to-r from-[#e0e4e8] to-[#ffffff] shadow-lg rounded-full ${activeFilterIndex === index ? 'border-blue-500' : 'border-white'} border-4 flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-all duration-300`}
                                    onClick={() => { capturePhoto(index) }}>
                                    <img src={filter} alt={`Filter ${index + 1}`} className="w-full h-full object-cover rounded-full" />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <button
                        onClick={handleCameraFlip}
                        className="w-16 h-16 absolute right-2 z-10 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] p-3 rounded-full shadow-lg hover:scale-110 transform transition-all duration-300"
                    >
                        <img src='/images/cameraflip.png' alt='Flip Camera' className="w-full h-full object-contain" />
                    </button>
                </div>
            ) : (
                <div id='show-picture' className="flex flex-col items-center justify-center h-full">
                    {photo && (
                        <img
                            src={photo}
                            alt="Captured"
                            className="w-[100%] h-[80vh] object-cover rounded-lg shadow-lg border border-gray-200"
                        />
                    )}
                    <button
                        onClick={handlePublish}
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg font-medium rounded-lg shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    >
                        Publish
                    </button>
                </div>
            )}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl transform scale-100 transition-transform duration-300 hover:scale-105">
                        <h2 className="text-xl text-gray-800 font-semibold">Picture published successfully!</h2>
                        <button
                            onClick={closePopup}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white text-sm font-medium rounded-md shadow hover:shadow-lg transition-all duration-300"
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
