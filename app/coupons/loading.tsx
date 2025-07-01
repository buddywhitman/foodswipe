"use client"

import { motion } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"

export default function CouponsLoading() {
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
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Animated Loading Icon */}
        <div className="text-center mb-8">
          <motion.div
            className="relative inline-block"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Gift className="h-12 w-12 text-orange-500" />
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </motion.div>
          </motion.div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your coupons...</p>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2 animate-pulse" />
              <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-1 animate-pulse" />
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto animate-pulse" />
            </div>
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 animate-pulse" />

        {/* Coupon Cards Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse" />
                    <div className="space-y-2">
                      <div className="w-3/4 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2 animate-pulse" />
                  </div>
                </div>
                <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
