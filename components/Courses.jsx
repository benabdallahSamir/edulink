"use client";
import React from "react";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { bestCourses } from "@/request/courses";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await bestCourses(5);
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
    <div className="w-full flex flex-col items-center mb-8 py-8 ">
      <h1 className="text-3xl font-gilroy font-bold mb-8">
        Browse Our Top Courses
      </h1>
      <div className="flex justify-around flex-wrap gap-4">
        {courses.map((course, i) => (
          <CourseCard
            key={i}
            course={course}
            courseId={course.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
