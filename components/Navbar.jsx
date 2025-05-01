"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, AvatarFallback, AvatarImage } from "/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

import { isLoggin, logOut } from "@/request/auth";
import { setState } from "@/redux/user";

import "@/styles/globals.css";
import logo from "../public/logo.png";
import { genProfileImg } from "@/public/avatars/avatar";
import { errorNotifcation } from "./toast";
import { Briefcase, Heart, Home, Plus, Search } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoggin: isLoged } = useSelector((s) => s.user);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, status } = await isLoggin();
      switch (status) {
        case 200:
          dispatch(setState(data.userinfo));
          break;
        case 10:
          errorNotifcation("catch error status 10");
        case 500:
          errorNotifcation("internal server error");
          setError(data.message);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("button")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLoginClick = () => {
    router.push("/auth/Login");
    setIsOpen(false);
  };

  const handleSignupClick = () => {
    router.push("/auth/Signup");
    setIsOpen(false);
  };

  const handleInstructorClick = () => {
    router.push("/Instructor");
  };

  const handleProfileClick = () => {
    router.push("/Account");
  };

  const handleFavClick = () => {
    router.push(`/dashboards/User?defTab=Favorite`);
  };

  const handleMyCoursesClick = () => {
    router.push(`/dashboards/User?defTab=all-courses`);
  };

  const handleLogoutClick = async () => {
    await logOut();
    dispatch(setState(null));
    router.push("/");
  };

  const handleServicesClick = () => {
    router.push("/Services");
  };

  const handleMyServicesClick = () => {
    router.push(`/dashboards/myServices`);
  };

  const handleAddCourseClick = () => {
    router.push("/Instructor/postCourse");
  };

  const handleMyProposalsClick = () => {
    router.push(`/dashboards/myProposals`);
  };

  const handleMyDashboardClick = () => {
    router.push(`/Instructor/myCourses`);
  };

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/Search?query=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  if (loading) {
    return (
      <nav className="flex items-center justify-between h-16 px-6 bg-[#003049] text-white">
        <div className="w-40">
          <Skeleton className="h-8 w-32 bg-gray-700" />
        </div>
        <div className="w-96">
          <Skeleton className="h-10 w-full rounded-full bg-gray-700" />
        </div>
        <div className="flex space-x-6">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-8 w-8 rounded-full bg-gray-700" />
        </div>
      </nav>
    );
  }

  if (Error) {
    return (
      <nav className="flex items-center justify-between h-16 px-6 bg-[#003049] text-white">
        <Link href="/" className="flex items-center">
          <Image
            src={logo || "/placeholder.svg"}
            alt="Edulink logo"
            height={32}
            width={32}
          />
          <span className="ml-2 text-xl font-bold">Edulink</span>
        </Link>
        <div className="text-white">
          Something went wrong. Please try again later.
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-[#003049] text-white">
      {/* Logo Section */}
      <Link href="/" className="flex items-center">
        <Image
          src={logo || "/placeholder.svg"}
          alt="Edulink logo"
          height={32}
          width={32}
        />
        <span className="ml-2 text-xl font-bold">Edulink</span>
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Find courses..."
            className="w-full bg-white text-black rounded-l-full pl-10 pr-4 h-10 focus-visible:ring-0 focus-visible:ring-offset-0 border-r-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <button
          onClick={handleSearchClick}
          className="h-10 bg-green-500 hover:bg-green-600 text-white px-4 rounded-r-full transition-colors text-sm font-medium"
        >
          Search
        </button>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-8">
        {/* Home Icon */}
        <button
          onClick={handleHomeClick}
          className="text-white hover:text-gray-300 transition-colors group relative"
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
          <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </button>

        {isLoged ? (
          <>
            {/* Favorites Icon */}
            <button
              onClick={handleFavClick}
              className="text-white hover:text-gray-300 transition-colors group relative"
              aria-label="Favorites"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Favorites
              </span>
            </button>

            {/* Services Hub & Add Course Icon */}
            {user.isteacher ? (
              <button
                onClick={handleAddCourseClick}
                className="text-white hover:text-gray-300 transition-colors group relative"
                aria-label="Add Course"
              >
                <Plus className="h-5 w-5" />
                <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Add Course
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleServicesClick}
                  className="text-white hover:text-gray-300 transition-colors group relative"
                  aria-label="Services Hub"
                >
                  <Briefcase className="h-5 w-5" />
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Services Hub
                  </span>
                </button>
                <Link
                  href={"/Services/postService"}
                  className="text-white hover:text-gray-300 transition-colors group relative"
                  aria-label="Add Service"
                >
                  <Plus className="h-5 w-5" />
                  <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Add Service
                  </span>
                </Link>
              </>
            )}

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="h-8 w-8 border border-white">
                    <AvatarImage src={genProfileImg(user?.picture)} />
                    <AvatarFallback>
                      {user?.username?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "example@temp.com"}
                  </p>
                </div>

                <DropdownMenuSeparator className="bg-gray-300 w-[95%] mx-auto" />

                <DropdownMenuItem
                  className="cursor-pointer hover:bg-slate-200 transition-colors"
                  onClick={handleProfileClick}
                >
                  My Profile
                </DropdownMenuItem>

                {user?.isteacher ? (
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={handleMyDashboardClick}
                  >
                    My Dashboard
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={handleMyCoursesClick}
                    >
                      My Courses
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={handleFavClick}
                    >
                      Favourite
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator className="bg-gray-300 w-[95%] mx-auto" />

                {!user?.isteacher && (
                  <>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={handleMyServicesClick}
                    >
                      My Services
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={handleMyProposalsClick}
                    >
                      My Proposals
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-slate-200 transition-colors"
                      onClick={handleServicesClick}
                    >
                      Services Hub
                    </DropdownMenuItem>

                    {!user?.isteacher && (
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-slate-200 transition-colors"
                        onClick={handleInstructorClick}
                      >
                        Become Instructor
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator className="bg-gray-300 w-[95%] mx-auto" />
                  </>
                )}

                <DropdownMenuItem
                  className="text-red-600 cursor-pointer hover:bg-slate-200 transition-colors"
                  onClick={handleLogoutClick}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {/* Login/Signup buttons for non-logged in users */}
            <button
              className="text-white hover:text-gray-300 transition-colors text-sm"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="bg-white text-black hover:bg-gray-200 transition-colors rounded-full px-4 py-1.5 text-sm font-medium"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
