"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Minus, Upload } from "lucide-react";
import {
  deleteCourseChapter,
  getCourse,
  updateChapterCourse,
  updateCourse,
  updateIntorductinoCourse,
} from "@/request/courses";
import { errorNotifcation, successNotifcation } from "@/components/toast";
import QuizUpdate from "@/components/QuizUpdate";

const MAX_FILE_SIZE = 100 * 1024 * 1024;
const ACCEPTED_VIDEO_TYPES = ["video/mp4"];

const linkSchema = z.object({
  name: z.string(),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 100MB"),
  type: z.enum(ACCEPTED_VIDEO_TYPES, "Only MP4 files are accepted"),
});

const chapterSchema = z.object({
  title: z.string().min(1, "Chapter title is required"),
  description: z.string().min(1, "Chapter description is required"),
  link: linkSchema.optional(),
});

const formSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }),
  category: z.string().min(1, { message: "Please select a category" }),
  level: z.string().min(1, { message: "Please select a level" }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a number",
  }),
  visible: z.boolean().default(false),
  introduction: z.object({
    title: z.string().min(1, "Introduction title is required"),
    description: z.string().min(1, "Introduction description is required"),
    link: linkSchema.optional(),
  }),
  chapters: z.array(chapterSchema).min(1, "At least one chapter is required"),
});
const EditCourse = () => {
  const [course, setCourse] = useState(false);
  const route = useRouter();
  const [newQuizzes, setNewQuizzes] = useState({});
  const { id: courseId } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      visible: false,
      introduction: {
        title: "",
        description: "",
        link: undefined,
      },
      chapters: [
        {
          title: "",
          description: "",
          link: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "chapters",
  });
  async function deleteChapter(chapterNumber) {
    const { status, data } = await deleteCourseChapter(chapterNumber, courseId);
    if (status === 200) {
      successNotifcation("chapter deleted successufuly");
    } else if (status !== 204) {
      errorNotifcation(data.message);
    }
  }

  useEffect(() => {
    (async function () {
      const { status, data } = await getCourse(courseId);
      if (status === 404) {
        route.push("/Instructor/myCourses");
        return;
      }
      // setCourse(data.course);
      setCourse(data.course);
      form.reset({
        title: data.course.title,
        description: data.course.description,
        category: data.course.category,
        level: data.course.level,
        price: data.course.price,
        visible: data.course.visible,
        introduction: {
          title: data.course.introduction.title,
          description: data.course.introduction.description,
          link: data.course.introduction.link,
        },
        chapters: data.course.chapters,
      });
    })();
  }, [courseId, form]);

  // ! handle part
  async function handleIntroduction(e) {
    let { title, description, link } = form.getValues("introduction");
    e.target.disabled = true;
    e.target.innerText = "Updating Course...";
    if (typeof link === "string") link = null;
    const formData = new FormData();
    formData.append("link", link);
    formData.append("title", title);
    formData.append("description", description);
    const { status, data } = await updateIntorductinoCourse(formData, courseId);
    if (status === 200) successNotifcation("course Updated successfuly");
    else errorNotifcation(data.message);
    e.target.disabled = false;
    e.target.innerText = "Update Course";
  }
  async function handleCourseInformatino(e) {
    const { title, description, category, level, price, visible } =
      form.getValues();
    e.target.disabled = true;
    e.target.innerText = "Updating Course...";
    const { status, data } = await updateCourse(
      {
        title,
        description,
        category,
        level,
        price,
        visible,
      },
      courseId
    );
    if (status === 200) {
      form.reset(data.course);
      successNotifcation("course updated successfuly");
    } else {
      errorNotifcation(data.message);
    }

    e.target.disabled = false;
    e.target.innerText = "Update Course";
  }
  async function quizzesHandler(quizzes, chapterNumber) {
   
    if (course.chapterNumber > chapterNumber) return;
    setNewQuizzes((prev) => {
      return { ...prev, [chapterNumber]: quizzes };
    });
  }
  async function handleChapter(chapterNumber, e) {
    let { title, description, link } =
      form.getValues("chapters")[chapterNumber];
    e.target.disabled = true;
    e.target.innerText = "Updating Course...";
    if (typeof link === "string") link = null;
    const formData = new FormData();
    formData.append("link", link);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("chapterNumber", chapterNumber);

    if (newQuizzes[chapterNumber]) {
      formData.append("quizzes", JSON.stringify(newQuizzes[chapterNumber]));
    }
    const { status, data } = await updateChapterCourse(formData, courseId);
    if (status === 200) {
      successNotifcation("course Updated successfuly");
    } else errorNotifcation(data.message);
    e.target.disabled = false;
    e.target.innerText = "Update Course";
  }
  async function handleQuizzesView(index) {
    const ele = document.querySelector(".QuizUpdate" + index);
    ele.classList.toggle("grid");
    ele.classList.toggle("hidden");
  }
  // ! handle part end
  if (!course) return <p>loading</p>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Edit Course
      </motion.h1>
      <Form {...form}>
        <form className="space-y-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a catchy title that describes your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description of what students will learn.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the most relevant category for your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Indicate the difficulty level of your course.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter course price"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set a fair price for your course content.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FormField
              control={form.control}
              name="visible"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish immediately</FormLabel>
                    <FormDescription>
                      If unchecked, your course will be saved as a draft.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button
              type="button"
              size="lg"
              className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto mx-auto bg-gray-300"
              onClick={handleCourseInformatino}
            >
              Update Course
            </Button>
          </motion.div>
          {/* end part one */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="introduction.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter introduction title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="introduction.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter introduction description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="introduction.link"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Video File (MP4 only, max 100MB)</FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="video/mp4"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                            }}
                            {...rest}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const fileInput = document.querySelector(
                                'input[name="introduction.link"]'
                              );
                              fileInput?.click();
                            }}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      {value && <FormDescription>{value.name}</FormDescription>}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  size="lg"
                  className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto mx-auto bg-gray-300"
                  onClick={handleIntroduction}
                >
                  Update Course
                </Button>
              </CardContent>
            </Card>
          </motion.div>
          {/* introduction end */}
          <AnimatePresence>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <QuizUpdate
                  closeHandler={() => handleQuizzesView(index)}
                  newQuizzHandler={quizzesHandler}
                  courseId={courseId}
                  chapterNumber={index}
                  key={"dmhsfhezoihmds" + field.id}
                  className={"QuizUpdate" + index}
                  quizzez={course.chapters[index]?.quizzes}
                />
                <Card className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Chapter {index + 1}</CardTitle>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          remove(index);
                          deleteChapter(index);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name={`chapters.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter chapter title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`chapters.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter chapter description"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`chapters.${index}.link`}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel>
                            Video File (MP4 only, max 100MB)
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="file"
                                accept="video/mp4"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                  }
                                }}
                                {...rest}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  const fileInput = document.querySelector(
                                    `input[name="chapters.${index}.link"]`
                                  );
                                  fileInput?.click();
                                }}
                              >
                                <Upload className="h-4 w-4" />
                              </Button>
                            </div>
                          </FormControl>
                          {value && (
                            <FormDescription>{value.name}</FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center mt-auto justify-between px-2 w-full">
                      <Button
                        type="button"
                        size="lg"
                        className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto bg-gray-300"
                        onClick={(e) => handleChapter(index, e)}
                      >
                        Update Course
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        className="duration-300 hover:bg-green-300 hover:text-white px-3 w-auto bg-gray-300"
                        onClick={(e) => handleQuizzesView(index)}
                      >
                        view quizzes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {/* chapters part end */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() =>
                append({ title: "", description: "", link: undefined })
              }
            >
              <Plus className="mr-2 h-4 w-4" /> Add Chapter
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default EditCourse;
