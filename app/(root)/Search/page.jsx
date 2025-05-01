"use client";

"use client"

import { useEffect, useState } from "react";

import CourseCard from "@/components/CourseCard";

import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { search } from "@/request/courses";

const Search = () => {
  const [courses, setCourses] = useState([]);
  const searchParams = useSearchParams();
  const SrchStr = searchParams.get("query") || "";
  const [searchStr, setSearchStr] = useState(SrchStr);
  useEffect(() => {
    handleSearchClick();
  }, []);

  const handleSearchClick = async () => {
    if (!searchStr) {
      setCourses([]);
      return ;}
    const { status, data } = await search(searchStr);
    switch (status) {
      case 200:
        setCourses(data.courses);
        break;
      case 204:
        setCourses([]);
        break;
      default:
        console.log(status);
    }
  }

  return (
    <div className="container p-6 mx-auto">
        <div className="flex justify-around gap-5 mb-8">
            <Input 
                type="email" 
                placeholder="Find courses..."
                defaultValue={SrchStr}
                onChange={(e) => setSearchStr(e.target.value)}
              />
            <button 
            onClick={handleSearchClick}
            className="hoverTransition py-2 px-6 text-xs font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500  rounded-2xl">Search</button>
        </div>
        <div className="mb-8 font-gilroy">
            <h1 className="text-2xl font-bold ">Search result</h1>
            <p className="text-gray-500 font-medium">
                We know the best things for You. Top picks for You.
            </p>
        </div>
        {courses.length === 0 && <div className="text-3xl h-40 flex items-center justify-center font-semibold">no course found</div>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course, i) => (
                <CourseCard
                key={i}
                course={course}
              />
            ))}
        </div>
    </div>
  )
}

export default Search