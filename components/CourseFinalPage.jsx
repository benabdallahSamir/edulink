"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { Star, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyCourseReview, getMyCourseProgress } from "../request/courses.js";
// Mock quiz results (replace with actual data fetching in a real app)
const mockQuizResults = [
  { quizName: "Introduction Quiz", score: 8, totalQuestions: 10 },
  { quizName: "Chapter 1 Quiz", score: 9, totalQuestions: 10 },
  { quizName: "Chapter 2 Quiz", score: 7, totalQuestions: 10 },
  { quizName: "Final Quiz", score: 18, totalQuestions: 20 },
];

// rating gui
import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { handleReview } from "@/request/courses";
import { successNotifcation } from "@/components/toast";
import { useEffect } from "react";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const CourseFinalPage = () => {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [hover, setHover] = React.useState(-1);
  const { courseId } = useParams();
  const [result, setResult] = useState([]);
  useEffect(() => {
    (async () => {
      const res1 = await getMyCourseReview(courseId);
      if (res1.status === 200) {
        setRating(res1.data.review.star);
        setReview(res1.data.review.message);
      }
      const res2 = await getMyCourseProgress(courseId);

      if (res2.status === 200) {
        const handleResult = [];
        for (const quiz in res2.data.quiz) {
          handleResult.push({
            name: `chapter number : ${parseInt(quiz) + 1}`,
            score: res2.data.quiz[quiz],
          });
        }
        setResult(handleResult);
      }
    })();
  }, []);
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async () => {
    const { status, data } = await handleReview(review, rating, courseId);
    if (status === 200) {
      successNotifcation(data.message);
      handleSkip();
    }
    //handle review
  };

  const handleSkip = () => {
    setIsSubmitted(true);
  };


  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-gilroy">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Course Completed!</CardTitle>
              <CardDescription>
                We'd love to hear your thoughts on the course.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Rate this course:</p>
                <div className="flex space-x-1">
                  <Rating
                    name="hover-feedback"
                    defaultValue={2.5}
                    value={rating}
                    size="large"
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {rating !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : rating]}
                    </Box>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">
                  Write a review (optional):
                </p>
                <Textarea
                  placeholder="Share your experience with this course..."
                  value={review}
                  onChange={handleReviewChange}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                className="text-green-700 font-semibold border-green-700 hover:border-green-500 hover:text-green-500 hoverTransition "
                onClick={handleSkip}
              >
                Skip
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-green-500 font-semibold hover:bg-green-400 hoverTransition text-white"
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2"
        >
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Your Course Results</CardTitle>
              <CardDescription>
                Here's how you performed in the course quizzes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.map((quiz, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span>{quiz.name}</span>
                    <span className="font-medium">{quiz.score}/5</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => router.push("/dashboards/User")}
                className="w-full text-green-700 font-semibold border-green-700 hover:border-green-500 hover:text-green-500 hoverTransition "
              >
                Return to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CourseFinalPage;
