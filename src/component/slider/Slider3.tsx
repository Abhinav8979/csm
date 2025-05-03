"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lightMidsizeAircraft, turbo } from "@/json";

const images: string[] = [
  "remove.png",
  "remove2.png",
  "remove3.png",
  "remove4.png",
];

type AircraftData = {
  seats: string;
  altitude: string;
  range: string;
  category: string;
  yom: string;
  aircraftName: string;
};

export default function Slider3() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [category, setCategory] = useState<"Light" | "Turbo">("Light");

  const [value, setValue] = useState<AircraftData | string>("Turbo");

  const getVisibleIndices = (): number[] => {
    const prev = (currentIndex - 1 + images.length) % images.length;
    const next = (currentIndex + 1) % images.length;
    return [prev, currentIndex, next];
  };

  const handleClick = (position: number): void => {
    if (position === 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (position === 2) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const getDynamicWidth = (text?: string): string => {
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

  useEffect(() => {
    if (category === "Turbo") {
      setValue(turbo[currentIndex]);
    } else {
      setValue(lightMidsizeAircraft[currentIndex]);
    }
  }, [category, currentIndex]);

  // Ensure `value` is treated as AircraftData
  const aircraft = value as AircraftData;

  return (
    <div className="relative flex flex-col  items-center w-screen h-[85vh] md:h-screen overflow-hidden">
      <>
        <div className="flex mt-3 z-20 md:my-6 overflow-hidden">
          <div
            className={`cursor-pointer py-2 border-y  md:text-base text-sm border-r  border-l  rounded-l-lg px-5 md:px-11 transition-all ${
              category === "Light"
                ? "bg-blue-50 border-[#23B2EE] border-r text-black"
                : "bg-white text-black border-r-transparent"
            }`}
            onClick={() => setCategory("Light")}
          >
            <h1>Light</h1>
          </div>
          <div
            className={`cursor-pointer py-2 md:text-base text-sm px-5 md:px-11 border-y border-r rounded-r-lg  border-l  transition-all ${
              category === "Turbo"
                ? "bg-blue-50 border-[#23B2EE]  border-l-[#23B2EE] text-black"
                : "bg-white text-black border-l-transparent "
            }`}
            onClick={() => setCategory("Turbo")}
          >
            <h1>Turbo</h1>
          </div>
        </div>
      </>

      <div className="pointer-events-none lg:-mt-1 mt-6 w-full h-[100vw] md:h-[40vw] text-black flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={valuesVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10 flex-wrap px-4">
              {["seats", "altitude", "range", "category", "yom"].map((key) => (
                <div
                  key={key}
                  className="bg-gray-100 text-center py-2 md:py-3 rounded-lg"
                  style={{ width: getDynamicWidth(key) }}
                >
                  <h1 className="text-sm md:text-base">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h1>
                  <p className="text-[#23B2EE] px-2 md:px-3 font-semibold uppercase text-xs md:text-sm">
                    {key}
                  </p>
                </div>
              ))}
            </div>

            <h1 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold whitespace-nowrap text-[#23B2EE] text-center">
              {aircraft?.aircraftName}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 w-full h-full flex  items-end justify-center">
        <AnimatePresence initial={false}>
          {getVisibleIndices().map((index, position) => {
            const isCenter = position === 1;
            const xPosition =
              position === 0 ? "-40vw" : position === 2 ? "40vw" : 0;
            const scale = isCenter ? 1.5 : 0.7;
            const zIndex = isCenter ? 10 : 5;
            const opacity = isCenter ? 1 : 0.6;
            const yPosition = isCenter ? "-9vw" : "5vw";

            return (
              <motion.img
                key={index}
                src={images[index]}
                alt={`Slide ${index + 1}`}
                className={`absolute w-[25vw] md:w-[20vw] lg:w-[17vw] h-[40vw] md:h-[25vw] lg:h-[23vw] object-contain ${
                  isCenter
                    ? "pointer-events-none md:translate-y-0 -translate-y-6"
                    : "cursor-pointer"
                }`}
                style={{ zIndex, userSelect: "none" }}
                initial={{ y: "100vh", opacity: 0, scale: 0.8, x: xPosition }}
                animate={{ y: yPosition, x: xPosition, opacity, scale }}
                exit={{ y: "100vh", opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                onClick={() => handleClick(position)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="z-50 absolute flex gap-2 bottom-[4vw] md:bottom-[5vw] lg:bottom-[4vw] rounded-lg left-1/2 -translate-x-1/2">
        <button className="text-sm md:text-base px-4 py-2 md:scale-100 scale-95 bg-[#23B2EE] text-white rounded hover:bg-blue-800">
          Request Quote
        </button>
      </div>
    </div>
  );
}
