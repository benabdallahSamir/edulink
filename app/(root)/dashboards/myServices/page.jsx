'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {useState , useEffect} from "react"
import { errorNotifcation } from '@/components/toast'
import { myServices } from '@/request/marketPlace'
// Mock data (would typically come from a database)


const MyServices = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await myServices();
      console.log(data);
      switch (status) {
        case 200:
          setServices(data.services);
          break;
        case 204:
          setServices([]);
          break;
        case 10:
          errorNotifcation("error code with 10");
          break;
        default:
          errorNotifcation(data.message);
      }
    })();
  }, []);
  return (
    <div className="w-[95%] md:w-[90%] max-w-[1200px] font-gilroy mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Posted Services
      </motion.h1>
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white flex flex-row sm:flex-row items-start sm:items-center p-4 sm:p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex-grow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-green-500 text-white font-gilroy font-semibold capitalize sm:text-sm"
                  >
                    {service.level}
                  </Badge>
                  <span className="text-sm font-medium text-green-600">
                    {service.budget}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  <span>{service.location}</span> • <span>{service.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs sm:text-sm"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {service.offers.length} proposal{service.offers.length > 1 ? "s" : ""}
              </div>
            </div>
            <Link
              href={`/dashboards/myServices/${service.id}`}
              className="mt-4 sm:mt-0 sm:ml-4"
            >
              <Button className="text-xs font-semibold font-gilory bg-green-500 hover:bg-green-400 hoverTransition text-white sm:text-sm py-1 sm:py-2 px-2 sm:px-4">
                View Proposals
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default MyServices
