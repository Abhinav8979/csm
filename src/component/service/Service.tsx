"use client";

import AnimatedCard from "@/component/hero/AnimatedCard";
import React, { useEffect, useState } from "react";

import Image, { StaticImageData } from "next/image";

import service1 from "../../../public/service1.png";
import service2 from "../../../public/assets/service2.png";
import service3 from "../../../public/assets/service3.png";

interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  description: string;
  link: string | null;
  id: number;
}

const services: ServiceCardProps[] = [
  {
    id: 1,
    image: service3,
    title: "Direct Charter to Public",
    description:
      "Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.",
    link: null,
  },
  {
    id: 2,
    image: service1,
    title: "Medical Charter",
    description:
      "We are proud to provide medavac air charter service to the Organ Donor community; providing On-Demand Air Medical Transportation services for over ten years with a perfect safety record.",
    link: "/donornetworkwest",
  },
  {
    id: 3,
    image: service2,
    title: "Wholesale - Jet Brokers",
    description:
      "24/7 Responsive Air Charter service, providing air charter solutions. From intake to booking to wheels down and final ground transportation; constant communication and transparency every step of the way is our standard routine.",
    link: null,
  },
];

const Service = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <>
      <div className="h-[100vh] text-white w-full bg-black flex items-center justify-center">
        Scroll Down
      </div>
      {services.map((ele, index) => {
        const scale = index === 0 ? "1.3" : index === 1 ? "2.2" : "1.7";
        const translate =
          index === 2
            ? isMobile
              ? "translate(5px, 20px)"
              : "translate(32px, 40px)"
            : index === 0
            ? isMobile
              ? "translate(5px, 20px)"
              : "translate(35px, 20px)"
            : "translate(0px, 0px)";

        return (
          <section
            key={ele.id}
            style={{
              marginTop:
                index === 0
                  ? !isMobile
                    ? "0px"
                    : "-20vh"
                  : index === 1
                  ? "-50vh"
                  : isMobile
                  ? "-50vh"
                  : "-20vh",
            }}
            className="w-full h-[250vh]"
          >
            <AnimatedCard direction={index % 2 === 0 ? "1" : "-1"}>
              <>
                <Image
                  width={700}
                  height={700}
                  src={ele.image}
                  alt="service background"
                  className="w-full h-full opacity-50"
                  style={{ scale, transform: translate }}
                  priority
                />
                <div className="absolute w-full md:p-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <h1 className="text-center  text-black text-sm md:text-2xl lg:text-4xl font-bold">
                    {ele.title}
                  </h1>
                  <p className="text-black md:text-balance text-xs text-center">
                    {ele.description}
                  </p>
                </div>
              </>
            </AnimatedCard>
          </section>
        );
      })}
    </>
  );
};

export default Service;
