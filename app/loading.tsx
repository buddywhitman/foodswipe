"use client"

import { motion } from "framer-motion"
import { ChefHat, Pizza, Coffee, Utensils, Heart } from "lucide-react"

/**
 * Global loading screen component for FoodSwipe app
 * Features:
 * - Food-themed animations with floating icons
 * - Pulsing chef hat logo with gradient effects
 * - Smooth transitions and micro-interactions
 * - Optimized for performance with reduced motion preferences
 * - Mobile-responsive design
 */
export default function Loading() {
  // Floating food icons animation variants
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        
      },
    },
  }

  // Staggered animation for food icons
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  // Chef hat pulsing animation
  const chefHatVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        
      },
    },
  }

  // Loading text animation
  const textVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        
      },
    },
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background floating food icons */}
      <motion.div
        className="absolute inset-0 overflow-hidden opacity-10"
        variants={containerVariants}
        animate="animate"
      >
        {/* Floating Pizza */}
        <motion.div
          className="absolute top-20 left-20 text-orange-500"
          variants={floatingVariants}
          style={{ animationDelay: "0s" }}
        >
          <Pizza className="h-12 w-12" />
        </motion.div>

        {/* Floating Coffee */}
        <motion.div
          className="absolute top-40 right-32 text-amber-600"
          variants={floatingVariants}
          style={{ animationDelay: "0.5s" }}
        >
          <Coffee className="h-10 w-10" />
        </motion.div>

        {/* Floating Utensils */}
        <motion.div
          className="absolute bottom-32 left-32 text-red-500"
          variants={floatingVariants}
          style={{ animationDelay: "1s" }}
        >
          <Utensils className="h-14 w-14" />
        </motion.div>

        {/* Floating Heart */}
        <motion.div
          className="absolute bottom-20 right-20 text-pink-500"
          variants={floatingVariants}
          style={{ animationDelay: "1.5s" }}
        >
          <Heart className="h-8 w-8 fill-current" />
        </motion.div>
      </motion.div>

      {/* Main loading content */}
      <div className="text-center z-10">
        {/* Animated Chef Hat Logo */}
        <motion.div className="mb-8 flex justify-center" variants={chefHatVariants} animate="animate">
          <div className="relative">
            <ChefHat className="h-20 w-20 text-orange-500 drop-shadow-lg" />
            {/* Glowing effect */}
            <div className="absolute inset-0 h-20 w-20 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
          </div>
        </motion.div>

        {/* App Title with gradient */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          FoodSwipe
        </motion.h1>

        {/* Loading text */}
        <motion.p className="text-gray-600 dark:text-gray-300 text-lg mb-8" variants={textVariants} animate="animate">
          Preparing your perfect meal...
        </motion.p>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
