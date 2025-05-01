"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useParams } from "next/navigation";
import { errorNotifcation, successNotifcation } from "@/components/toast";
import Loading from "@/app/(root)/Courses/[courseId]/Loading";
import { approvedOffer, getServiceById } from "@/request/marketPlace";

// This would typically come from a database

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  console.log(service);
  useEffect(() => {
    (async function () {
      const { status, data } = await getServiceById(id);
      switch (status) {
        case 200:
          setService(data.service);
          break;
        case 404:
          notFound();
        default:
          errorNotifcation(data.message);
      }
    })();
  }, [id]);
  const [approvedProposal, setApprovedProposal] = useState(null);

  if (!service) {
    return <Loading />;
  }

  const handleApprove = async (proposalId) => {
    const { status, data } = await approvedOffer(id, proposalId);
    switch (status) {
      case 200:
        successNotifcation(data.message);
        setApprovedProposal(proposalId);
        break;
      case 10:
        errorNotifcation("error with code 10");
        break;
      default:
        errorNotifcation(data.message);
    }
    // Here you would typically update the database
    console.log(`Approved proposal ${proposalId} for service ${service.id}`);
    // You would also update the state to reflect the change in the UI
  };

  return (
    <div className="container font-gilroy mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {service.title}
      </motion.h1>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-md mb-4">{service.description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
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
            <span>{service.createdAt}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Proposals ({service.offers.length})
        </h2>
        <div className="space-y-4">
          {service.offers.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {proposal.user.username}
                  </h3>
                  <p className="text-gray-600 mb-2">{proposal.user.email}</p>
                  <p className="mb-4">{proposal.message}</p>
                  {approvedProposal === proposal.id ? (
                    <Button
                      disabled={true}
                      className="bg-green-500 text-white text-bold"
                    >
                      Approved
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleApprove(proposal.id)}
                      disabled={approvedProposal !== null || proposal.progressing.progress === "rejected" }
                      className="hover:bg-green-500 hover:text-white hoverTransition"
                    >
                      Approve
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;
