"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/CustomUI/tabs";
import { getDashboard } from "@/request/user";
import {
  initCourses,
  initFavCourses,
  initMyCourses,
  initWishlistCourses,
} from "@/redux/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { errorNotifcation } from "@/components/toast";

const UserDashboard = () => {
  const { Mycourses: courses, favoriteCourse } = useSelector(
    (s) => s.dashboard
  );
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const router = useRouter();
  const defTab = searchParams.get("defTab") || "all-courses";
  // console.log(favoriteCourse)
  // GET DASHBOARD INFORMATION
  useEffect(() => {
    (async function () {
      const { data, status } = await getDashboard();
      console.log(data);
      // HUNDLE RESPONSE
      switch (status) {
        case 200:
          const { favCourses, buyCourses, wishlistCourses } = data;
          dispatch(initMyCourses(buyCourses));
          dispatch(initFavCourses(favCourses));
          dispatch(initWishlistCourses(wishlistCourses));
          break;
        case 401:
          errorNotifcation(data.message);
          router.push("/");
          break;
        case 10:
          errorNotifcation("error 10 status");
          break;
        default:
          errorNotifcation(data.message);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col mb-6">
      <main className="flex-1">
        <div className="container py-8 w-full flex flex-col justify-center items-center">
          <div className="mb-4">
            <h1 className="text-3xl font-bold font-gilroy">My Course</h1>
          </div>
          <Tabs
            defaultValue={defTab} // Listen for tab changes
            className="w-[90%] flex flex-col justify-center items-center"
          >
            <TabsList>
              <TabsTrigger
                value="all-courses"
                className="font-gilroy font-bold text-sm"
              >
                All Courses
              </TabsTrigger>
              <TabsTrigger
                value="Favorite"
                className="font-gilroy font-bold text-sm"
              >
                Favorite
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="font-gilroy font-bold text-sm"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            {/* All courses */}
            <TabsContent value="all-courses" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold text-center">My Course</h1>
                <p className="text-gray-500 font-medium text-center">
                  List of your courses
                </p>
              </div>
              {courses.length == 0 ? (
                <h1 className="text-3xl mt-10 text-center font-semibold w-full">
                  No Course Yet
                </h1>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {courses.map((course, i) => (
                    <CourseCard key={i} course={course} menuIcon={true} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Favorite */}
            <TabsContent value="Favorite" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold text-center">Favorite</h1>
                <p className="text-gray-500 font-medium text-center">
                  List of your favorite courses
                </p>
              </div>
              {favoriteCourse.length == 0 ? (
                <h1 className="text-3xl mt-10 text-center font-semibold w-full">
                  No Course Yet
                </h1>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {favoriteCourse.map((course, i) => (
                    <CourseCard key={i} course={course} favIcon={true} />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Completed */}
            <TabsContent value="completed" className="mt-6">
              <div className="mb-8 font-gilroy">
                <h1 className="text-2xl font-bold text-center">Completed</h1>
                <p className="text-gray-500 font-medium text-center">
                  List of your completed courses
                </p>
              </div>
              {courses.length == 0 ? (
                <h1 className="text-3xl mt-10 text-center font-semibold w-full">
                  No Course Yet
                </h1>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {courses.map(
                    (course, i) =>
                      course.chapterNumber ===
                        course.progress.chapterNumber && (
                        <CourseCard
                          key={i}
                          course={course}
                          completIcon={true}
                        />
                      )
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
