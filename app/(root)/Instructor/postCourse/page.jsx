"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { CheckCircle, Plus, Minus, Upload } from "lucide-react";
import { createCourse } from "@/request/courses";
import { errorNotifcation } from "@/components/toast";
import { useRouter } from "next/navigation";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4"];

const videoFileSchema = z.object({
  name: z.string(),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 100MB"),
  type: z.enum(ACCEPTED_VIDEO_TYPES, "Only MP4 files are accepted"),
});

const chapterSchema = z.object({
  title: z.string().min(1, "Chapter title is required"),
  description: z.string().min(1, "Chapter description is required"),
  videoFile: videoFileSchema.optional(),
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
  price: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Price must be a number",
    }),
  duration: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Duration must be a number",
    }),
  isPublished: z.boolean().default(false),
  introduction: z.object({
    title: z.string().min(1, "Introduction title is required"),
    description: z.string().min(1, "Introduction description is required"),
    videoFile: videoFileSchema.optional(),
  }),
  chapters: z.array(chapterSchema).min(1, "At least one chapter is required"),
});

const PostCourse = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();
  const [uploadsFiles, setUploadsFiles] = useState({
    introduction: null,
    chapters: [],
    picture: null,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      duration: "",
      isPublished: false,
      introduction: {
        title: "",
        description: "",
        videoFile: undefined,
      },
      chapters: [
        {
          title: "",
          description: "",
          videoFile: undefined,
          quizzes: Array(5).fill({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
          }),
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "chapters",
  });
  const onSubmit = async (values) => {
    // Here you would typically send the form data to your backend
    setIsSubmitting(true);
    const course = form.getValues();
    delete course.introduction.videoFile;
    course.chapters = course.chapters.map((chapter) => {
      delete chapter.videoFile;
      return chapter;
    });
    if (
      !(
        uploadsFiles.introduction &&
        uploadsFiles.picture &&
        uploadsFiles.chapters.length === course.chapters.length
      )
    ) {
      errorNotifcation("Please upload all required files");
      return;
    }
    const handlefileUploading = [
      uploadsFiles.picture,
      uploadsFiles.introduction,
      ...uploadsFiles.chapters,
    ];
    const formData = new FormData();
    formData.append("course", JSON.stringify(course));
    handlefileUploading.forEach((file) => {
      formData.append(`uploadsFile`, file); // Each file gets a unique key
    });

    const { status, data } = await createCourse(formData);
    if (status === 201) {
      successNotifcation("Course created successfully");
      route.push("/instructor/MyCourses");
    } else if (status !== 10) {
      errorNotifcation(data.message);
    } else {
      errorNotifcation("Something went wrong, please try again later");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 font-gilroy">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create a New Course
      </motion.h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormLabel className="font-semibold">Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Choose a catchy title that describes your course.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Course Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter course description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Provide a detailed description of what students will learn.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500">
                    Choose the most relevant category for your course.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Course Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-gray-500">
                    Indicate the difficulty level of your course.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter course price"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-gray-500">
                    Set a fair price for your course content.
                  </FormDescription>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="introduction.picture"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    course picture{" "}
                    <span className="font-normal">(only images exe)</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="file"
                        accept="image/*"
                        id="picture"
                        onChange={(e) => {
                          const vedioFile = e.target.files[0];
                          if (vedioFile) {
                            setUploadsFiles((curr) => {
                              return { ...curr, picture: vedioFile };
                            });
                          }
                        }}
                        {...rest}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const fileInput = document.querySelector("#picture");
                          fileInput?.click();
                        }}
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  {value && (
                    <FormDescription className="text-gray-500">
                      {value.name}
                    </FormDescription>
                  )}
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </motion.div>

          {/* introduction */}
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
                      <FormLabel className="font-semibold">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter introduction title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="introduction.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter introduction description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="introduction.videoFile"
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Video File{" "}
                        <span className="font-normal">
                          (MP4 only, max 100MB)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Input
                            type="file"
                            accept="video/mp4"
                            id="introductionVedio"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                onChange(file);
                              }
                              const vedioFile = e.target.files[0];
                              if (vedioFile) {
                                setUploadsFiles((curr) => {
                                  return { ...curr, introduction: vedioFile };
                                });
                              }
                              console.log(form.getValues())
                            }}
                            {...rest}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const fileInput =
                                document.querySelector("#introductionVedio");
                              fileInput?.click();
                            }}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                      </FormControl>
                      {value && (
                        <FormDescription className="text-gray-500">
                          {value.name}
                        </FormDescription>
                      )}
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </motion.div>
          {/* Chapters */}
          <AnimatePresence>
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="mb-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Chapter {index + 1}</CardTitle>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
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
                      name={`chapters.${index}.videoFile`}
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel>
                            Video File (MP4 only, max 100MB)
                          </FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Input
                                type="file"
                                id={`chapters${index}videoFile`}
                                accept="video/mp4"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    onChange(file);
                                  }
                                  const vedioFile = e.target.files[0];
                                  const chapters = uploadsFiles.chapters;
                                  chapters[index] = vedioFile;
                                  if (vedioFile) {
                                    setUploadsFiles((curr) => {
                                      return { ...curr, chapters };
                                    });
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
                                    `#chapters${index}videoFile`
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
                    {/* Quizzes Section */}
                    <div className="mt-6">
                      <FormLabel className="text-base font-semibold">
                        Quizzes
                      </FormLabel>
                      <div className="space-y-4">
                        {[0, 1, 2, 3, 4].map((quizIndex) => (
                          <Accordion
                            key={quizIndex}
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem value={`quiz-${quizIndex}`}>
                              <AccordionTrigger>
                                Quiz {quizIndex + 1}
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="mt-4">
                                  <FormLabel>Question</FormLabel>
                                  <FormField
                                    control={form.control}
                                    name={`chapters.${index}.quizzes.${quizIndex}.question`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            placeholder="Enter question"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <div className="mt-2 space-y-2">
                                    {[0, 1, 2, 3].map((optionIndex) => (
                                      <FormField
                                        key={optionIndex}
                                        control={form.control}
                                        name={`chapters.${index}.quizzes.${quizIndex}.options.${optionIndex}`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormControl>
                                              <div className="flex items-center space-x-2">
                                                <Input
                                                  placeholder={`Option ${
                                                    optionIndex + 1
                                                  }`}
                                                  {...field}
                                                />
                                                <FormField
                                                  control={form.control}
                                                  name={`chapters.${index}.quizzes.${quizIndex}.correctAnswer`}
                                                  render={({
                                                    field: checkboxField,
                                                  }) => (
                                                    <FormItem>
                                                      <FormControl>
                                                        <Checkbox
                                                          checked={
                                                            checkboxField.value ===
                                                            optionIndex
                                                          }
                                                          onCheckedChange={() => {
                                                            checkboxField.onChange(
                                                              optionIndex
                                                            );
                                                          }}
                                                        />
                                                      </FormControl>
                                                    </FormItem>
                                                  )}
                                                />
                                              </div>
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full text-green-700 font-semibold border-green-700 hover:border-green-500 hover:text-green-500 hoverTransition"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  videoFile: undefined,
                  quizzes: Array(5).fill({
                    questions: [
                      { question: "", options: ["", "", ""], correctAnswer: 0 },
                    ],
                  }),
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" /> Add Chapter
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Button
              type="submit"
              size="lg"
              className="w-full  bg-green-700 font-semibold text-white hover:border-green-500 hover:bg-green-500 hoverTransition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting Course..." : "Post Course"}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
};

export default PostCourse;
