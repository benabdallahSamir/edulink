'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation'

import { getServices } from "@/request/marketPlace";

import { errorNotifcation } from "@/components/toast.js";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


const Services = () => {

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const [services, setServices] = useState([]);
  console.log(services)
  useEffect(() => {
    (async function () {
      const { status, data } = await getServices();
      switch (status) {
        case 200:
          setServices(data.services);
          break;
        case 204:
          break;
        case 500:
          errorNotifcation(data.message);
          break;
        default:
          errorNotifcation("error with code 10");
      }
      setLoading(false);
    })();
  }, []);
  
  const handlePostClick = () => {
    // Add functionality to redirect to a new page for service proposal
    // if the user is logged in, otherwise redirect to the Proposal page
    router.push("/Services/postService");
    // if the user is not logged in, show a signup prompt
  }

  if (loading) {
    
  }


  return (
    
    <div className="flex flex-col grow container mx-auto p-4 font-gilroy my-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Available Services
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {loading ?
        Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full ">
              <CardHeader className="space-y-2">
                <Skeleton className="bg-gray-200 h-8 w-3/4" />
                <Skeleton className="bg-gray-200 h-4 w-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="bg-gray-200 h-6 w-24 rounded-full" />
                  <Skeleton className="bg-gray-200 h-6 w-16" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="bg-gray-200 h-4 w-32" />
                  <Skeleton className="bg-gray-200 h-4 w-24" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="bg-gray-200 h-6 w-24 rounded-full" />
                  <Skeleton className="bg-gray-200 h-6 w-20 rounded-full" />
                  <Skeleton className="bg-gray-200 h-6 w-16 rounded-full" />
                  <Skeleton className="bg-gray-200 h-6 w-20 rounded-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="bg-gray-200 h-10 w-full" />
              </CardFooter>
            </Card>
          )
        )
        : services.map((srv, index) => (
          <motion.div
            key={srv.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6 flex flex-col w-full h-full">
              <h3 className="text-xl font-semibold mb-2">{srv.title}</h3>
              <p className="text-gray-600 mb-4">{srv.description}</p>
              <div className="flex justify-between items-center mb-4 mt-auto">
                <div className="flex items-center gap-2">
                  <Badge className='bg-green-500 text-white font-gilroy font-semibold capitalize'>{srv.level}</Badge>
                  <span className="text-sm font-medium text-green-600">{srv.budget}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {srv.location && (
                    <>
                      <span>{srv.location}</span> •
                    </>
                  )}
                  <span>{srv.createdAt}</span>
                </div>
              </div>
              {srv.tags.length && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {srv.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="font-gilroy">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <Link href={`/Services/Service/${srv.id}`}>
                <Button className="w-full bg-green-500 text-white">View Details</Button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="text-center fixed w-max bottom-5 shadow-lg left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        
      </motion.div>
    </div>
  )
}

export default Services