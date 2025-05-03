"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { turbo } from "@/json";

const images = [
  "https://s3.us-west-1.amazonaws.com/thisisatestspacefor.design/images/N30GT/exterior.jpg?...",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
];

export default function Slider3() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const value = turbo[currentIndex];

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    return [prev, currentIndex, next];
  };

  const handleClick = (position: number) => {
    if (position === 0) {
      // clicked left
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (position === 2) {
      // clicked right
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const getDynamicWidth = (text: string) => {
    if (!text) return "80px";
    const baseWidth = 80;
    const charWidth = 10;
    const minWidth = 80;
    const maxWidth = 200;
    const calculatedWidth = baseWidth + text.length * charWidth;
    return `${Math.min(Math.max(calculatedWidth, minWidth), maxWidth)}px`;
  };

  const valuesVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  return (
    <div className="relative flex  lg:items-center w-screen  h-screen overflow-hidden">
      {/* Values Container */}
      <div className="pointer-events-none lg:mt-0 mt-6 w-full h-[100vw] md:h-[40vw]  text-black flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={valuesVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10 flex-wrap px-4">
              <div
                className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                style={{ width: getDynamicWidth(value?.seats) }}
              >
                <h1 className="text-sm md:text-base">Seats</h1>
                <p className="text-violet-950 px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                  {value?.seats}
                </p>
              </div>
              <div
                className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                style={{ width: getDynamicWidth(value?.altitude) }}
              >
                <h1 className="text-sm md:text-base">Altitude</h1>
                <p className="text-violet-950 px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                  {value?.altitude}
                </p>
              </div>
              <div
                className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                style={{ width: getDynamicWidth(value?.range) }}
              >
                <h1 className="text-sm md:text-base">Range</h1>
                <p className="text-violet-950 px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                  {value?.range}
                </p>
              </div>
              <div
                className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                style={{ width: getDynamicWidth(value?.category) }}
              >
                <h1 className="text-sm md:text-base">Category</h1>
                <p className="text-violet-950 px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                  {value?.category}
                </p>
              </div>
              <div
                className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                style={{ width: getDynamicWidth(value?.yom) }}
              >
                <h1 className="text-sm md:text-base">Year</h1>
                <p className="text-violet-950 px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                  {value?.yom}
                </p>
              </div>
            </div>

            <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold whitespace-nowrap text-violet-950 text-center mt-4">
              {value?.aircraftName}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Slider - On Click Navigation */}
      <div className="absolute bottom-0 w-full h-full flex items-end justify-center">
        <AnimatePresence initial={false}>
          {getVisibleIndices().map((index, position) => {
            const isCenter = position === 1;
            const xPosition =
              position === 0 ? "-40vw" : position === 2 ? "40vw" : 0;
            const scale = isCenter ? 1.8 : 0.6;
            const zIndex = isCenter ? 10 : 5;
            const opacity = isCenter ? 1 : 0.6;
            const yPosition = isCenter ? "-8vw" : "5vw";

            return (
              <motion.img
                key={images[index]}
                src={"remove.png"}
                alt={`Slide ${index + 1}`}
                className={`absolute w-[25vw] md:w-[20vw] lg:w-[17vw] h-[40vw] md:h-[25vw] lg:h-[23vw] object-contain ${
                  isCenter ? "pointer-events-none" : "cursor-pointer"
                }`}
                style={{ zIndex }}
                initial={{
                  y: "100vh",
                  opacity: 0,
                  scale: 0.8,
                  x: xPosition,
                }}
                animate={{
                  y: yPosition,
                  x: xPosition,
                  opacity,
                  scale,
                }}
                exit={{ y: "100vh", opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={() => handleClick(position)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Request Quote Button */}
      <div className="z-50 absolute bottom-[4vw] md:bottom-[5vw] lg:bottom-[4vw] rounded-lg left-1/2 -translate-x-1/2">
        <button className="text-xs md:text-base px-4 py-2 md:scale-100 scale-95 bg-violet-950 text-white rounded hover:bg-violet-800">
          Request Quote
        </button>
      </div>
    </div>
  );
}
