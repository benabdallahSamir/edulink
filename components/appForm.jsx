'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

const AppForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      setIsSubmitted(true)
    }
  
    if (isSubmitted) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4 text-green-600">Application Submitted!</h2>
          <p className="text-gray-600 text-lg">Thank you for applying! We'll review your application and contact you shortly.</p>
        </motion.div>
      )
    }
  
    return (
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg w-[80%] max-w-[700px] mx-auto font-gilroy"
      >
        <h2 className="text-3xl font-bold mb-8 text-green-500">Apply to Become an Instructor</h2>
        <div className="space-y-2">
          <div>
            <Label htmlFor="fullName" className="text-md text-gray-600">Full Name</Label>
            <Input 
              id="fullName" 
              name="fullName" 
              placeholder="Enter your full name" 
              required 
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-md text-gray-600">Email Address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="example@email.com" 
              required 
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-md text-gray-600">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel" 
              placeholder="+213 XXX XXX XXX" 
              required 
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="expertise" className="text-md text-gray-600">Subject(s) or Expertise Area</Label>
            <Input 
              id="expertise" 
              name="expertise" 
              placeholder="e.g. Mathematics, Physics, Programming" 
              required 
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="about" className="text-md text-gray-600">About You</Label>
            <Textarea 
              id="about" 
              name="about" 
              rows={4} 
              placeholder="Tell us about your teaching experience and qualifications..." 
              required 
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="resume" className="text-md text-gray-600">Resume or Portfolio (Optional)</Label>
            <Input 
              id="resume" 
              name="resume" 
              type="file" 
              accept=".pdf,.doc,.docx" 
              className="mt-1" 
            />
          </div>
            <Button type="submit" className="w-full text-lg py-6 bg-green-500 text-white hoverTransition hover:bg-green-400" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Apply Now'
              )}
            </Button>
        </div>
      </motion.form>
    )
}

export default AppForm