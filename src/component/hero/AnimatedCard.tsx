"use client";
import Image from "next/image";
import Plane from "../../../public/assets/videos/plane.jpg";
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
  const [windowWidth, setWindowWidth] = useState(1200);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start start`, "end end"],
  });

  const planeWidth = 420;
  const gap = 30;

  const cloudX = useMotionValue(0);

  const cloudWidth = windowWidth < 768 ? 260 : windowWidth < 1024 ? 400 : 480;

  const planeX = useTransform(
    scrollYProgress,
    [0, 1],
    [
      direction === "1" ? -planeWidth : windowWidth + planeWidth,
      direction === "1" ? windowWidth + planeWidth : -planeWidth,
    ]
  );

  useEffect(() => {
    const stopTriggerPosition =
      direction === "-1"
        ? windowWidth / 2 - planeWidth / 2
        : windowWidth / 2 + planeWidth / 2;

    const cloudStopPosition = windowWidth / 2 - cloudWidth / 2;

    let currentAnimation: ReturnType<typeof animate> | null = null;

    const unsubscribe = planeX.on("change", (latestPlaneX) => {
      let followX;

      if (direction === "-1") {
        followX = latestPlaneX + planeWidth + gap;

        if (windowWidth < 768) {
          if (followX <= 0) {
            if (currentAnimation) currentAnimation.stop();
          } else {
            if (currentAnimation) currentAnimation.stop();
            cloudX.set(followX);
          }
        } else if (windowWidth >= 768 && windowWidth <= 1024) {
          if (followX <= 270) {
            if (currentAnimation) currentAnimation.stop();
          } else {
            if (currentAnimation) currentAnimation.stop();
            cloudX.set(followX);
          }
        } else {
          if (followX <= 500) {
            if (currentAnimation) currentAnimation.stop();
          } else {
            if (currentAnimation) currentAnimation.stop();
            cloudX.set(followX);
          }
        }
      } else {
        followX = latestPlaneX - cloudWidth - gap;

        if (latestPlaneX < stopTriggerPosition) {
          if (currentAnimation) currentAnimation.stop();
          cloudX.set(followX);
        } else {
          if (currentAnimation) currentAnimation.stop();
          currentAnimation = animate(cloudX, cloudStopPosition, {
            duration: 0.4,
          });
        }
      }
    });

    return () => {
      if (currentAnimation) currentAnimation.stop();
      unsubscribe();
    };
  }, [planeX, windowWidth, cloudWidth, planeWidth, gap, cloudX, direction]);

  useEffect(() => {
    const updateWindowWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      const initialPlaneX = -planeWidth;
      const initialCloudX = initialPlaneX - cloudWidth - gap;
      cloudX.set(initialCloudX);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, [cloudX, cloudWidth, planeWidth, gap]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div className="relative w-full h-full">
          {/* Cloud */}
          <motion.div
            // id="cloud-clip-path"
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
            className="absolute top-1/2 -translate-y-1/2 w-auto flex gap-10"
          >
            <Image
              src={Plane}
              alt="Plane"
              className={`${
                windowWidth < 768
                  ? "w-[180px]"
                  : windowWidth < 1024
                  ? "w-[300px]"
                  : "w-[400px]"
              } h-auto`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
