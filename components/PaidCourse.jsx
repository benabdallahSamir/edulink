"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomProgress from "@/components/CustomUI/Progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/CustomUI/tabs";
import { errorNotifcation, successNotifcation } from "./toast";
import { submitQueez } from "@/request/courses";
import { genProfileImg } from "@/public/avatars/avatar";

const PaidCourse = ({ course, finalPage, review }) => {
  // SET DATA INSIDE STAT
  const [Course, setCourse] = useState(course);
  // GET PRORESS
  const [isCurrent, setIsCurrent] = useState(Course.progress.chapterNumber);
  const [progress, setProgress] = useState(Course.progress.chapterNumber);
  // GET QUIZ
  const [quizes, setQuizes] = useState(Course.chapters[progress].quizzes);
  // QUIZE STATS
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // EVENTS
  const handleQuizChange = (quizIndex, choiceIndex) => {
    setQuizAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizIndex]: choiceIndex,
    }));
  };
  const handleQuizSubmit = async () => {
    setQuizSubmitted(true);
    const answerResult = quizes.reduce((prev, queez, index) => {
      if (quizAnswers[index] === undefined) {
        errorNotifcation("answer all questions pleas");
        return false;
      }
      const isCorrectAnswer = queez.correctAnswer === quizAnswers[index];
      return prev + (isCorrectAnswer ? 1 : 0);
    }, 0);
    const { status, data } = await submitQueez(
      answerResult,
      course.id,
      progress
    );
    if (status === 10) {
      errorNotifcation("error with code 10");
    } else if (status !== 200) errorNotifcation(data.message);
    else if (data.course.progress.for100 === 100) finalPage();
    else {
      setCourse(data.course);
      setIsCurrent(data.course.progress.chapterNumber);
      setProgress(data.course.progress.chapterNumber);
      setQuizes(data.course.chapters[progress].queezes);
      setQuizAnswers({});
      setQuizSubmitted(false);
      successNotifcation("submit successfuly");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mt-2">{Course.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-muted-foreground capitalize">
            {Course.username}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{Course.stars.count}</span>
            <span className="text-muted-foreground">
              ({Course.view?.count} ratings)
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative aspect-video bg-black mb-6 rounded-3xl overflow-hidden">
            <video className="w-full h-full" poster={course.picture} controls>
              <source src={Course.chapters[progress].link} type="video/mp4" />
            </video>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="Quiz">
            <TabsList>
              <TabsTrigger value="Quiz">Quiz</TabsTrigger>
              <TabsTrigger value="Description">Description</TabsTrigger>
              <TabsTrigger value="Review">Review</TabsTrigger>
            </TabsList>

            {/* Quiz */}
            <TabsContent value="Quiz">
              <div className="mt-8">
                <h2 className="text-lg font-gilory mb-2 font-bold">
                  Chapter Quizzes
                </h2>
                <div className="space-y-2">
                  {quizes.map((quiz, index) => (
                    <div key={index} className="border rounded-sm p-4">
                      <h3 className="text-md font-semibold mb-4">
                        Quiz {index + 1}: {quiz.question}
                      </h3>
                      <div className="space-y-2">
                        {quiz.options.map((choice, choiceIndex) => (
                          <div
                            key={choiceIndex}
                            className={`flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent cursor-pointer ${
                              quizSubmitted &&
                              quizAnswers[index] === choiceIndex
                                ? quiz.answerNumber === choiceIndex
                                  ? "bg-green-100"
                                  : "bg-red-100"
                                : ""
                            }`}
                            onClick={() => handleQuizChange(index, choiceIndex)}
                          >
                            <input
                              type="radio"
                              id={`quiz-${index}-choice-${choiceIndex}`}
                              name={`quiz-${index}`}
                              className="w-4 h-4 text-primary"
                              checked={quizAnswers[index] === choiceIndex}
                              onChange={() =>
                                handleQuizChange(index, choiceIndex)
                              }
                            />
                            <label
                              htmlFor={`quiz-${index}-choice-${choiceIndex}`}
                              className="flex-grow cursor-pointer"
                            >
                              {choice}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6" onClick={handleQuizSubmit}>
                  Submit All Answers
                </Button>
              </div>
            </TabsContent>

            {/* Description */}
            <TabsContent value="Description">
              <div className="ml-4 space-y-2">
                <h2 className="text-md font-bold">Make Uber Clone App</h2>
                <p className="text-gray-500 font-normal text-sm">
                  {Course.description}
                </p>
              </div>
            </TabsContent>

            {/* Review */}
            <TabsContent value="Review">
              <div className="mb-8">
                <h2 className="text-md font-bold mb-1">Review</h2>
                <div className="space-y-6">
                  {review.map((rv, index) => (
                    <div key={index} className="flex gap-4">
                      <Avatar>
                        <AvatarImage
                          src={genProfileImg(rv.user.picture)}
                          alt={rv.user.username}
                        />
                        <AvatarFallback>{rv.user.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm text-[#3DCBB1]">
                          {rv.user.username}
                        </h3>
                        <p className="text-sm text-gray-500 font-normal">
                          {rv.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Progress Card */}
          <div className="border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {`Chapter${progress + 1} : ${course.chapters[progress].title}`}
            </h2>
            <div className="flex items-center justify-between mb-2">
              <span>{progress} Lectures</span>
              <span className="text-primary">
                {course.progress.for100}% completed
              </span>
            </div>
            <CustomProgress
              value={progress}
              max={course.chapterNumber}
              className="my-1"
            />

            <Accordion
              type="single"
              collapsible
              className="space-y-2 mt-2"
              value={isCurrent}
              onValueChange={setIsCurrent}
            >
              {course.chapters.map((chapter, index) => (
                <AccordionItem
                  key={index}
                  value={index}
                  className="border rounded-lg"
                >
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div
                      className={`flex flex-col items-start 
                        ${progress === index && "text-pink-500"} 
                      ${progress > index && "text-green-500"}`}
                    >
                      <div
                        className={`font-medium
                           ${progress === index && "text-pink-500"}`}
                      >
                        {chapter.title}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div
                      className={`flex items-center gap-2 py-2 
                        ${progress === index && "text-pink-500"}
                        ${progress > index && "text-green-500"}
                        `}
                    >
                      <div className="w-2 h-2 rounded-full bg-muted" />
                      <span>{chapter.description}</span>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidCourse;
