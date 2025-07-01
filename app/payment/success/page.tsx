"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ChefHat, MapPin, Clock, Share2, Download } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get payment details from URL params
  const paymentId = searchParams.get("payment_id")
  const orderId = searchParams.get("order_id")
  const signature = searchParams.get("signature")

  useEffect(() => {
    // In production, verify payment with your backend
    const verifyPayment = async () => {
      try {
        // Mock API call to verify payment and get order details
        // const response = await fetch('/api/payment/verify', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ paymentId, orderId, signature })
        // })

        // Mock order details
        setTimeout(() => {
          setOrderDetails({
            id: orderId || "ORD-2024-001",
            paymentId: paymentId || "pay_mock_123",
            status: "confirmed",
            total: 65.51,
            items: [
              {
                id: 1,
                name: "Truffle Mushroom Risotto",
                restaurant: "Bella Vista",
                quantity: 1,
                price: 24.99,
                image: "/placeholder.svg?height=60&width=60",
              },
              {
                id: 2,
                name: "Korean BBQ Bowl",
                restaurant: "Seoul Kitchen",
                quantity: 2,
                price: 18.99,
                image: "/placeholder.svg?height=60&width=60",
              },
            ],
            deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001",
            estimatedDelivery: "25-35 minutes",
            restaurant: {
              name: "Multiple Restaurants",
              phone: "+1-234-567-8900",
            },
            paymentMethod: "Razorpay",
            paidAt: new Date().toISOString(),
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Payment verification failed:", error)
        router.push("/payment/failed")
      }
    }

    verifyPayment()
  }, [paymentId, orderId, signature, router])

  const shareOrder = () => {
    if (navigator.share) {
      navigator.share({
        title: "My FoodSwipe Order",
        text: `Just ordered from ${orderDetails.restaurant.name} via FoodSwipe!`,
        url: window.location.href,
      })
    }
  }

  const downloadReceipt = () => {
    // In production, generate and download PDF receipt
    console.log("Downloading receipt...")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Confirming your payment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodSwipe
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Success Message */}
          <Card className="text-center border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">Payment Successful!</h1>
              <p className="text-green-600 dark:text-green-300 mb-4">
                Your order has been confirmed and is being prepared
              </p>
              <Badge className="bg-green-500 text-white">Order #{orderDetails.id}</Badge>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="dark:text-white">Order Details</span>
                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">
                  {orderDetails.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderDetails.items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium dark:text-white">{item.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                    <p className="text-sm dark:text-gray-300">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <div className="border-t pt-4 dark:border-gray-600">
                <div className="flex justify-between text-lg font-bold">
                  <span className="dark:text-white">Total Paid</span>
                  <span className="text-green-600 dark:text-green-400">₹{orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card className="dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3 mb-4">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="font-medium dark:text-white">Delivery Address</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{orderDetails.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium text-orange-600 dark:text-orange-400">Estimated Delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Payment ID</span>
                <span className="font-mono text-sm dark:text-white">{orderDetails.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Payment Method</span>
                <span className="dark:text-white">{orderDetails.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Paid At</span>
                <span className="dark:text-white">{new Date(orderDetails.paidAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={shareOrder}
              variant="outline"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Share2 className="h-4 w-4 mr-2" />
              <span>Share Order</span>
            </Button>
            <Button
              onClick={downloadReceipt}
              variant="outline"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              <span>Download Receipt</span>
            </Button>
          </div>

          {/* Track Order Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium"
            asChild
          >
            <Link href={`/orders/${orderDetails.id}/track`}>
              <span>Track Your Order</span>
            </Link>
          </Button>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              asChild
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Link href="/dashboard">
                <span>Continue Shopping</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Link href="/orders">
                <span>View All Orders</span>
              </Link>
            </Button>
          </div>

          {/* Support */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">Need help with your order?</p>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="bg-white dark:bg-gray-800 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              >
                <Link href="/support">
                  <span>Contact Support</span>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
