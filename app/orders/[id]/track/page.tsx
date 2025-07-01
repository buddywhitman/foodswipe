"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MapPin, Phone, MessageCircle, CheckCircle, Truck, ChefHat } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

const ORDER_STATUSES = [
  { id: "confirmed", label: "Order Confirmed", icon: CheckCircle },
  { id: "preparing", label: "Preparing", icon: ChefHat },
  { id: "ready", label: "Ready for Pickup", icon: CheckCircle },
  { id: "picked", label: "Picked Up", icon: Truck },
  { id: "delivered", label: "Delivered", icon: CheckCircle },
]

export default function OrderTrackingPage() {
  const router = useRouter()
  const params = useParams()
  const orderId = params.id

  const [orderStatus, setOrderStatus] = useState("picked")
  const [estimatedTime, setEstimatedTime] = useState(15)
  const [deliveryPartner] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    vehicle: "Bike",
    vehicleNumber: "MH 01 AB 1234",
    location: { lat: 19.076, lng: 72.8777 },
  })

  const [orderDetails] = useState({
    id: orderId,
    restaurant: "Punjabi Dhaba",
    items: [
      { name: "Butter Chicken", quantity: 2, price: 450 },
      { name: "Naan", quantity: 4, price: 40 },
    ],
    total: 980,
    address: "123 Main St, Apt 4B, Mumbai 400001",
  })

  const currentStatusIndex = ORDER_STATUSES.findIndex((status) => status.id === orderStatus)
  const progress = ((currentStatusIndex + 1) / ORDER_STATUSES.length) * 100

  useEffect(() => {
    // Simulate order status updates
    const interval = setInterval(() => {
      setEstimatedTime((prev) => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleCallDeliveryPartner = () => {
    window.open(`tel:${deliveryPartner.phone}`)
  }

  const handleMessageDeliveryPartner = () => {
    // TODO: Open chat interface
    console.log("Opening chat with delivery partner")
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
          <h1 className="text-2xl font-bold dark:text-white">Track Order #{orderId}</h1>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Progress */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Order Status</CardTitle>
                <Progress value={progress} className="w-full" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ORDER_STATUSES.map((status, index) => {
                    const Icon = status.icon
                    const isCompleted = index <= currentStatusIndex
                    const isCurrent = index === currentStatusIndex

                    return (
                      <motion.div
                        key={status.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg ${
                          isCurrent ? "bg-orange-50 dark:bg-orange-900/20" : ""
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            isCompleted ? "bg-green-500" : isCurrent ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isCurrent ? "text-orange-600 dark:text-orange-400" : "dark:text-white"
                            }`}
                          >
                            {status.label}
                          </p>
                          {isCurrent && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Estimated time: {estimatedTime} minutes
                            </p>
                          )}
                        </div>
                        {isCompleted && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Done
                          </Badge>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Live Map */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Truck className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-300">Live Map View</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery partner location updates in real-time
                      </p>
                    </div>
                  </div>

                  {/* Mock delivery partner location */}
                  <motion.div
                    className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <div className="bg-blue-500 rounded-full p-2">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>

                  {/* Mock destination */}
                  <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2">
                    <div className="bg-red-500 rounded-full p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                    {deliveryPartner.name} is 2.3 km away
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    Expected arrival in {estimatedTime} minutes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Partner */}
            {orderStatus !== "confirmed" && orderStatus !== "preparing" && (
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Delivery Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={deliveryPartner.avatar || "/placeholder.svg"} />
                      <AvatarFallback>RK</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium dark:text-white">{deliveryPartner.name}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                          {deliveryPartner.vehicle}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">⭐ {deliveryPartner.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{deliveryPartner.vehicleNumber}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      onClick={handleCallDeliveryPartner}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleMessageDeliveryPartner}
                      className="dark:border-gray-600 dark:text-gray-300 bg-transparent"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Order Summary */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt={orderDetails.restaurant}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="font-medium dark:text-white">{orderDetails.restaurant}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Order #{orderDetails.id}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {orderDetails.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="dark:text-gray-300">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="dark:text-white">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-2 dark:border-gray-600">
                    <div className="flex justify-between font-medium">
                      <span className="dark:text-white">Total</span>
                      <span className="dark:text-white">₹{orderDetails.total}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm dark:text-gray-300">{orderDetails.address}</p>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent dark:border-gray-600 dark:text-gray-300"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent dark:border-gray-600 dark:text-gray-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
