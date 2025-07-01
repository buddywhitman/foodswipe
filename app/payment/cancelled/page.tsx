"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XCircle, ChefHat, ArrowLeft, Clock, ShoppingCart } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function PaymentCancelledPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)

  const orderId = searchParams.get("order_id")

  useEffect(() => {
    // Mock order details - in production, fetch from API
    setOrderDetails({
      id: orderId || "ORD-2024-001",
      total: 65.51,
      items: [
        {
          id: 1,
          name: "Truffle Mushroom Risotto",
          restaurant: "Bella Vista",
          quantity: 1,
          price: 24.99,
        },
        {
          id: 2,
          name: "Korean BBQ Bowl",
          restaurant: "Seoul Kitchen",
          quantity: 2,
          price: 18.99,
        },
      ],
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
    })
  }, [orderId])

  const continuePayment = () => {
    router.push(`/payment?order_id=${orderId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg">FoodSwipe</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cancellation Message */}
          <Card className="text-center border-yellow-200 bg-yellow-50">
            <CardContent className="p-8">
              <XCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-yellow-800 mb-2">Payment Cancelled</h1>
              <p className="text-yellow-600 mb-4">
                You cancelled the payment process. Your order is still saved and waiting for you!
              </p>
              {orderDetails && (
                <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                  Order #{orderDetails.id}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Order Expiry Warning */}
          {orderDetails && (
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-orange-800">Order Expires Soon</p>
                    <p className="text-sm text-orange-600">
                      Complete payment by {orderDetails.expiresAt.toLocaleTimeString()} to secure your order
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Summary */}
          {orderDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Your Saved Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {orderDetails.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.restaurant} × {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Why did this happen? */}
          <Card>
            <CardHeader>
              <CardTitle>Why was payment cancelled?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-600 text-sm">Payment can be cancelled for several reasons:</p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• You closed the payment window</li>
                <li>• You clicked the back button during payment</li>
                <li>• The payment session timed out</li>
                <li>• You chose to cancel the transaction</li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={continuePayment}
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              Complete Payment Now
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Modify Order
                </Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/dashboard">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Save for Later */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-blue-800 mb-3">
                Don't want to pay right now? We'll save your order for later.
              </p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/orders/saved">Save for Later</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 mb-3">Having trouble with payment? We're here to help.</p>
              <Button size="sm" variant="outline" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
