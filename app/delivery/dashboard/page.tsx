"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import {
  Truck,
  MapPin,
  Phone,
  CheckCircle,
  X,
  Clock,
  DollarSign,
  Navigation,
  AlertTriangle,
  CreditCard,
  LogOut,
  ToggleLeft,
  ToggleRight,
} from "lucide-react"
import { motion } from "framer-motion"

export default function DeliveryDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [activeTab, setActiveTab] = useState("orders")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [deliveryIssue, setDeliveryIssue] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      restaurant: "Punjabi Dhaba",
      customer: "John Doe",
      customerPhone: "+91 98765 43210",
      address: "123 Main St, Apt 4B, Bangalore 560001",
      items: ["Butter Chicken x2", "Naan x4"],
      total: 980,
      status: "assigned",
      distance: "2.3 km",
      estimatedTime: "15 mins",
      paymentStatus: "paid",
      paymentMethod: "online",
      orderTime: "2:30 PM",
    },
    {
      id: "ORD-002",
      restaurant: "South Indian Corner",
      customer: "Priya Sharma",
      customerPhone: "+91 87654 32109",
      address: "456 Brigade Road, Bangalore 560025",
      items: ["Masala Dosa x2", "Filter Coffee x2"],
      total: 420,
      status: "ready",
      distance: "1.8 km",
      estimatedTime: "12 mins",
      paymentStatus: "pending",
      paymentMethod: "cod",
      orderTime: "2:45 PM",
    },
  ])

  const [earnings, setEarnings] = useState({
    today: 450,
    thisWeek: 2800,
    thisMonth: 12500,
    totalDeliveries: 156,
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast({
      title: "Status Updated",
      description: `Order ${orderId} status updated to ${newStatus}`,
    })
  }

  const handleDeliveryIssue = (orderId: string, issue: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: "issue", issue } : order)))
    toast({
      title: "Issue Reported",
      description: `Issue reported for order ${orderId}`,
    })
    setSelectedOrder(null)
    setDeliveryIssue("")
  }

  const handlePaymentCollection = (orderId: string, method: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: "collected", paymentMethod: method } : order,
      ),
    )
    toast({
      title: "Payment Collected",
      description: `Payment collected via ${method} for order ${orderId}`,
    })
    setSelectedOrder(null)
    setPaymentMethod("")
  }

  const callCustomer = (phone: string) => {
    window.open(`tel:${phone}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-500"
      case "accepted":
        return "bg-yellow-500"
      case "picked":
        return "bg-orange-500"
      case "delivered":
        return "bg-green-500"
      case "issue":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Delivery Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your deliveries and earnings</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium dark:text-white">{isOnline ? "Online" : "Offline"}</span>
              <Button variant="ghost" size="sm" onClick={() => setIsOnline(!isOnline)} className="p-0">
                {isOnline ? (
                  <ToggleRight className="h-6 w-6 text-green-500" />
                ) : (
                  <ToggleLeft className="h-6 w-6 text-gray-400" />
                )}
              </Button>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Earnings</p>
                    <p className="text-2xl font-bold dark:text-white">₹{earnings.today}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Truck className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Orders</p>
                    <p className="text-2xl font-bold dark:text-white">
                      {orders.filter((o) => o.status !== "delivered").length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Deliveries</p>
                    <p className="text-2xl font-bold dark:text-white">{earnings.totalDeliveries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Navigation className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating</p>
                    <p className="text-2xl font-bold dark:text-white">4.8 ⭐</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Active Orders</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {orders
                .filter((order) => order.status !== "delivered")
                .map((order) => (
                  <motion.div key={order.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Card className="dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold dark:text-white">Order #{order.id}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.restaurant}</p>
                            <Badge className={`${getStatusColor(order.status)} text-white mt-1`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold dark:text-white">₹{order.total}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.orderTime}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Customer</p>
                            <p className="dark:text-white">{order.customer}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{order.customerPhone}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Address</p>
                            <p className="text-sm dark:text-gray-300">{order.address}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Items</p>
                          <div className="flex flex-wrap gap-2">
                            {order.items.map((item, index) => (
                              <Badge key={index} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="dark:text-gray-300">{order.distance}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="dark:text-gray-300">{order.estimatedTime}</span>
                            </div>
                          </div>
                          <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"}>
                            {order.paymentStatus === "paid" ? "Paid Online" : "Cash on Delivery"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {order.status === "assigned" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "accepted")}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, "rejected")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}

                          {order.status === "accepted" && (
                            <Button
                              size="sm"
                              onClick={() => updateOrderStatus(order.id, "picked")}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              <Truck className="h-4 w-4 mr-1" />
                              Mark Picked Up
                            </Button>
                          )}

                          {order.status === "picked" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "delivered")}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Delivered
                              </Button>
                              {order.paymentStatus === "pending" && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                                      <CreditCard className="h-4 w-4 mr-1" />
                                      Collect Payment
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Collect Payment</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Order Total: ₹{order.total}
                                      </p>
                                      <div>
                                        <label className="text-sm font-medium">Payment Method</label>
                                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select payment method" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="upi">UPI</SelectItem>
                                            <SelectItem value="card">Card</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div className="flex space-x-2">
                                        <Button
                                          onClick={() => handlePaymentCollection(order.id, paymentMethod)}
                                          disabled={!paymentMethod}
                                          className="flex-1"
                                        >
                                          Confirm Payment
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </>
                          )}

                          <Button size="sm" variant="outline" onClick={() => callCustomer(order.customerPhone)}>
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Report Issue
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Report Delivery Issue</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Issue Type</label>
                                  <Select value={deliveryIssue} onValueChange={setDeliveryIssue}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select issue type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="customer-not-available">Customer Not Available</SelectItem>
                                      <SelectItem value="wrong-address">Wrong Address</SelectItem>
                                      <SelectItem value="security-denied">Security Guard Denied Entry</SelectItem>
                                      <SelectItem value="customer-refused">Customer Refused Order</SelectItem>
                                      <SelectItem value="payment-issue">Payment Issue</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Additional Details</label>
                                  <Textarea placeholder="Describe the issue..." rows={3} />
                                </div>
                                <div className="flex space-x-2">
                                  <Button
                                    onClick={() => handleDeliveryIssue(order.id, deliveryIssue)}
                                    disabled={!deliveryIssue}
                                    className="flex-1"
                                  >
                                    Report Issue
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Today</span>
                    <span className="font-bold dark:text-white">₹{earnings.today}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">This Week</span>
                    <span className="font-bold dark:text-white">₹{earnings.thisWeek}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">This Month</span>
                    <span className="font-bold dark:text-white">₹{earnings.thisMonth}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 dark:border-gray-600">
                    <span className="text-gray-600 dark:text-gray-400">Total Deliveries</span>
                    <span className="font-bold dark:text-white">{earnings.totalDeliveries}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
                    <span className="font-bold dark:text-white">4.8 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">On-time Delivery</span>
                    <span className="font-bold text-green-500">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Acceptance Rate</span>
                    <span className="font-bold text-blue-500">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg. Delivery Time</span>
                    <span className="font-bold dark:text-white">18 mins</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Delivery Partner Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">Rajesh Kumar</h3>
                    <p className="text-gray-600 dark:text-gray-400">Delivery Partner ID: DP001</p>
                    <Badge className="bg-green-500 mt-1">Verified</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone Number</label>
                    <p className="dark:text-white">+91 98765 43210</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Vehicle Type</label>
                    <p className="dark:text-white">Motorcycle</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Vehicle Number</label>
                    <p className="dark:text-white">KA 01 AB 1234</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">License Number</label>
                    <p className="dark:text-white">DL1420110012345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
