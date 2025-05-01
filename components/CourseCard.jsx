"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Icons Imports
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// GUI imports
import Rating from "@mui/material/Rating";
import { Badge } from "@/components/ui/badge";
import CustomProgress from "@/components/CustomUI/Progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { setFavoriteCourse } from "@/request/courses";
import { toggleFavorite } from "@/redux/dashboard";
import { useDispatch } from "react-redux";
import { errorNotifcation, successNotifcation } from "./toast";

// Helper function to truncate the description of a course
function truncateDescription(description, MAX_DESCRIPTION_LENGTH) {
  return description.length > MAX_DESCRIPTION_LENGTH
    ? description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
    : description;
}

// Helper function to format a number with commas for readability
function formatNumber(number) {
  return number >= 1000 ? `${(number / 1000).toFixed(1)}k` : number.toString();
}
const CourseCard = ({ course, favIcon, menuIcon, completIcon }) => {
  const {
    title,
    username: creator,
    id: courseId,
    picture: imageUrl,
    description,
    discount: price,
    stars: { count: stars },
    price: oldPrice,
    progress,
    // isfavorite = false,
  } = course;
  console.log(course)
  const totalLectures = course.chapters.length;
  const PriceCond = Boolean(price && oldPrice);
  const dispatch = useDispatch();
  const router = useRouter();

  // HANDLERS

  // handle the click event on the course card
  const handleCourseClick = (e) => {
    // Navigate to the course page with the course's ID
    const role = e.target.parentElement.getAttribute("role");
    if (role === "menuitem") return;

    // Example: router.push(`/course/${course.id}`);
    router.push(`/Courses/${courseId}`);
  };

  // Handle Reset progress click
  const handleResetClick = () => {
    // Reset the progress of the course
    console.log("Reset progress clicked!");
  };

  // Handle add to favorite click
  const handleFavClick = async () => {
    // Remove the course
    const { status, data } = await setFavoriteCourse(courseId);
    switch (status) {
      case 200:
        successNotifcation(data.message);
        dispatch(toggleFavorite(course));
        break;
      case 10:
        errorNotifcation("error with status 10");
        break;
      default:
        errorNotifcation(data.message);
    }
  };

  // Handle Remove click
  const handleRemoveClick = () => {
    // Remove the course
    console.log("Remove course clicked!");
  };

  return (
    <div
      onClick={handleCourseClick}
      className="max-w-sm font-gilroy bg-white overflow-hidden w-[285px] cursor-pointer  "
    >
      <div className="relative rounded-[23] w-full overflow-hidden ">
        {PriceCond && (
          <div className="absolute flex flex-row">
            <Badge className="text-white text-[8px] font-gilroy font-extrabold rounded-2xl m-2 bg-green-500 p-[2px]">
              Best Seller
            </Badge>
            {/* Get Discount */}
            <Badge className="text-white text-[8px] font-gilroy font-extrabold rounded-2xl my-2 bg-purple-700 p-[2px]">
              {(((oldPrice - price) / oldPrice) * 100).toFixed(0)}% OFF
            </Badge>
          </div>
        )}

        {completIcon && (
          <div className="absolute top-0 right-0">
            <div className="h-6 w-6 bg-white bg-opacity-30 mt-2 mr-2 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="h-full w-full" htmlColor="green" />
            </div>
          </div>
        )}

        {favIcon && (
          <div className="absolute top-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-6 w-6 bg-white bg-opacity-30 mt-2 mr-2 rounded-full">
                <FavoriteIcon htmlColor="red" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-slate-200"
                  onClick={handleFavClick}
                >
                  <RemoveCircleIcon htmlColor="red" />
                  <span className="text-red-900 font-gilroy font-bold">
                    Remove from Liked
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {menuIcon && (
          <div className="absolute top-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="h-6 w-6 bg-white bg-opacity-30 mt-2 mr-2 rounded-full flex items-center justify-center">
                <MoreVertIcon htmlColor="#705741" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-slate-200"
                  onClick={handleResetClick}
                >
                  <RotateLeftIcon />
                  <span>Reset progress</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-slate-200"
                  onClick={handleFavClick}
                >
                  <FavoriteIcon htmlColor="red" />
                  <span>Add to favorite</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <Image
          src={imageUrl}
          alt={title || "banner"}
          width={0}
          height={0}
          sizes="100%"
          className="w-full h-full object-cover"
        />
      </div>

      {progress && (
        <CustomProgress
          value={progress.chapterNumber}
          max={totalLectures}
          className="my-1"
        />
      )}

      {title && <h2 className="text-base font-bold">{title}</h2>}

      {creator && (
        <div className="flex items-center">
          <PersonOutlineIcon className="h-4 w-4 fill-gray-400" />
          <span className="text-sm font-gilroy font-thin pl-1 text-gray-400">
            {creator}
          </span>
        </div>
      )}

      {progress && totalLectures && (
        <div className="flex items-center">
          <span className="text-sm font-gilroy font-medium pl-1 text-gray-600">
            {progress.chapterNumber}/{totalLectures} video completed
          </span>
        </div>
      )}

      {description && (
        <p className="text-sm font-gilroy font-normal text-gray-500">
          {truncateDescription(description, 100)}
        </p>
      )}

      {Boolean(stars && view) && (
        <div className="flex items-center">
          <Rating
            className="opacity-50"
            name="Rating"
            value={stars}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="text-sm text-gray-500">({formatNumber(view)})</span>
        </div>
      )}

      {PriceCond && (
        <div className="flex items-center justify-start gap-1">
          <span className="text-xl font-gilroy font-semibold text-black">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${oldPrice.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
