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

const colorGradients = [
  "radial-gradient(50% 50% at 50% 50%, #011627 50%, #012a54 100%)",
  "radial-gradient(50% 50% at 50% 50%, #D1E4F6 50%, #5F9CCF 100%)",
  // "radial-gradient(50% 50% at 50% 50%, #FBFBFB 50%, #6FE6FC 100%)",

  "radial-gradient(50% 50% at 50% 50%, #e0e0e0 50%, #6FDCE3 100%)",
  // "radial-gradient(50% 50% at 50% 50%, #e6f2fe 50%, #23B2EE 100%)",
  "radial-gradient(50% 50% at 50% 50%, #27548A 50%, #183B4E 100%)",
];

const switchColors = [
  {
    yes: "bg-black/50 text-white border-white",
    no: "bg-transparent  text-gray-300 border-white/30",
  },
  {
    yes: "bg-black/80 text-white border-white",
    no: "bg-transparent  text-gray-300 border-white/30",
  },
  {
    yes: "bg-black/80 text-white border-black",
    no: "bg-transparent text-[#1a1a1a] border-[#1a1a1a]/30",
  },
  {
    yes: "bg-black/50 text-white border-white",
    no: "bg-transparent  text-gray-300 border-white/30",
  },
];
const headingColors = [
  "text-white",
  "text-white",
  "text-[#003344]",
  "text-white",
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
  const [category, setCategory] = useState<
    "LIGHT | MIDSIZE JETS" | "TURBOPROPS"
  >("LIGHT | MIDSIZE JETS");
  const [value, setValue] = useState<AircraftData | string>("TURBOPROPS");

  const getVisibleIndices = (): { index: number; position: number }[] => {
    const result = [{ index: currentIndex, position: 1 }]; // center image

    if (currentIndex > 0) {
      result.unshift({ index: currentIndex - 1, position: 0 }); // left image
    }

    if (currentIndex < images.length - 1) {
      result.push({ index: currentIndex + 1, position: 2 }); // right image
    }

    return result;
  };

  const handleClick = (position: number): void => {
    if (position === 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (position === 2 && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const getDynamicWidth = (text?: string): string => {
    if (!text) return "80px";

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    const baseWidth = 80;
    const charWidth = isMobile ? 6 : 10;
    const minWidth = 60;
    const maxWidth = isMobile ? 130 : 200;

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
    if (category === "TURBOPROPS") {
      setValue(turbo[currentIndex]);
    } else {
      setValue(lightMidsizeAircraft[currentIndex]);
    }
  }, [category, currentIndex]);

  const aircraft = value as AircraftData;

  return (
    <div
      style={{
        background: colorGradients[currentIndex],
      }}
      className="relative flex flex-col items-center w-screen h-[85vh] md:h-screen overflow-hidden bg-gradient-to-b from-[#011627] to-[#012a54]"
    >
      {/* Category Toggle Buttons */}
      <div className="flex mt-3 z-20 md:my-6 overflow-hidden">
        <div
          // className={`cursor-pointer py-1.5 px-3 text-sm md:py-2 md:px-11 md:text-base border-y border-r border-l rounded-l-lg transition-all ${
          //   category === "LIGHT | MIDSIZE JETS"
          //     ? "bg-[#23B2EE]/60 text-white border-[#23B2EE]"
          //     : "bg-[#1e293b] text-gray-300 border-transparent"
          // }`}
          className={`py-1.5 px-3 text-sm md:py-2 md:px-11 md:text-base border-y border-r border-l rounded-l-lg transition-all ${
            category === "LIGHT | MIDSIZE JETS"
              ? `${switchColors[currentIndex].yes} pointer-events-none`
              : `${switchColors[currentIndex].no} cursor-pointer`
          }`}
          onClick={() => setCategory("LIGHT | MIDSIZE JETS")}
        >
          <h1>Light</h1>
        </div>
        <div
          className={`py-1.5 px-3 text-sm md:py-2 md:px-11 md:text-base border-y border-l border-r rounded-r-lg transition-all ${
            category === "TURBOPROPS"
              ? `${switchColors[currentIndex].yes} pointer-events-none`
              : `${switchColors[currentIndex].no} cursor-pointer`
          }`}
          onClick={() => setCategory("TURBOPROPS")}
        >
          <h1>Turbo</h1>
        </div>
      </div>

      {/* Aircraft Info */}
      <div className="pointer-events-none lg:-mt-1 mt-6 w-full h-[100vw] md:h-[40vw] flex justify-center text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={valuesVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center justify-center gap-4 md:gap-6 lg:gap-10 flex-wrap px-4">
              {(
                [
                  "seats",
                  "altitude",
                  "range",
                  "category",
                  "yom",
                ] as (keyof AircraftData)[]
              ).map((key) => (
                <div
                  key={key}
                  className="text-center border border-[#23B2EE] py-2 md:py-3 rounded-lg"
                  style={{
                    width: getDynamicWidth(key),
                    backgroundColor: "rgba(35, 178, 238, 0.1)",
                  }}
                >
                  <h1
                    className={`text-sm md:text-base ${headingColors[currentIndex]}`}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h1>
                  <p className="text-[#23B2EE] px-2 md:px-3  font-semibold uppercase text-[11px] md:text-sm">
                    {aircraft[key]}
                  </p>
                </div>
              ))}
            </div>

            <h1 className="text-[10vw] md:text-[10vw] lg:text-[8vw] font-bold whitespace-nowrap text-[#23B2EE] text-center">
              {aircraft?.aircraftName}
            </h1>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image Slider */}
      <div className="absolute bottom-0 w-full h-full flex items-end justify-center">
        <AnimatePresence initial={false}>
          {getVisibleIndices().map(({ index, position }) => {
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
                style={{
                  zIndex,
                  userSelect: "none",
                  transition: "filter 0.4s ease",
                }}
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

      {/* Request Quote Button */}
      <div className="z-50 absolute flex gap-2 bottom-[4vw] md:bottom-[5vw] lg:bottom-[4vw] rounded-lg left-1/2 -translate-x-1/2">
        <button className="text-sm cursor-pointer md:text-base px-6 py-2 md:scale-100 scale-95 bg-gradient-to-r from-[#23B2EE] to-[#1a96ca] text-white rounded-lg hover:from-[#1a96ca] hover:to-[#23B2EE] transition-all duration-300 shadow-lg shadow-[#23B2EE]/20">
          Request Quote
        </button>
      </div>
    </div>
  );
}
