"use client";
import BigCard from "./BigCard";
import CourseCard from "./CourseCard";

import { bestCourses } from "@/request/courses";
import { useEffect, useState } from "react";

const Trending = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await bestCourses(2);
      switch (status) {
        case 10:
          console.log("10");
          break;
        case 204:
          console.log("204");
          break;
        case 200:
          setCourses(data.courses);
          console.log("200");
          break;
        case 400:
          console.log("400");
          console.log(data);
          break;
        case 500:
          console.log("500");
          console.log(data);
          break;
      }
    })();
  }, []);
  return (
    <div className="mx-8 py-8">
      <h2 className="text-3xl font-bold text-center mt-8 font-gilroy">
        Trending Courses
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-start my-12 w-full mx-auto">
        <BigCard />
        <div className="flex flex-row items-start justify-end flex-wrap gap-8 w-full lg:w-[55%]">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
