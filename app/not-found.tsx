"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Home, Search, ArrowLeft, Utensils, Pizza, Coffee } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

/**
 * Custom 404 Not Found page for FoodSwipe
 * Features:
 * - Playful food-themed animations
 * - Interactive floating food icons
 * - Helpful navigation options
 * - Mobile-responsive design
 * - Performance optimized animations
 */
export default function NotFound() {
  const router = useRouter()

  // Floating animation for food icons
  const floatingAnimation = {
    y: [-10, 10, -10],
    rotate: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      
    },
  }

  // Bounce animation for the 404 text
  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      
    },
  }

  // Stagger animation for buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background floating food icons */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <motion.div className="absolute top-20 left-20 text-orange-500" animate={floatingAnimation}>
          <Pizza className="h-16 w-16" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-32 text-amber-600"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        >
          <Coffee className="h-12 w-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-red-500"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        >
          <Utensils className="h-14 w-14" />
        </motion.div>
      </div>

      <Card className="max-w-2xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8 sm:p-12 text-center">
          {/* Animated 404 with chef hat */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <div className="relative inline-block">
              <motion.h1
                className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text"
                animate={bounceAnimation}
              >
                404
              </motion.h1>
              {/* Chef hat on the "0" */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4"
                animate={{
                  rotate: [-5, 5, -5],
                  transition: { duration: 3, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <ChefHat className="h-12 w-12 text-orange-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Error message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Oops! This dish isn't on our menu
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Looks like you've wandered into uncharted culinary territory. Let's get you back to the good stuff!
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/dashboard">
                  <Home className="h-5 w-5 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 bg-transparent"
              >
                <Link href="/search">
                  <Search className="h-5 w-5 mr-2" />
                  Search for Food
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.back()}
                className="w-full sm:w-auto text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </motion.div>
          </motion.div>

          {/* Fun fact */}
          <motion.div
            className="mt-12 p-6 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">
              💡 Fun fact: The average person makes 35,000 food decisions per day. Let FoodSwipe make them easier for
              you!
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
