"use client";
import PaidCourse from "@/components/PaidCourse";
import { errorNotifcation } from "@/components/toast";
import UnpaidCourse from "@/components/UnpaidCourse";
import { getCourse, getReview } from "@/request/courses";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Button } from "@/components/ui/button";
import GraduationPng from "@/public/Graduation.svg";
import Image from "next/image";
import CourseFinalPage from "@/components/CourseFinalPage";

function page() {
  const { courseId } = useParams();
  const [refresh, setRefresh] = useState(null);
  const [reviewPage, setReviewPage] = useState(false);
  const [data, setData] = useState(null);
  const [review, setReview] = useState([]);
  const route = useRouter();
  // get data
  useEffect(() => {
    (async function () {
      const { status, data } = await getCourse(courseId);
      switch (status) {
        case 200:
          // if (data.paid && data.course.progress?.for100 === 100) {
          //   route.push(`/Courses/final/${courseId}`);
          //   console.log(data.course.progress);
          //   return;
          // }
          setData(data);
          break;
        case 404:
          errorNotifcation(data.message);
          console.log(data.message);
          break;
        case 500:
          console.log(data.message);
          break;
        case 10:
          console.log("dev bugs");
      }
    })();
  }, [refresh]);
  // get review
  useEffect(() => {
    (async function () {
      const { status, data } = await getReview(courseId);
      switch (status) {
        case 200:
          setReview(data.reviews);
          break;
        case 204:
          setReview([]);
          break;
        case 10:
          console.log("dev bugs");
        default:
          console.log(data.message);
      }
    })();
  }, [refresh]);
  // go to final page
  function finalPage() {
    setReviewPage(true);
  }
  // some methods
  function restartCourse() {
    setReviewPage(false);
    setData((prev) => {
      const course = prev.course;
      return {
        ...prev,
        course: { ...course, progress: { for100: 0, chapterNumber: 0 } },
      };
    });
  }
  function gotoLastCourse() {
    setReviewPage(false);
    setData((prev) => {
      const course = prev.course;
      return {
        ...prev,
        course: {
          ...course,
          progress: {
            for100: ((course.chapterNumber - 2) * 100) / course.chapterNumber,
            chapterNumber: course.chapterNumber - 1,
          },
        },
      };
    });
  }

  // loading
  if (data === null) return <Loading />;
  return (
    <div className="w-full">
      {reviewPage ? (
        <CourseFinalPage />
      ) : data.paid ? (
        data.course.progress?.for100 === 100 ? (
          <div className="relative w-full h-[71vh] flex justify-center items-center flex-col">
            <Image
              src={GraduationPng || "/placeholder.svg"}
              alt="Hero"
              fill
              priority
              quality={100}
              className="absolute object-cover"
              sizes="100vw"
            />
            <h1 className="z-10 text-3xl font-bold text-center text-primary">
              Congratulations! You have completed the course.
            </h1>
            <div className="z-10 h-10 w-full mt-1 flex justify-center items-center">
              <Button
                onClick={() => restartCourse()}
                className="capitalize bg-white px-2 text-green-700 font-semibold border border-green-700 hover:border-green-500 hover:text-green-500 duration-300"
              >
                restart progress
              </Button>
              <Button
                onClick={() => finalPage()}
                className="capitalize bg-white ml-2 px-2 text-green-700 font-semibold border border-green-700 hover:border-green-500 hover:text-green-500 duration-300"
              >
                review
              </Button>
              <Button
                onClick={() => gotoLastCourse()}
                className="capitalize bg-white ml-2 px-2 text-green-700 font-semibold border border-green-700 hover:border-green-500 hover:text-green-500 duration-300"
              >
                last chapter
              </Button>
            </div>
          </div>
        ) : (
          <PaidCourse
            course={data.course}
            finalPage={finalPage}
            review={review}
          />
        )
      ) : (
        <UnpaidCourse
          course={data.course}
          setRefresh={setRefresh}
          review={review}
        />
      )}
    </div>
  );
}

export default page;
