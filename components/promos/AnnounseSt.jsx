"use client";

import React, { useState } from "react";
import Image from "next/image";
import decoration from "@/public/prom/Rhône.svg";
import { useRouter } from "next/navigation";

const Announse = ({ title }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleJoinClick = () => {
    console.log("Joining EduLink...");
    setLoading(true);
    router.push("/auth/Signup");
  };

  return (
    <div className="bg-[#1B283F] relative flex flex-col w-[95%] h-[300px] mx-auto rounded-xl overflow-hidden mx-8 p-8">
      <div className="font-gilroy flex justify-center flex-col items-start h-full w-full">
        <h1 className="text-white text-4xl font-medium mb-2 mt-5">{title}</h1>
        <h2 className="text-gray-400 font-thin text-2xl leading-10">
          Join our responsive E-learning platform,
          <br /> enjoy a seamless experience on any device so will your blog
          the best visitor
        </h2>
        <button
          onClick={handleJoinClick}
          disabled={loading}
          className="my-4 font-gilroy text-base py-2 px-6 font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-white rounded-md hoverTransition disabled:bg-gray-500"
        >
          {loading ? "Joining EduLink..." : "Join EduLink"}
        </button>
      </div>
      <Image
        src={decoration}
        alt="Promotional Rhone"
        width={100}
        className="absolute bottom-0 right-0 h-full w-[400px] object-cover"
      />
    </div>
  );
};

export default Announse;