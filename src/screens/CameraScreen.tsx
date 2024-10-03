import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';

const CameraScreen = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const sliderRef = useRef<Slider | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(true);
    const [photo, setPhoto] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState(true);

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
                video: { facingMode: isFrontCamera ? 'user' : 'environment' } // Use facingMode to control camera
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


    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: '0px',
    };

    const handleCaptureClick = () => {
        //capturePhoto(); //function to capture photo
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#E0E0E2] relative">
            <div className="flex-grow relative mt-16 md:mt-0">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover fixed inset-0 z-0" />
                {photo && (
                    <div className="absolute bottom-4 left-4 w-24 h-auto rounded-md border border-gray-300 shadow-lg z-10">
                        <img src={photo} alt="Captured" className="w-full h-full object-cover rounded-md" />
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden" width={640} height={480}></canvas>

                <Slider ref={sliderRef} {...carouselSettings} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full h-[120px]">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="filter-container flex items-center justify-center">
                            <div
                                className="w-20 h-20 bg-white rounded-full border border-8 border-[#b5b5bd] flex items-center justify-center cursor-pointer"
                                onClick={handleCaptureClick}
                            >
                            </div>
                        </div>
                    ))}
                </Slider>
                <button
                    onClick={handleCameraFlip}
                    className="w-16 h-16 absolute top-2 right-2 z-10"
                >
                    <img src='/images/cameraflip.png' alt='camera' />
                </button>
            </div>
        </div>
    );
};

export default CameraScreen;
