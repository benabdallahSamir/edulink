'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <div className="relative bg-[url('../public/BackgroundIns.png')] text-white overflow-hidden">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl relative z-10"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                Share Your Knowledge, Inspire Students!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl md:text-2xl mb-8"
              >
                Join our platform and start teaching today!
              </motion.p>
            </motion.div>
          </div>
          <Image
            src="/placeholder.svg?height=600&width=1920"
            alt="Teaching illustration"
            width={1920}
            height={600}
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-transparent backdrop-blur-sm opacity-75"
          />
        </div>
      )
}

export default HeroSection