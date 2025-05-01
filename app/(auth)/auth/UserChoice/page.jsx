
"use client"

import { useRouter } from "next/navigation";
import { Button } from "/components/ui/button";

const page = () => {



    const router = useRouter();
    
    const handleClientclick = () => {
        // Handle client click event
        console.log("Client clicked the button");
        router.push('/Servises');
    }

    const handleStudentclick = () => {
        // Handle client click event
        console.log("Client clicked the button");
        router.push('/');
    }



  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-around bg-white rounded-lg h-[80vh] ">
      
      <div className='text-center'>
        <h1 className="text-3xl leading-8 text-[#111111] font-gilroy font-medium mt-8">Choose...</h1>
        <p className="text-sm leading-8 font-gilroy text-[#111111]">How can we help you?</p>
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center w-full">


        <div className="flex flex-col justify-around itmes-center w-[45%] h-[260px] bg-[#EFF6F3] px-8 py-6 border-2 border-[#111111] rounded-xl">
            <div className=" w-24 text-center h-auto p-2  border-2 border-[#111111]  text-[#111111] font-gilroy font-bold rounded-md ">Student</div>
            <h2 className="text-xl leading-6 font-gilroy font-semibold text-[#111111] mt-4">If you’re eager to expand your knowledge</h2>
            <Button 
                variant="outline" 
                onClick={handleStudentclick}
                className='w-full border-2 border-[#333333] rounded-[40px] font-gilroy font-medium p-6 text-xl hoverTransition bg-white text-[#111111] hover:bg-green-500 hover:text-white'>
                Choose 
            </Button>
        </div>

        <div className="flex flex-col justify-around itmes-center w-[45%] h-[260px] bg-[#EFF6F3] px-8 py-6 border-2 border-[#111111] rounded-xl">
            <div className=" w-20 text-center h-auto p-2  border-2 border-[#111111]  text-[#111111] font-gilroy font-bold rounded-md">Client</div>
            <h2 className="text-xl leading-6 font-gilroy font-semibold text-[#111111] mt-4">If you are seeking a qualified freelancer to complete your task</h2>
            <Button 
                variant="outline" 
                onClick={handleClientclick}
                className='w-full border-2 border-[#333333] rounded-[40px] font-gilroy font-medium p-6 text-xl hoverTransition bg-white text-[#111111] hover:bg-green-500 hover:text-white'>
                Choose 
            </Button>
        </div>
      </div>
    </div>
  )
}

export default page