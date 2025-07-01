"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

export default function SavedDishesLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Animated Loading Icon */}
        <div className="text-center mb-8">
          <motion.div
            className="relative inline-block"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart className="h-12 w-12 text-red-500 fill-current" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </motion.div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your saved dishes...</p>
        </div>

        {/* Stats Skeleton */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <div className="w-48 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
            <div>
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 animate-pulse" />

        {/* Dishes Grid Skeleton */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1 animate-pulse" />
                    <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-12 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
