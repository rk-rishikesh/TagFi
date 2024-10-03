import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CameraScreen = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(true);
    const [photo, setPhoto] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [activeFilterIndex, setActiveFilterIndex] = useState(0);

    const filters = [...Array(5)];

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

    const capturePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                setPhoto(canvasRef.current.toDataURL('image/png'));
            }
        }
    };

    const handleCameraFlip = () => {
        setIsFrontCamera(prev => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E0E2] relative overflow-hidden">
            <div className="flex-grow relative mt-8 md:mt-0 overflow-y-auto">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover fixed inset-0 z-0" />
                {photo && (
                    <div className="absolute left-4 w-24 h-auto rounded-md border border-gray-300 shadow-lg z-10">
                        <img src={photo} alt="Captured" className="w-full h-full object-cover rounded-md" />
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full overflow-x-auto flex gap-2">
                    <motion.div
                        className="flex p-4"
                        animate={{ x: -activeFilterIndex * 100 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {filters.map((_, index) => (
                            <div key={index} className="w-16 h-16 mx-2 bg-white rounded-full border border-4 border-[#b5b5bd] flex items-center justify-center cursor-pointer p-2"
                                onClick={capturePhoto}>
                                <span className="text-center">Filter {index + 1}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <button
                    onClick={handleCameraFlip}
                    className="w-16 h-16 absolute right-2 z-10"
                >
                    <img src='/images/cameraflip.png' alt='camera' />
                </button>
            </div>
        </div>
    );
};

export default CameraScreen;
