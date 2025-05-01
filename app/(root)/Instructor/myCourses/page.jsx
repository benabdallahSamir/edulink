"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Pencil, BookLock, BookCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, deleteCourse, initMyCourses } from "@/redux/dashboard";
import { getDashboard } from "@/request/user";
import { enableCourse, hideCourse } from "@/request/courses";

const MyPostedCourses = () => {
  const router = useRouter();
  useEffect(() => {
    (async function () {
      const { status, data } = await getDashboard();
      console.log(data);
      if (status === 200) {
        dispatch(initMyCourses(data.courses));
      }
    })();
  }, []);
  const { Mycourses: courses } = useSelector((s) => s.dashboard);
  const dispatch = useDispatch();
  const handleEdit = (courseId) => {
    router.push(`/Instructor/editCourse/${courseId}`);
  };
  const handleVisible = async (courseId) => {
    // fetch for visible course
    const { status } = await enableCourse(courseId);
    if (status == 200) dispatch(addCourse(courseId));
  };
  const handleDelete = async (courseId) => {
    // fetch for delete course
    await hideCourse(courseId);
    dispatch(deleteCourse(courseId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-gilroy"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Posted Courses
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`h-full flex flex-col ${
                course.visible || "bg-gray-200 opacity-80"
              }`}
            >
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.category} - {course.level}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm mb-2 overflow-hidden">
                  {course.description}
                </p>
                <p className="font-semibold">${course.price}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-700 font-bold hover:bg-green-500 duration-300 text-white"
                  onClick={() => handleEdit(course.id)}
                >
                  <Pencil className="mr-2 h-4 w-2" /> Edit
                </Button>
                {course.visible ? (
                  <Button
                    variant="destructive"
                    className="bg-red-700 font-bold hover:bg-red-500 duration-300 text-white"
                    size="sm"
                    onClick={() => handleDelete(course.id)}
                  >
                    <BookLock className="mr-2 h-4 w-4" /> Draft
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    className="bg-[#003049] font-bold hover:bg-blue-700 duration-300 text-white"
                    size="sm"
                    onClick={() => handleVisible(course.id)}
                  >
                    <BookCheck className="mr-2 h-4 w-4" /> Published
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyPostedCourses;
