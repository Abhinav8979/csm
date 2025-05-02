"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { turbo } from "@/json";
import Image from "next/image";

const images = [
  "https://s3.us-west-1.amazonaws.com/thisisatestspacefor.design/images/N30GT/exterior.jpg?...",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
];

export default function Slider2() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const value = turbo[currentIndex];

  const handlePlaneClick = (index: number) => {
    setCurrentIndex(index);
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

  return (
    <div className="relative flex  lg:items-center w-screen  h-screen overflow-hidden">
      {/* Values Container */}
      <div className="pointer-events-none lg:mt-0 mt-16 w-full h-[100vw] md:h-[40vw] lg:h-[35vw] text-black flex justify-center">
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

      {/* Plane Slider */}
      <div className="absolute  flex items-center justify-center w-full h-full gap-4 md:gap-6 lg:gap-8">
        <AnimatePresence>
          {images.map((src, index) => {
            const GAP = 21; // adjust as needed
            const midIndex = Math.floor(images.length / 2); // middle index of the planes

            return (
              <motion.div
                className={`absolute -translate-x-1/2 translate-y-[60%] md:translate-y-1/2`}
                key={index}
                initial={{
                  opacity: 0.6, // Start with lower opacity for non-selected planes
                  width: "10vw", // initial width for non-selected planes
                  left: `${50 + (index - midIndex) * GAP}%`, // Spread the planes from the center
                  bottom: "25%", // Adjust the starting vertical position
                }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.6, // Highlight the selected plane
                  width: index === currentIndex ? "500px" : "10vh", // Enlarge selected plane
                  left:
                    index === currentIndex
                      ? "50%"
                      : `${50 + (index - midIndex) * GAP}%`, // Center the selected plane
                  bottom: index === currentIndex ? "45%" : "10%", // Adjust vertical position for non-selected planes
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeInOut",
                }}
                onClick={() => handlePlaneClick(index)}
              >
                <Image
                  width={3900}
                  height={3900}
                  src={"/remove.png"}
                  alt={`Plane ${index + 1}`}
                  className="h-[30vw] md:h-[18vw] lg:h-[20vw] translate-y-2 md:translate-y-0 object-contain cursor-pointer"
                  style={{ zIndex: index === currentIndex ? 10 : 5 }} // Ensure selected plane has higher zIndex
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
