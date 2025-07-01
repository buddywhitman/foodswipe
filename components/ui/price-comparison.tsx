"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Star, Clock, Truck } from "lucide-react"

interface PriceComparisonProps {
  dishId: number
  dishName: string
  isOpen: boolean
  onClose: () => void
}

const PRICE_DATA = [
  {
    platform: "Zomato",
    price: 450,
    originalPrice: 500,
    discount: "10% OFF",
    rating: 4.2,
    deliveryTime: "25-30 min",
    deliveryFee: 25,
    logo: "/placeholder.svg?height=32&width=32&text=Z",
    url: "https://zomato.com",
    color: "bg-red-500",
  },
  {
    platform: "Swiggy",
    price: 420,
    originalPrice: 450,
    discount: "Free Delivery",
    rating: 4.1,
    deliveryTime: "20-25 min",
    deliveryFee: 0,
    logo: "/placeholder.svg?height=32&width=32&text=S",
    url: "https://swiggy.com",
    color: "bg-orange-500",
  },
  {
    platform: "Domino's App",
    price: 399,
    originalPrice: 499,
    discount: "20% OFF",
    rating: 4.3,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    logo: "/placeholder.svg?height=32&width=32&text=D",
    url: "https://dominos.co.in",
    color: "bg-blue-600",
  },
  {
    platform: "FoodSwipe",
    price: 380,
    originalPrice: 450,
    discount: "Best Price",
    rating: 4.5,
    deliveryTime: "18-23 min",
    deliveryFee: 0,
    logo: "/placeholder.svg?height=32&width=32&text=F",
    url: "#",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    isBest: true,
  },
]

export function PriceComparison({ dishId, dishName, isOpen, onClose }: PriceComparisonProps) {
  const [sortBy, setSortBy] = useState<"price" | "time" | "rating">("price")

  const sortedData = [...PRICE_DATA].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price + a.deliveryFee - (b.price + b.deliveryFee)
      case "time":
        return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Compare Prices - {dishName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Sort Options */}
          <div className="flex space-x-2">
            <Button size="sm" variant={sortBy === "price" ? "default" : "outline"} onClick={() => setSortBy("price")}>
              Best Price
            </Button>
            <Button size="sm" variant={sortBy === "time" ? "default" : "outline"} onClick={() => setSortBy("time")}>
              Fastest
            </Button>
            <Button size="sm" variant={sortBy === "rating" ? "default" : "outline"} onClick={() => setSortBy("rating")}>
              Highest Rated
            </Button>
          </div>

          {/* Price Comparison Cards */}
          <div className="space-y-3">
            {sortedData.map((item, index) => (
              <Card
                key={item.platform}
                className={`relative ${item.isBest ? "ring-2 ring-orange-500 dark:ring-orange-400" : ""} dark:bg-gray-700`}
              >
                {item.isBest && <Badge className="absolute -top-2 left-4 bg-orange-500 text-white">Best Deal</Badge>}
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center`}>
                        <img src={item.logo || "/placeholder.svg"} alt={item.platform} className="w-8 h-8 rounded" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-white">{item.platform}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {item.rating}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.deliveryTime}
                          </div>
                          <div className="flex items-center">
                            <Truck className="h-3 w-3 mr-1" />
                            {item.deliveryFee === 0 ? "Free" : `₹${item.deliveryFee}`}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ₹{item.price + item.deliveryFee}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {item.discount}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Food: ₹{item.price} + Delivery: ₹{item.deliveryFee}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open(item.url, "_blank")}
                      className={item.isBest ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Order Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t dark:border-gray-600">
            Prices updated 5 minutes ago • Delivery times may vary
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
