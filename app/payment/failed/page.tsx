"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XCircle, ChefHat, RefreshCw, ArrowLeft, AlertTriangle, Phone, Mail } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

const FAILURE_REASONS = {
  payment_failed: {
    title: "Payment Failed",
    description: "Your payment could not be processed. Please try again with a different payment method.",
    icon: XCircle,
    color: "text-red-500",
  },
  insufficient_funds: {
    title: "Insufficient Funds",
    description: "Your account doesn't have sufficient balance. Please try with a different payment method.",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
  technical_error: {
    title: "Technical Error",
    description: "We encountered a technical issue while processing your payment. Please try again.",
    icon: AlertTriangle,
    color: "text-orange-500",
  },
  bank_declined: {
    title: "Payment Declined",
    description: "Your bank has declined this transaction. Please contact your bank or try a different card.",
    icon: XCircle,
    color: "text-red-500",
  },
  timeout: {
    title: "Payment Timeout",
    description: "The payment session has expired. Please try placing your order again.",
    icon: AlertTriangle,
    color: "text-yellow-500",
  },
}

export default function PaymentFailedPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isRetrying, setIsRetrying] = useState(false)

  const orderId = searchParams.get("order_id")
  const reason = (searchParams.get("reason") as keyof typeof FAILURE_REASONS) || "payment_failed"
  const failureInfo = FAILURE_REASONS[reason] || FAILURE_REASONS.payment_failed

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
    })
  }, [orderId])

  const retryPayment = () => {
    setIsRetrying(true)
    // Redirect back to payment page with order details
    router.push(`/payment?retry=true&order_id=${orderId}`)
  }

  const IconComponent = failureInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-4">
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
          {/* Failure Message */}
          <Card className="text-center border-red-200 bg-red-50">
            <CardContent className="p-8">
              <IconComponent className={`h-16 w-16 ${failureInfo.color} mx-auto mb-4`} />
              <h1 className="text-3xl font-bold text-red-800 mb-2">{failureInfo.title}</h1>
              <p className="text-red-600 mb-4">{failureInfo.description}</p>
              {orderDetails && (
                <Badge variant="outline" className="border-red-300 text-red-700">
                  Order #{orderDetails.id}
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          {orderDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
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

          {/* What to do next */}
          <Card>
            <CardHeader>
              <CardTitle>What can you do?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Try a different payment method</p>
                    <p className="text-sm text-gray-600">Use UPI, wallet, or a different card</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Check your bank account</p>
                    <p className="text-sm text-gray-600">Ensure sufficient balance and card limits</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Contact your bank</p>
                    <p className="text-sm text-gray-600">If the issue persists, check with your bank</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={retryPayment}
              disabled={isRetrying}
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              {isRetrying ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Retrying...
                </div>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/cart">Modify Order</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/dashboard">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          {/* Support Section */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-blue-700">If you continue to face issues, our support team is here to help.</p>
              <div className="grid grid-cols-2 gap-3">
                <Button size="sm" variant="outline" asChild>
                  <Link href="/support/chat">
                    <Mail className="h-4 w-4 mr-2" />
                    Chat Support
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="tel:+1234567890">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Details */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono">{orderDetails?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Failure Reason</span>
                <span>{reason.replace("_", " ").toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Attempted At</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
