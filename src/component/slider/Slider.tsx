"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { turbo } from "@/json";
import { PanInfo } from "framer-motion";

const images = [
  "https://s3.us-west-1.amazonaws.com/thisisatestspacefor.design/images/N30GT/exterior.jpg?...",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
];

// const circleColors = [
//   "bg-black/10",
//   "bg-blue-900/10",
//   "bg-purple-900/10",
//   "bg-red-900/10",
//   "bg-green-900/10",
// ];

export default function CircularSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const value = turbo[currentIndex];

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    if (info.offset.x < -threshold) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > threshold) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    return [prev, currentIndex, next];
  };

  const getDynamicWidth = (text: string) => {
    if (!text) return "80px"; // Fallback width
    const baseWidth = 80; // Base width in pixels
    const charWidth = 10; // Approximate width per character in pixels
    const minWidth = 80; // Minimum width
    const maxWidth = 200; // Maximum width
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

  // const circleGradients = [
  //   "bg-gradient-to-br from-black/20 to-gray-500/10",
  //   "bg-gradient-to-br from-blue-900/20 to-cyan-500/10",
  //   "bg-gradient-to-br from-purple-900/20 to-pink-500/10",
  //   "bg-gradient-to-br from-red-900/20 to-orange-500/10",
  //   "bg-gradient-to-br from-green-900/20 to-teal-500/10",
  // ];

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Circle */}
      {/* <div
        className={`w-[80vw] md:w-[60vw] lg:w-[50vw] transition-colors duration-200 ease-in-out pointer-events-none aspect-square scale-[1.5] md:scale-[1.8] lg:scale-[2] rounded-full ${circleColors[currentIndex]} absolute -bottom-[80%] md:-bottom-[90%] lg:-bottom-[110%] left-1/2 -translate-x-1/2`}
      ></div> */}
      {/* <div
        style={{
          width:
            windowSize <= 320 ? "80vw" : windowSize <= 768 ? "70vw" : "50vw",
        }}
        className={`lg:w-[50vw] transition-colors duration-300 ease-in-out pointer-events-none aspect-square scale-[1.5] md:scale-[1.8] lg:scale-[2] rounded-full ${circleGradients[currentIndex]} absolute -bottom-[35%] md:-bottom-[90%] lg:-bottom-[110%] left-1/2 -translate-x-1/2`}
      ></div> */}

      {/* Values Container */}
      <div className="absolute pointer-events-none w-full h-[100vw] md:h-[40vw] lg:h-[35vw] text-black top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center">
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

      {/* Image Slider */}
      <motion.div
        className="absolute bottom-0 w-full h-full flex items-end justify-center hover:cursor-grab"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false}>
          {getVisibleIndices().map((index, position) => {
            const isCenter = position === 1;
            const xPosition =
              position === 0 ? "-40vw" : position === 2 ? "40vw" : 0;
            const scale = isCenter ? 1.8 : 0.6;
            const zIndex = isCenter ? 10 : 5;
            const opacity = isCenter ? 1 : 0.6;
            const yPosition = isCenter ? "-10vw" : "5vw";

            return (
              <motion.img
                key={images[index]}
                src={"/remove.png"}
                alt={`Slide ${index + 1}`}
                className="absolute w-[25vw] md:w-[20vw] lg:w-[17vw] h-[40vw] md:h-[25vw] lg:h-[23vw] object-contain pointer-events-none"
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
              />
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Request Quote Button */}
      <div className="z-50 absolute bottom-[4vw] md:bottom-[5vw] lg:bottom-[4vw] rounded-lg left-1/2 -translate-x-1/2">
        <button className="text-xs md:text-base px-4 py-2 md:scale-100 scale-95 bg-violet-950 text-white rounded hover:bg-violet-800">
          Request Quote
        </button>
      </div>
    </div>
  );
}
