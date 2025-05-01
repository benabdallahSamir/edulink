"use client";
import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Announse from "@/components/promos/AnnounseSt";
import Upcoming from "@/components/Upcoming";
import Trending from "@/components/Trending";
import GetStarted from "@/components/GetStarted";
import Image from "next/image";
import heroPic from "@/public/hero.png";

import { useSelector } from "react-redux";

export default function Home() {
  const { isLoggin: isLoged } = useSelector((s) => s.user);
  return (
    <div className="relative overflow-x-hidden">
      {/* Hero background container */}
      <div className="relative h-[350px] w-full">
        {/* Hero image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroPic || "/placeholder.svg"}
            alt="Hero"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1B1B1B] opacity-80"></div>
        </div>

        {/* Content container */}
        <div className="container relative mx-auto h-full">
          <Hero />
        </div>
      </div>

      {/* Rest of the content */}
      <div className="container mx-auto">
        <Courses />
        <Trending />
        {!isLoged && <Announse title="Join Edulink now to get 35% off" />}
        {/* <Upcoming /> */}
        {!isLoged && (
          // <Announse title="Join Edulink now to get 35% off" />
          <GetStarted />
        )}
      </div>
    </div>
  );
}
