"use client"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react";

const Search = () => {

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearchClick = () => {
    // Perform search logic here
    console.log("Search clicked");

    // Navigate to search results page
    router.push(`/Search?query=${searchQuery}`);
  }

  return (
    <div className="relative w-full flex items-center justify-center mt-8">
      <div className="w-full md:w-2/3 lg:w-1/2 rounded-xl bg-white p-8 shadow-md">
        <h3 className="text-black font-extrabold text-xl mb-4">
          What do you want to learn?
        </h3>
        <div className="flex flex-col md:flex-row justify-around gap-4">
          <Input
            type="text"
            placeholder="Find courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearchClick}
            className="hoverTransition py-2 px-6 text-xs font-bold border-2 border-green-500 bg-green-500 text-white hover:bg-transparent hover:border-green-500 hover:text-green-500 rounded-2xl"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  )
}

export default Search