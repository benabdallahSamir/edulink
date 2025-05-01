"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { myProposal } from "@/request/marketPlace";
import { useEffect, useState } from "react";
import { errorNotifcation } from "@/components/toast";

// This would typically come from a database
// This would typically come from a database

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);
  useEffect(() => {
    (async function () {
      const { status, data } = await myProposal();
      if (status === 200) {
        setProposals(data.offers);
        console.log(data)
      } else {
        errorNotifcation(data.message);
      }
    })();
  }, []);
  return (
    <div className="container font-gilroy mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Proposals
      </motion.h1>
      <div className="space-y-6">
        {proposals.map((proposal, index) => (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {proposal.service.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted on {proposal.createdAt}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-green-600 font-semibold mb-2">
                      {proposal.service.budget}
                    </span>
                    <Badge
                      variant={
                        proposal.progressing.progress === "approved"
                          ? "success"
                          : proposal.progressing.progress === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className={`capitalize font-gilroy font-semibold text-xs ${
                        proposal.progressing.progress === "approved"
                          ? "bg-green-500 text-white"
                          : proposal.progressing.progress === "rejected"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-gray-100"
                      }`}
                    >
                      {proposal.progressing.progress.charAt(0).toUpperCase() +
                        proposal.progressing.progress.slice(1)}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-700">{proposal.message}</p>
                {proposal.progressing.progress === "approved" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 border border-green-200 rounded p-4 my-4"
                  >
                    <p className="text-green-800 font-semibold mb-2">
                      Approved on {proposal.progressing.date}
                    </p>
                    <p className="text-green-700">
                      You will be contacted via email shortly to complete the
                      service arrangement. Please check your inbox for further
                      instructions.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyProposals;
