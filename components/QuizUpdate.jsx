"use client";

import { Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { errorNotifcation, successNotifcation } from "./toast";
import { updateQuize } from "@/request/courses";

const newQuizz = [
  {
    question: "question 1",
    options: [
      "option 1 of question 1",
      "option 2 of question 1",
      "option 3 of question 1",
      "option 4 of question 1",
    ],
    correctAnswer: 0,
  },
  {
    question: "question 2",
    options: [
      "option 1 of question 2",
      "option 2 of question 2",
      "option 3 of question 2",
      "option 4 of question 2",
    ],
    correctAnswer: 0,
  },
  {
    question: "question 3",
    options: [
      "option 1 of question 3",
      "option 2 of question 3",
      "option 3 of question 3",
      "option 4 of question 3",
    ],
    correctAnswer: 0,
  },
  {
    question: "question 4",
    options: [
      "option 1 of question 4",
      "option 2 of question 4",
      "option 3 of question 4",
      "option 4 of question 4",
    ],
    correctAnswer: 0,
  },
  {
    question: "question 5",
    options: [
      "option 1 of question 5",
      "option 2 of question 5",
      "option 3 of question 5",
      "option 4 of question 5sssssssssssss",
    ],
    correctAnswer: 0,
  },
];

function QuizUpdate({
  className,
  quizzez,
  chapterNumber,
  courseId,
  newQuizzHandler,
  closeHandler,
}) {
  const [allQuizzez, setAllQuizzez] = useState(!quizzez ? newQuizz : quizzez); // this for save all change of any quiz
  const [quizzNumber, setQuizzNumber] = useState(0); // this for save the current quizz showed
  const [correctOption, setCorrectOption] = useState(0); // this for the current opt of current quizz showed
  const [quizz, setQuizz] = useState(allQuizzez[quizzNumber]); // this of the current quizz
  // ? use effects part
  useEffect(() => {
    setQuizz(allQuizzez[quizzNumber]);
    setCorrectOption(allQuizzez[quizzNumber].correctAnswer);
  }, [quizzNumber]);
  useEffect(() => {
    setAllQuizzez((curr) => {
      const allq = curr;
      allq[quizzNumber] = quizz;
      return allq;
    });
  }, [quizz]);
  // ? handle input changes part
  function changeQuestion(ele) {
    setQuizz((curr) => {
      return { ...curr, question: ele.target.value };
    });
  }
  function changeOpt(ele, ind) {
    const value = ele.target.value;
    const allOpts = quizz.options;
    allOpts[ind] = value;
    setQuizz((curr) => {
      return { ...curr, options: allOpts };
    });
  }
  function changeCorrectOpt(index) {
    setCorrectOption(index);
    setQuizz((curr) => {
      return { ...curr, correctAnswer: index };
    });
  }
  function changeCurrentQuizz(index) {
    setQuizzNumber(index);
  }
  // ? submit function and validation
  function isvalidate() {
    if (!courseId) {
      errorNotifcation("course id is missing");
      return false;
    }
    if (chapterNumber < 0 || [undefined, null].includes(chapterNumber)) {
      errorNotifcation("chapter number is missing");
      return false;
    }
    for (let quiz of allQuizzez) {
      if (!quiz.question) {
        errorNotifcation("one of question of quizz is empty");
        return false;
      }
      for (let opt of quiz.options) {
        if (!opt) {
          errorNotifcation("one of options is misstin of quizz is empty");
          return false;
        }
      }
    }
    return true;
  }
  async function submitQuizzez() {
    const isValide = isvalidate();
    if (isValide) {
      const { status, data } = await updateQuize(
        allQuizzez,
        chapterNumber,
        courseId
      );
      if (status === 200) {
        successNotifcation("updated successfuly");
      } else if (status === 204) {
        console.log(allQuizzez);
        newQuizzHandler(allQuizzez, chapterNumber);
        successNotifcation("the quizz is saved until you submit his chapter");
      }
    }
  }
  // ? component part
  return (
    <div
      key={chapterNumber + "parent"}
      className={`w-full h-full absolute top-0 left-0 bg-black/50 place-items-center hidden ${className}`}
    >
      <div className="bg-white rounded-xl w-[90%] h-[90%] p-3">
        <div className="h-[40px] border-b border-gray-300 grid grid-cols-5 gap-2">
          {allQuizzez.map((_, ind) => (
            <p
              key={chapterNumber + "  " + ind}
              className={`text-center w-full h-full px-2 rounded-t-md duration-300 hover:bg-gray-300 cursor-pointer capitalize
                ${ind < 4 && "border-r"} ${
                ind === quizzNumber && "bg-gray-300"
              }`}
              onClick={() => changeCurrentQuizz(ind)}
            >{`quizz ${ind + 1}`}</p>
          ))}
        </div>
        {/* quistion */}
        <Input
          className="w-full my-4 pl-2"
          placeholder="Quistion"
          value={quizz.question}
          onChange={(e) => changeQuestion(e)}
        />
        {/* options + correctOne*/}
        {quizz.options.map((ele, ind) => (
          <div
            className="w-full mb-4 roudned-md px-2 flex items-center"
            key={"option" + ind}
          >
            <Input
              type="text"
              className="grow h-full rounded-md mr-2"
              value={ele}
              onChange={(e) => changeOpt(e, ind)}
            />
            <input
              onChange={() => changeCorrectOpt(ind)}
              type="checkBox"
              className=" w-5 h-full rounded-md border-b-0"
              checked={correctOption === ind}
            />
          </div>
        ))}
        {/* submit */}
        <div className="w-full flex mt-auto items-center justify-between">
          <Button
            type="button"
            size="lg"
            className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto bg-gray-300"
            onClick={(e) => submitQuizzez()}
          >
            update quizz
          </Button>
          <Button
            type="button"
            size="lg"
            className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto bg-gray-300"
            onClick={(e) => closeHandler()}
          >
            close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuizUpdate;
