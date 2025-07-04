"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Wallet, Shield, ArrowLeft, ChefHat, Clock, MapPin } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Mock order data - in real app, this would come from API
const MOCK_ORDER = {
  id: "ORD-2024-001",
  items: [
    {
      id: 1,
      name: "Truffle Mushroom Risotto",
      restaurant: "Bella Vista",
      quantity: 1,
      price: 899,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Korean BBQ Bowl",
      restaurant: "Seoul Kitchen",
      quantity: 2,
      price: 450,
      image: "/placeholder.svg?height=60&width=60",
    },
  ],
  subtotal: 1799,
  discount: 180,
  deliveryFee: 40,
  tax: 138,
  total: 1797,
  deliveryAddress: "123 Main St, Apt 4B, Bangalore, Karnataka 560001",
  estimatedDelivery: "25-35 minutes",
}

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [savePaymentMethod, setSavePaymentMethod] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  // Handle Razorpay payment
  const handleRazorpayPayment = async () => {
    setIsProcessing(true)

    try {
      // In production, you would:
      // 1. Create order on your backend
      // 2. Get order_id from Razorpay
      // 3. Open Razorpay checkout

      // Mock Razorpay integration
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_mock",
        amount: Math.round(MOCK_ORDER.total * 100), // Amount in paise
        currency: "INR",
        name: "FoodSwipe",
        description: `Order #${MOCK_ORDER.id}`,
        order_id: "order_mock_" + Date.now(), // This would come from your backend
        handler: (response: any) => {
          // Payment successful
          router.push(
            `/payment/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&signature=${response.razorpay_signature}`,
          )
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "+91 9876543210",
        },
        theme: {
          color: "#f97316", // Orange theme
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
            // Handle payment cancellation
            router.push(`/payment/cancelled?order_id=${MOCK_ORDER.id}`)
          },
        },
      }

      // For demo purposes, simulate payment flow
      setTimeout(() => {
        const success = Math.random() > 0.2 // 80% success rate for demo
        if (success) {
          router.push(
            `/payment/success?payment_id=pay_mock_${Date.now()}&order_id=order_mock_${Date.now()}&signature=mock_signature`,
          )
        } else {
          router.push(`/payment/failed?order_id=${MOCK_ORDER.id}&reason=payment_failed`)
        }
      }, 2000)

      // In production, uncomment this:
      // const rzp = new (window as any).Razorpay(options)
      // rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      setIsProcessing(false)
      router.push(`/payment/failed?order_id=${MOCK_ORDER.id}&reason=technical_error`)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === "razorpay") {
      handleRazorpayPayment()
    } else {
      // Handle other payment methods
      setIsProcessing(true)
      setTimeout(() => {
        router.push(`/payment/success?payment_id=mock_${paymentMethod}_${Date.now()}&order_id=order_mock_${Date.now()}`)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 p-4">
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
            <p className="text-gray-600">Secure checkout for your order</p>
          </div>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_ORDER.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{MOCK_ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-₹{MOCK_ORDER.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{MOCK_ORDER.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{MOCK_ORDER.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span>₹{MOCK_ORDER.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-sm text-gray-600">{MOCK_ORDER.deliveryAddress}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-3 pt-3 border-t">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-gray-600">{MOCK_ORDER.estimatedDelivery}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-4">
                  {/* Razorpay */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <CreditCard className="h-5 w-5 text-blue-500" />
                    <div className="flex-1">
                      <Label htmlFor="razorpay" className="font-medium">
                        Razorpay
                      </Label>
                      <p className="text-sm text-gray-500">Cards, UPI, Wallets & More</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Recommended</Badge>
                  </div>

                  {/* UPI */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <Label htmlFor="upi" className="font-medium">
                        UPI
                      </Label>
                      <p className="text-sm text-gray-500">Pay using UPI ID</p>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Wallet className="h-5 w-5 text-purple-500" />
                    <div className="flex-1">
                      <Label htmlFor="wallet" className="font-medium">
                        Digital Wallet
                      </Label>
                      <p className="text-sm text-gray-500">Paytm, PhonePe, Google Pay</p>
                    </div>
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-medium">
                        Credit/Debit Card
                      </Label>
                      <p className="text-sm text-gray-500">Visa, Mastercard, RuPay</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              {/* Card Details Form (shown when card is selected) */}
              {paymentMethod === "card" && (
                <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, number: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, expiry: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails((prev) => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Payment Method */}
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox id="savePayment" checked={savePaymentMethod} onCheckedChange={(checked: boolean | "indeterminate") => setSavePaymentMethod(Boolean(checked))} />
                <Label htmlFor="savePayment" className="text-sm">
                  Save this payment method for future orders
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
            <Shield className="h-5 w-5 text-green-600" />
            <div className="text-sm">
              <p className="font-medium text-green-800">Secure Payment</p>
              <p className="text-green-600">Your payment information is encrypted and secure</p>
            </div>
          </div>

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            size="lg"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </div>
            ) : (
              `Pay ₹${MOCK_ORDER.total.toFixed(2)}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
