'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/HeroSection'
import AppForm from '@/components/appForm'
import ContactInfo from '@/components/contactInfo'

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Instructor = () => {
  const { user, isLoggin: isLoged } = useSelector((s) => s.user);
  const router = useRouter();

  // !isLoged && router.push("/auth/Signup");  

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="space-y-12">
          <AppForm />
          <ContactInfo />
        </div>
      </motion.main>
    </div>
  )
};

export default Instructor;
