import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Enterprise CRM Platform
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Comprehensive client relationship management solution for businesses of all sizes
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto">
              Login to Dashboard
            </Button>
          </Link>
          <Link href="/crm/clients">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore CRM Features
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}