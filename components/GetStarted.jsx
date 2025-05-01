"use client";
import { useRouter } from "next/navigation";

const GetStarted = () => {
  const router = useRouter();

  const handleGetStartedClick = () => {
    // Redirect to the registration page
    router.push("/auth/Signup");
  };

  return (
    <div className="bg-[#FFEC8A] rounded-t-[20px] flex items-center justify-center h-[170px] flex-col p-8">
      <h1 className="text-2xl font-gilroy font-bold mb-8 text-center">
        Get personal learning recommendations based on your needs
      </h1>
      <button
        onClick={handleGetStartedClick}
        className="px-8 py-2 text-base rounded-lg font-gilroy font-bold text-[#1B1B1B] border-2 border-[#1B1B1B] opacity-60 bg-transparent hover:bg-[#1B1B1B] hover:text-[#FFEC8A] hoverTransition"
      >
        Get Started
      </button>
    </div>
  );
};

export default GetStarted;