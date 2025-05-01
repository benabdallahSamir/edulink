import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Home, Search, FileQuestion } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">
            <Search className="mr-2 h-4 w-4" /> Search Services
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/faq">
            <FileQuestion className="mr-2 h-4 w-4" /> FAQ
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound

