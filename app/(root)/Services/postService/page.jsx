"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addService } from "@/request/marketPlace";
import { errorNotifcation, successNotifcation } from "@/components/toast";

const PostService = () => {
  async function postService(formData) {
    // Here you would typically save the data to a database
    const { status, data } = await addService(Object.fromEntries(formData));
    switch (status) {
      case 201:
        successNotifcation(data.message);
        break;
      case 10:
        errorNotifcation("error with code 10");
        break;
      default:
        errorNotifcation(data.message);
    }

    console.log("Service posted:", Object.fromEntries(formData));
  }

  return (
    <div className="min-w-[600px] mx-4 my-8">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Post a New Service
      </motion.h1>
      <motion.form
        action={postService}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="e.g. Need Python Programming Tutor"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the service you need in detail..."
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="difficulty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Difficulty Level
            </label>
            <Select name="level" required>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-white ">
                <SelectItem
                  value="entry-level"
                  className="hover:bg-gray-200 hoverTransition cursor-pointer"
                >
                  Entry-level
                </SelectItem>
                <SelectItem
                  value="intermediate"
                  className="hover:bg-gray-200 hoverTransition cursor-pointer"
                >
                  Intermediate
                </SelectItem>
                <SelectItem
                  value="expert"
                  className="hover:bg-gray-200 hoverTransition cursor-pointer"
                >
                  Expert
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Budget
            </label>
            <Input
              type="text"
              id="budget"
              name="budget"
              placeholder="e.g. 1000 DZD per hour"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Location
          </label>
          <Input
            type="text"
            id="location"
            name="location"
            placeholder="e.g. Remote or City, Country"
            required
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tags (comma-separated)
          </label>
          <Input
            type="text"
            id="tags"
            name="tags"
            placeholder="e.g. programming, python, beginner"
            required
          />
        </div>
        <Button
          type="submit"
          className="px-4 font-semibold mx-auto block font-gilory bg-green-500 hover:bg-green-400 hoverTransition text-white"
        >
          Post Service
        </Button>
      </motion.form>
    </div>
  );
};

export default PostService;
