'use client'

import { Mail, Phone } from 'lucide-react'

const ContactInfo = () => {
    return (
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-[95%] sm:w-[90%] max-w-[700px] mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Have questions? Contact us directly!</h2>
          <div className="space-y-2 sm:space-y-1">
            <div className="flex items-center">
              <Mail className="mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-900" />
              <a href="mailto:support@example.com" className="text-sm sm:text-base text-gray-900 hover:underline">
                support@example.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="mr-3 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 text-gray-900" />
              <a href="tel:+1234567890" className="text-sm sm:text-base text-gray-900 hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </div>
    )
}

export default ContactInfo