'use client'

import { notFound, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect } from "react";
import Loading from "@/app/(root)/Courses/[courseId]/Loading";
import { addOffer, getServiceById } from "@/request/marketPlace";
import { errorNotifcation, successNotifcation } from "@/components/toast";
import { useSelector } from "react-redux";



const ServicePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {isLoggin} = useSelector(s=>s.user);
  const [service, setService] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async function () {
      const { status, data } = await getServiceById(id);
      switch (status) {
        case 404:
          notFound();
          break;
        case 200:
          setService(data.service);
          break;
        case 10:
          errorNotifcation("error code with 10");
          break;
        default:
          errorNotifcation(data.message);
      }
    })();
  }, [refresh]);

  if (!service) return <Loading />;

  async function applyForService(formData) {

    // if is not loged ==> redirect to Sign up page
    if (!isLoggin) {
      router.push("/auth/Login");
      return ;
    }
    
    // if is loged ==> add proposal to service
    const {status, data} = await addOffer(Object.fromEntries(formData));

    switch (status) {
      case 200 : 
        successNotifcation(data.message);
        setRefresh(curr=>!curr);
        break; 
      case 10 :
        errorNotifcation("error woth code 10");
        break; 
      default : 
        errorNotifcation(data.message);
    }
    
  }

  return (
    <div className="w-full max-w-[700px] px-4 sm:px-6 mx-auto font-gilroy my-4 sm:my-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          {service.title}
        </h1>
        <p className="text-gray-600 mb-4 sm:mb-6">{service.description}</p>
        <div className="bg-gray-100 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500 text-white font-gilroy font-semibold capitalize">
                {service.level}
              </Badge>
              <span className="text-sm font-medium text-green-600">
                {service.budget}
              </span>
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              {service.location && (
                <>
                  <span>{service.location}</span> •
                </>
              )}
              <span>{` ${service.createdAt}`}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {service.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-green-500 capitalize font-gilroy text-xs sm:text-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 font-gilroy">
            <span className="font-semibold">{service.offers.length}</span> proposal
            {service.offers.length > 1 ? "s" : ""} received
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 font-gilroy">
          Apply for this Service
        </h2>
        <form
          action={applyForService}
          className="space-y-3 sm:space-y-4 font-gilroy"
        >
          <input type="hidden" name="serviceId" value={service.id} />
          <div>
            <label
              htmlFor="name"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              required
              className="text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your.email@example.com"
              required
              className="text-sm sm:text-base"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe why you're the best fit for this service..."
              required
              className="text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full font-semibold font-gilory hover:bg-green-400 hoverTransition bg-green-500 text-white text-sm sm:text-base"
          >
            Submit Application
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ServicePage;
