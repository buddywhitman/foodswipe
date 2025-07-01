"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Filter, Clock, Star, RotateCcw, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

const MOCK_ORDERS = [
  {
    id: "ORD001",
    restaurant: "Punjabi Dhaba",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: ["Butter Chicken", "Naan", "Raita"],
    total: 980,
    status: "delivered",
    date: "2024-01-15",
    time: "2:30 PM",
    rating: 5,
    canReorder: true,
  },
  {
    id: "ORD002",
    restaurant: "South Indian Corner",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: ["Masala Dosa", "Filter Coffee"],
    total: 220,
    status: "delivered",
    date: "2024-01-14",
    time: "9:15 AM",
    rating: 4,
    canReorder: true,
  },
  {
    id: "ORD003",
    restaurant: "Bella Vista",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: ["Truffle Mushroom Risotto"],
    total: 899,
    status: "cancelled",
    date: "2024-01-13",
    time: "7:45 PM",
    rating: null,
    canReorder: true,
  },
  {
    id: "ORD004",
    restaurant: "Sweet Treats",
    restaurantImage: "/placeholder.svg?height=60&width=60",
    items: ["Chocolate Brownie", "Vanilla Ice Cream"],
    total: 350,
    status: "preparing",
    date: "2024-01-15",
    time: "3:45 PM",
    rating: null,
    canReorder: false,
  },
]

const STATUS_COLORS = {
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
  preparing: "bg-orange-500",
  "on-the-way": "bg-blue-500",
}

export default function OrdersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders] = useState(MOCK_ORDERS)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleReorder = (orderId: string) => {
    // TODO: Add items to cart and redirect
    console.log("Reordering:", orderId)
    router.push("/cart")
  }

  const handleRateOrder = (orderId: string) => {
    router.push(`/orders/${orderId}/review`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold dark:text-white">Order History</h1>
          <div></div>
        </div>

        {/* Filters */}
        <Card className="mb-6 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search restaurants or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 dark:bg-gray-700 dark:border-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium mb-2 dark:text-white">No orders found</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't placed any orders yet"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Button asChild className="mt-4 bg-gradient-to-r from-orange-500 to-red-500">
                    <Link href="/dashboard">Start Ordering</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="dark:bg-gray-800 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={order.restaurantImage || "/placeholder.svg"}
                        alt={order.restaurant}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg dark:text-white">{order.restaurant}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Order #{order.id}</p>
                          </div>
                          <Badge className={`${STATUS_COLORS[order.status as keyof typeof STATUS_COLORS]} text-white`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{order.items.join(", ")}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {order.date} at {order.time}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">₹{order.total}</span>
                          </div>
                        </div>

                        {/* Rating */}
                        {order.rating && (
                          <div className="flex items-center space-x-1 mb-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Your rating:</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= order.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          {order.status === "preparing" || order.status === "on-the-way" ? (
                            <Button size="sm" asChild className="bg-blue-500 hover:bg-blue-600">
                              <Link href={`/orders/${order.id}/track`}>
                                <Eye className="h-4 w-4 mr-1" />
                                Track Order
                              </Link>
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/orders/${order.id}/track`}>
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Link>
                            </Button>
                          )}

                          {order.canReorder && (
                            <Button size="sm" variant="outline" onClick={() => handleReorder(order.id)}>
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Reorder
                            </Button>
                          )}

                          {order.status === "delivered" && !order.rating && (
                            <Button
                              size="sm"
                              onClick={() => handleRateOrder(order.id)}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Rate Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
