"use client";
import Image from "next/image";
import Plane from "../../../public/plane.jpg";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function AnimatedCard({
  direction,
  children,
}: {
  direction: "1" | "-1";
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const cloudX = useMotionValue(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);

  useEffect(() => {
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const planeWidth = 400;
  const cloudWidth =
    windowWidth < 768
      ? 260
      : windowWidth < 1024
      ? 400
      : windowWidth < 1640
      ? 500
      : windowWidth < 2440
      ? 700
      : 1050;
  const gap = windowWidth < 768 ? 40 : windowWidth < 1024 ? 70 : 90;

  const planeX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      direction === "1"
        ? -planeWidth - windowWidth - 100
        : windowWidth + planeWidth,
      direction === "1" ? windowWidth + planeWidth : -planeWidth,
    ]
  );

  useEffect(() => {
    const stopTriggerPosition =
      direction === "-1"
        ? windowWidth / 2 - planeWidth * 2
        : windowWidth / 2 + planeWidth / 2;

    const cloudStopPosition = windowWidth / 2 - cloudWidth / 2;

    let currentAnimation: ReturnType<typeof animate> | null = null;

    const unsubscribe = planeX.on("change", (latestPlaneX) => {
      const followX =
        direction === "-1"
          ? latestPlaneX + cloudWidth + gap
          : latestPlaneX - cloudWidth - gap;

      const shouldStop =
        direction === "-1"
          ? latestPlaneX <= stopTriggerPosition
          : latestPlaneX >= stopTriggerPosition;

      if (shouldStop) {
        if (currentAnimation) currentAnimation.stop();
        currentAnimation = animate(cloudX, cloudStopPosition);
      } else {
        if (currentAnimation) currentAnimation.stop();
        cloudX.set(followX);
      }
    });

    return () => {
      if (currentAnimation) currentAnimation.stop();
      unsubscribe();
    };
  }, [planeX, windowWidth, cloudWidth, planeWidth, gap, cloudX, direction]);

  useEffect(() => {
    const initialPlaneX = -planeWidth;
    const initialCloudX = initialPlaneX - cloudWidth - gap;
    cloudX.set(initialCloudX);
  }, [cloudX, cloudWidth, planeWidth, gap]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div className="relative w-full h-full">
          {/* Cloud */}
          <motion.div
            style={{
              x: cloudX,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              zIndex: 10,
              width: `${cloudWidth}px`,
              height: `${cloudWidth}px`,
            }}
          >
            {children}
          </motion.div>

          {/* Plane */}
          <motion.div
            initial={{ rotate: direction === "1" ? 0 : 180 }}
            style={{ x: planeX }}
            className="absolute top-[45%] -translate-y-1/2 w-auto flex gap-10"
          >
            <Image
              src={Plane}
              alt="Plane"
              className={`${
                windowWidth < 768
                  ? "w-[180px]"
                  : windowWidth < 1024
                  ? "w-[300px]"
                  : windowWidth <= 1640
                  ? "w-[400px]"
                  : "w-[800px]"
              } h-auto`}
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
