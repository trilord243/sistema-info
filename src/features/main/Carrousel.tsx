import { useEffect, useState } from "react";
import rightArrow from "../assets/rightArrow.svg";
import leftArrow from "../assets/leftArrow.svg";

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden drop-shadow-xl">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full flex justify-center">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="block w-auto max-w-full h-auto max-h-[35rem] object-cover mx-auto rounded-lg drop-shadow-xl"
            />
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 p-4 opacity-75 hover:opacity-100"
      >
        <img src={leftArrow} className="filter hover:grayscale-0" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 p-4 opacity-75 hover:opacity-100"
      >
        <img src={rightArrow} className="filter hover:grayscale-0" />
      </button>
    </div>
  );
};

export default Carousel;
