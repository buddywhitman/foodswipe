"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ChefHat,
  ArrowLeft,
  MapPin,
  Clock,
  CreditCard,
  Tag,
  Edit3,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ThemeToggle } from "@/components/ui/theme-toggle"


const AVAILABLE_COUPONS = [
  {
    id: "SAVE10",
    title: "Save ₹100",
    description: "Get ₹100 off on orders above ₹500",
    discount: 100,
    minOrder: 500,
    type: "fixed",
    isActive: true,
    expiryDate: "2024-12-31",
  },
  {
    id: "FIRST20",
    title: "First Order 20% Off",
    description: "20% off on your first order (max ₹200)",
    discount: 20,
    maxDiscount: 200,
    type: "percentage",
    isActive: true,
    expiryDate: "2024-12-31",
  },
  {
    id: "WEEKEND15",
    title: "Weekend Special",
    description: "15% off on weekend orders",
    discount: 15,
    type: "percentage",
    isActive: true,
    expiryDate: "2024-12-31",
  },
]

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [showCoupons, setShowCoupons] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [deliveryInstructions, setDeliveryInstructions] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Use global cart context for updateQuantity and removeFromCart

  // TODO: If you want to support special instructions/extras, extend CartContext and update logic here
  const updateSpecialInstructions = (itemId: number, instructions: string) => {}
  const toggleExtra = (itemId: number, extraId: string) => {}

  const validateCoupon = (couponCode: string) => {
    const coupon = AVAILABLE_COUPONS.find((c) => c.id.toLowerCase() === couponCode.toLowerCase())

    if (!coupon) {
      return { valid: false, message: "Invalid coupon code" }
    }

    if (!coupon.isActive) {
      return { valid: false, message: "This coupon has expired" }
    }

    const currentDate = new Date()
    const expiryDate = new Date(coupon.expiryDate)
    if (currentDate > expiryDate) {
      return { valid: false, message: "This coupon has expired" }
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return { valid: false, message: `Minimum order of ₹${coupon.minOrder} required` }
    }

    return { valid: true, coupon }
  }

  const applyCoupon = (coupon: any) => {
    setAppliedCoupon(coupon)
    setShowCoupons(false)
    setPromoCode("")
    toast({
      title: "Coupon Applied!",
      description: `${coupon.title} has been applied to your order.`,
    })
  }

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      })
      return
    }

    setIsApplyingCoupon(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const validation = validateCoupon(promoCode)

    if (validation.valid && validation.coupon) {
      applyCoupon(validation.coupon)
    } else {
      toast({
        title: "Invalid Coupon",
        description: validation.message,
        variant: "destructive",
      })
    }

    setIsApplyingCoupon(false)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your order.",
    })
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity
    // If you want to support extras, add logic here
    return sum + itemTotal
  }, 0)

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0

    if (appliedCoupon.type === "fixed") {
      return subtotal >= (appliedCoupon.minOrder || 0) ? appliedCoupon.discount : 0
    } else {
      const discount = (subtotal * appliedCoupon.discount) / 100
      return appliedCoupon.maxDiscount ? Math.min(discount, appliedCoupon.maxDiscount) : discount
    }
  }

  const discount = calculateDiscount()
  const deliveryFee = subtotal > 300 ? 0 : 40
  const platformFee = 5
  const gst = Math.round((subtotal - discount) * 0.05)
  const total = subtotal - discount + deliveryFee + platformFee + gst

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors duration-300">
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
            <ThemeToggle />
          </div>

          {/* Empty State */}
          <motion.div className="text-center py-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Start swiping to discover amazing dishes!</p>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500">
              <Link href="/dashboard">Start Discovering</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 transition-colors duration-300">
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
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          {/* Cart Items */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center dark:text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Order ({cart.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border rounded-lg p-4 dark:border-gray-600"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.restaurant}</p>
                        <p className="text-sm font-bold text-orange-500">₹{item.price}</p>

                        {/* Customizations */}
                        {Array.isArray(item.customizations) && item.customizations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                        {item.customizations.map((custom: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {custom}
                          </Badge>
                        ))}
                          </div>
                        )}

                        {/* Selected Extras */}
                        {Array.isArray(item.selectedExtras) && item.selectedExtras.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Extras:</p>
                        {item.selectedExtras.map((extraId: string) => {
                          const extra = Array.isArray(item.availableExtras) ? item.availableExtras.find((e: { id: string }) => e.id === extraId) : null
                          return extra ? (
                            <Badge key={extraId} variant="outline" className="text-xs mr-1">
                              {extra.name} (+₹{extra.price})
                            </Badge>
                          ) : null
                        })}
                          </div>
                        )}

                        {/* Special Instructions */}
                        {editingItem === Number(item.id) ? (
                          <div className="mt-2 space-y-2">
                            <Label className="text-xs">Special Instructions</Label>
                            <Textarea
                              placeholder="Any special requests for this item..."
                              value={item.specialInstructions || ""}
                              onChange={(e) => updateSpecialInstructions(Number(item.id), e.target.value)}
                              className="text-sm"
                              rows={2}
                            />
                            <div className="space-y-2">
                              <Label className="text-xs">Add Extras</Label>
                              <div className="grid grid-cols-2 gap-2">
                        {Array.isArray(item.availableExtras) && item.availableExtras.map((extra: { id: string; name: string; price: number }) => (
                          <Button
                            key={extra.id}
                            size="sm"
                            variant={Array.isArray(item.selectedExtras) && item.selectedExtras.includes(extra.id) ? "default" : "outline"}
                            onClick={() => toggleExtra(Number(item.id), extra.id)}
                            className="text-xs h-8"
                          >
                            {extra.name} (+₹{extra.price})
                          </Button>
                        ))}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setEditingItem(null)}
                              className="bg-green-500 hover:bg-green-600"
                            >
                              Done
                            </Button>
                          </div>
                        ) : (
                          item.specialInstructions && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 italic">
                              "{item.specialInstructions}"
                            </p>
                          )
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(String(item.id), item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(String(item.id), item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingItem(editingItem === Number(item.id) ? null : Number(item.id))}
                          className="text-blue-500 hover:text-blue-700 h-8"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 h-8"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Delivery Instructions */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Delivery Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Any special delivery instructions? (e.g., Ring the bell, Leave at door, etc.)"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                rows={3}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </CardContent>
          </Card>

          {/* Coupons */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center dark:text-white">
                <Tag className="h-5 w-5 mr-2" />
                Offers & Coupons
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <Badge className="bg-green-500">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Applied
                    </Badge>
                    <div className="ml-2">
                      <p className="font-medium text-green-800 dark:text-green-300">{appliedCoupon.title}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">-₹{discount}</span>
                    <Button size="sm" variant="ghost" onClick={removeCoupon}>
                      ✕
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      onKeyPress={(e) => e.key === "Enter" && applyPromoCode()}
                    />
                    <Button
                      onClick={applyPromoCode}
                      variant="outline"
                      disabled={isApplyingCoupon || !promoCode.trim()}
                      className="min-w-[80px] bg-transparent"
                    >
                      {isApplyingCoupon ? "..." : "Apply"}
                    </Button>
                  </div>

                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-orange-500"
                    >
                      View Available Offers
                    </Button>

                    <AnimatePresence>
                      {showCoupons && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 space-y-2"
                        >
                          {AVAILABLE_COUPONS.filter((coupon) => coupon.isActive).map((coupon) => (
                            <div
                              key={coupon.id}
                              className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors"
                              onClick={() => applyCoupon(coupon)}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium dark:text-white">{coupon.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{coupon.description}</p>
                                  {coupon.minOrder && (
                                    <p className="text-xs text-orange-500 mt-1">Min order: ₹{coupon.minOrder}</p>
                                  )}
                                </div>
                                <Badge variant="outline">{coupon.id}</Badge>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bill Summary */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Bill Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="dark:text-gray-300">Item Total</span>
                <span className="dark:text-white">₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="dark:text-gray-300">Delivery Fee</span>
                <span className="dark:text-white">
                  {deliveryFee === 0 ? <span className="text-green-600">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="dark:text-gray-300">Platform Fee</span>
                <span className="dark:text-white">₹{platformFee}</span>
              </div>

              <div className="flex justify-between">
                <span className="dark:text-gray-300">GST</span>
                <span className="dark:text-white">₹{gst}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span className="dark:text-white">Total</span>
                <span className="dark:text-white">₹{total}</span>
              </div>

              {subtotal < 300 && (
                <p className="text-xs text-orange-600 dark:text-orange-400">
                  Add ₹{300 - subtotal} more to get free delivery!
                </p>
              )}
            </CardContent>
          </Card>

          {/* Delivery Info */}
          <Card className="dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium dark:text-white">123 Main St, Apt 4B</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mumbai, Maharashtra 400001</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/address/change">Change</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-3 mt-3 pt-3 border-t dark:border-gray-600">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium dark:text-white">Estimated Delivery</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">25-35 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              asChild
            >
              <Link href="/payment">
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Payment • ₹{total}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
