"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion"
import {
  Heart,
  X,
  Star,
  Clock,
  MapPin,
  Camera,
  TrendingUp,
  Info,
  MoreVertical,
  EyeOff,
  Flag,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PriceComparison } from "./price-comparison"
import Image from "next/image"
import Link from "next/link"

interface SwipeCardProps {
  dish: {
    id: number
    name: string
    restaurant: string
    restaurantId: number
    images: string[]
    price: number
    rating: number
    tags: string[]
    description: string
    deliveryTime: string
    distance: string
    friendActivity?: {
      liked: boolean
      ordered: boolean
      friendName: string
      friendAvatar: string
    }
    userImages?: string[]
    compareAvailable?: boolean
    recommendationReason?: string
  }
  onSwipe: (direction: "left" | "right", dishId: number) => void
  onCompare?: (dishId: number) => void
  onPriceCompare?: (dishId: number) => void
  onHideRestaurant?: (restaurantId: number) => void
  onReportDish?: (dishId: number) => void
  isTop?: boolean
}

export function SwipeCard({
  dish,
  onSwipe,
  onCompare,
  onPriceCompare,
  onHideRestaurant,
  onReportDish,
  isTop = false,
}: SwipeCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showPriceComparison, setShowPriceComparison] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0])

  // Color transforms for swipe feedback
  const likeOpacity = useTransform(x, [0, 150], [0, 1])
  const passOpacity = useTransform(x, [-150, 0], [1, 0])

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 150

    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? "right" : "left"
      onSwipe(direction, dish.id)
    } else {
      // Snap back to center
      x.set(0)
      y.set(0)
    }
  }

  const handleButtonSwipe = (direction: "left" | "right") => {
    // Animate the card off screen first
    const targetX = direction === "right" ? 300 : -300
    x.set(targetX)
    setTimeout(() => onSwipe(direction, dish.id), 200)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % dish.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + dish.images.length) % dish.images.length)
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className={`absolute inset-0 cursor-grab active:cursor-grabbing ${isTop ? "z-20" : "z-10"}`}
        style={{ x, y, rotate, opacity }}
        drag={isTop}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Responsive card height */}
        <Card className="w-full h-[600px] sm:h-[650px] lg:h-[700px] overflow-hidden bg-white dark:bg-gray-800 shadow-2xl border-0 relative flex flex-col">
          {/* Swipe Feedback Overlays */}
          <motion.div
            className="absolute inset-0 bg-green-500/20 z-30 flex items-center justify-center"
            style={{ opacity: likeOpacity }}
          >
            <motion.div
              className="bg-green-500 rounded-full p-4"
              initial={{ scale: 0 }}
              animate={{ scale: isDragging && x.get() > 50 ? 1 : 0 }}
            >
              <Heart className="h-8 w-8 text-white fill-white" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-red-500/20 z-30 flex items-center justify-center"
            style={{ opacity: passOpacity }}
          >
            <motion.div
              className="bg-red-500 rounded-full p-4"
              initial={{ scale: 0 }}
              animate={{ scale: isDragging && x.get() < -50 ? 1 : 0 }}
            >
              <X className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Three-dot Menu */}
          <div className="absolute top-4 right-4 z-40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 text-white rounded-full"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dark:bg-gray-800">
                <DropdownMenuItem asChild>
                  <Link href={`/restaurant/${dish.restaurantId}`}>View Restaurant</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dish/${dish.id}`}>View Details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowPriceComparison(true)}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Compare Prices
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Dish
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onHideRestaurant?.(dish.restaurantId)}
                  className="text-orange-600 dark:text-orange-400"
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Restaurant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onReportDish?.(dish.id)} className="text-red-600 dark:text-red-400">
                  <Flag className="h-4 w-4 mr-2" />
                  Report Dish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Friend Activity Badge */}
          {dish.friendActivity && (
            <motion.div
              className="absolute top-4 left-4 z-40"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Badge className="bg-blue-500 text-white flex items-center space-x-1 text-xs">
                <Image
                  src={dish.friendActivity.friendAvatar || "/placeholder.svg"}
                  alt={dish.friendActivity.friendName}
                  width={16}
                  height={16}
                  className="rounded-full"
                />
                <span className="hidden sm:inline">
                  {dish.friendActivity.friendName} {dish.friendActivity.ordered ? "ordered" : "liked"} this
                </span>
                <span className="sm:hidden">{dish.friendActivity.friendName}</span>
              </Badge>
            </motion.div>
          )}

          {/* Recommendation Info Icon */}
          {dish.recommendationReason && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    className="absolute top-16 right-4 z-40 bg-purple-500 text-white rounded-full p-2 cursor-help"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Info className="h-3 w-3" />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  <p className="text-sm">{dish.recommendationReason}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* Image Carousel - Responsive height */}
          <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden flex-shrink-0">
            <motion.div
              className="flex h-full"
              animate={{ x: -currentImageIndex * 100 + "%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {dish.images.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${dish.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
            </motion.div>

            {/* Image Navigation */}
            {dish.images.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  onClick={prevImage}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute top-1/2 right-12 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                  onClick={nextImage}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {dish.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Rating Badge */}
            <motion.div
              className="absolute bottom-4 right-4 z-20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-white/90 text-gray-800 flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{dish.rating}</span>
              </Badge>
            </motion.div>

            {/* User Images Badge */}
            {dish.userImages && dish.userImages.length > 0 && (
              <motion.div
                className="absolute bottom-16 right-4 z-20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Badge className="bg-purple-500 text-white flex items-center space-x-1">
                  <Camera className="h-3 w-3" />
                  <span className="text-xs">{dish.userImages.length}</span>
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content - Better responsive spacing */}
          <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between bg-white dark:bg-gray-800 min-h-0">
            <div className="space-y-2 sm:space-y-3">
              <motion.h2
                className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {dish.name}
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {dish.restaurant}
              </motion.p>

              <motion.div
                className="flex items-center justify-between"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-xl sm:text-2xl font-bold text-orange-500">₹{dish.price}</span>
                <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">{dish.deliveryTime}</span>
                    <span className="sm:hidden">{dish.deliveryTime.split(" ")[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>{dish.distance}</span>
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                {dish.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-1 sm:gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {dish.tags.slice(0, 3).map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
                {dish.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{dish.tags.length - 3}
                  </Badge>
                )}
              </motion.div>
            </div>

            {/* Action Buttons - Better responsive layout */}
            <motion.div
              className="flex justify-between items-center pt-4 sm:pt-6 mt-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowPriceComparison(true)}
                  className="bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="hidden sm:inline">Compare Prices</span>
                  <span className="sm:hidden">Compare</span>
                </Button>
              </div>

              <div className="flex space-x-3 sm:space-x-4">
                <motion.button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleButtonSwipe("left")}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
                </motion.button>
                <motion.button
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center hover:from-orange-600 hover:to-red-600 transition-colors shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleButtonSwipe("right")}
                >
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Price Comparison Modal */}
      <PriceComparison
        dishId={dish.id}
        dishName={dish.name}
        isOpen={showPriceComparison}
        onClose={() => setShowPriceComparison(false)}
      />
    </>
  )
}
