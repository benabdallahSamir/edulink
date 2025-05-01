"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { BarChart, Users, BookOpen } from "lucide-react";
import Loading from "@/app/(root)/Courses/[courseId]/Loading";
import { useSelector } from "react-redux";

const TeacherDashboard = () => {
  const router = useRouter();
  const {
    user: { isteacher },
  } = useSelector((s) => s.user);
  useEffect(() => {
    if (!isteacher) {
      router.push("/");
      return;
    }
  }, []);

  return (
    <div className="container mx-auto py-10 font-gilroy">
      <h1 className="text-3xl font-bold mb-8 text-center">Teacher Dashboard</h1>
      <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post New Course</CardTitle>
            <CardDescription>Create and publish a new course</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/Instructor/postCourse")}
              className="w-full font-semibold font-gilory bg-green-600 hover:bg-green-700 hoverTransition text-white"
            >
              <BookOpen className="mr-2 h-4 w-4" /> Create Course
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Posted Courses</CardTitle>
            <CardDescription>View and manage your courses</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push("/Instructor/myCourses")}
              className="w-full font-semibold font-gilory bg-green-600 hover:bg-green-700 hoverTransition text-white"
            >
              <BarChart className="mr-2 h-4 w-4" /> View Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
