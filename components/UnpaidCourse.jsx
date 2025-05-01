"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buyNewCourse, setFavoriteCourse } from "@/request/courses";
import page  from "@/public/page.svg";
import lect  from "@/public/lecture.svg";
import lang  from "@/public/langSound.svg";
import screen  from "@/public/screen.svg";
import { genProfileImg } from "@/public/avatars/avatar";
import { errorNotifcation, successNotifcation } from "./toast";

const UnpaidCourse = ({ course,setRefresh , review }) => {

  const [favorite, setFavorite] = useState(course.isFavorite);
  const handleFavorite = async () => {
    const { status, data } = await setFavoriteCourse(course.id);
    switch (status) {
      case 200:
        successNotifcation(data.message);
        setFavorite((prev) => !prev);
        break;
      case 500:
        break;
      case 10:
        break;
      default:
        errorNotifcation(data.message);
    }
    if (status === 200) {
    }
  };

  const handleBuyClick = async () => {
    const { status, data } = await buyNewCourse(course.id);
    switch (status) {
      case 200:
        successNotifcation(data.message);
        setRefresh(true);
        break;
      case 10:
        errorNotifcation("error with status 500");
        break;
      default:
        errorNotifcation(data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative aspect-video bg-black mb-6 rounded-3xl overflow-hidden">
            <video className="w-full h-full" poster={course.picture} controls>
              <source
                src={course.introduction.link}
                type="video/mp4"
              />
            </video>
          </div>

          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 font-gilory">
              {course.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={genProfileImg(course.userPicture)}
                    alt={course.username}
                  />
                  <AvatarFallback>course.username.subString(0,2)</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-[#3DCBB1]">
                    {course.username}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {course.category}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* About Course */}
          <div className="mb-8">
            <h2 className="text-md font-bold mb-1">About Course</h2>
            <p className="text-sm text-gray-500 font-normal">
              {course.description}
            </p>
          </div>

          {/* Reviews */}
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
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="mb-4">
                  <div className="flex items-center justify-start mb-2">
                    <span className="text-2xl font-bold">
                      US${course.discount > 0 ? course.discount : course.amount}
                    </span>
                    {course.discount > 0 && (
                      <span className="text-gray-500 line-through ml-2 font-semibold text-gray">
                        $course.amount
                      </span>
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-white text-md font-gilroy font-semibold rounded-[2px] bg-[#A04AE3] px-2"
                  >
                    20% OFF
                  </Badge>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-[#3DCBB1] rounded-xl text-white hoverTransition hover:bg-[#3DCB11]"
                    size="lg"
                    onClick={handleBuyClick}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hoverTransition rounded-xl"
                    size="lg"
                    onClick={handleFavorite}
                  >
                    {favorite ? (
                      <>
                        <Heart fill="red" className="mr-2 h-4 w-4" />
                        Remove from Favorite
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Add to Favorite
                      </>
                    )}
                  </Button>
                </div>
                {/* Course Stats */}
                <div className="grid grid-row-2 md:grid-row-4 gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <Image src={page} alt="page" width="20px" height="20px" />
                    <p className="text-md text-muted-foreground">{course.chapterNumber} Section</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={lect} alt="lect" width="20px" height="20px" />
                    <p className="text-sm text-muted-foreground">
                      {course.chapterNumber} Lectures
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={screen}
                      alt="screen"
                      width="20px"
                      height="20px"
                    />
                    <p className="text-sm text-muted-foreground">
                      21h 33m total lenghts
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image src={lang} alt="lang" width="20px" height="20px" />
                    <p className="text-sm text-muted-foreground">English</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnpaidCourse;
