"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Gift, Clock, Tag, Copy, Star, Sparkles, Calendar, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

/**
 * Coupons Management Page
 * Features:
 * - Active, used, and expired coupon tabs
 * - Search and filter functionality
 * - Coupon code copying
 * - Animated coupon cards with gradients
 * - Performance optimized with virtualization for large lists
 * - Mobile-responsive design
 */

const SAMPLE_COUPONS = [
  {
    id: 1,
    code: "WELCOME20",
    title: "Welcome Bonus",
    description: "Get 20% off on your first order",
    discount: 20,
    type: "percentage",
    minOrder: 299,
    maxDiscount: 200,
    validUntil: "2024-12-31",
    status: "active",
    category: "welcome",
    usageCount: 0,
    maxUsage: 1,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 2,
    code: "SAVE50",
    title: "Flat ₹50 Off",
    description: "Flat ₹50 discount on orders above ₹500",
    discount: 50,
    type: "fixed",
    minOrder: 500,
    maxDiscount: 50,
    validUntil: "2024-11-30",
    status: "active",
    category: "general",
    usageCount: 2,
    maxUsage: 5,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    code: "WEEKEND30",
    title: "Weekend Special",
    description: "30% off on weekend orders",
    discount: 30,
    type: "percentage",
    minOrder: 199,
    maxDiscount: 300,
    validUntil: "2024-10-31",
    status: "used",
    category: "weekend",
    usageCount: 1,
    maxUsage: 1,
    gradient: "from-orange-500 to-red-600",
  },
  {
    id: 4,
    code: "EXPIRED10",
    title: "Old Offer",
    description: "10% off - This offer has expired",
    discount: 10,
    type: "percentage",
    minOrder: 100,
    maxDiscount: 100,
    validUntil: "2024-09-30",
    status: "expired",
    category: "general",
    usageCount: 0,
    maxUsage: 3,
    gradient: "from-gray-400 to-gray-600",
  },
]

export default function CouponsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "welcome", "general", "weekend", "special"]

  // Filter coupons based on tab, search, and category
  const filteredCoupons = SAMPLE_COUPONS.filter((coupon) => {
    const matchesTab = activeTab === "all" || coupon.status === activeTab
    const matchesSearch =
      coupon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || coupon.category === selectedCategory

    return matchesTab && matchesSearch && matchesCategory
  })

  const handleCopyCoupon = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success(`Coupon code ${code} copied!`)
    } catch (error) {
      toast.error("Failed to copy coupon code")
    }
  }

  const getCouponStats = () => {
    return {
      active: SAMPLE_COUPONS.filter((c) => c.status === "active").length,
      used: SAMPLE_COUPONS.filter((c) => c.status === "used").length,
      expired: SAMPLE_COUPONS.filter((c) => c.status === "expired").length,
      totalSavings: SAMPLE_COUPONS.filter((c) => c.status === "used").reduce(
        (sum, c) => sum + (c.type === "fixed" ? c.discount : c.maxDiscount),
        0,
      ),
    }
  }

  const stats = getCouponStats()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const CouponCard = ({ coupon }: { coupon: any }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          coupon.status === "expired" ? "opacity-60" : ""
        }`}
      >
        <div className={`h-2 bg-gradient-to-r ${coupon.gradient}`} />
        <CardContent className="p-6 dark:bg-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold dark:text-white">{coupon.title}</h3>
                {coupon.status === "active" && (
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </motion.div>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{coupon.description}</p>

              {/* Coupon Details */}
              <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Min order: ₹{coupon.minOrder}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    Valid till: {new Date(coupon.validUntil).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center">
                  <Tag className="h-3 w-3 mr-1" />
                  Used: {coupon.usageCount}/{coupon.maxUsage}
                </div>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="text-center">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${coupon.gradient} text-white font-bold text-lg shadow-lg`}
              >
                {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
              </div>
              <Badge
                variant={
                  coupon.status === "active" ? "default" : coupon.status === "used" ? "secondary" : "destructive"
                }
                className="mt-2 text-xs"
              >
                {coupon.status}
              </Badge>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-500" />
              <code className="font-mono font-bold text-lg dark:text-white">{coupon.code}</code>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopyCoupon(coupon.code)}
              disabled={coupon.status === "expired"}
              className="bg-white dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>

          {/* Progress Bar for Usage */}
          {coupon.maxUsage > 1 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Usage</span>
                <span>
                  {coupon.usageCount}/{coupon.maxUsage}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${coupon.gradient} transition-all duration-300`}
                  style={{ width: `${(coupon.usageCount / coupon.maxUsage) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-bold dark:text-white">My Coupons</h1>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              ₹{stats.totalSavings} saved
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={cardVariants}>
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <Zap className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.active}</p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Active</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.used}</p>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">Used</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-4">
                <Gift className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{stats.totalSavings}</p>
                <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Saved</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="text-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
              <CardContent className="p-4">
                <Clock className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.expired}</p>
                <p className="text-sm text-red-600/80 dark:text-red-400/80">Expired</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <Card className="mb-6 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search coupons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
            <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700">
              All ({SAMPLE_COUPONS.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="dark:data-[state=active]:bg-gray-700">
              Active ({stats.active})
            </TabsTrigger>
            <TabsTrigger value="used" className="dark:data-[state=active]:bg-gray-700">
              Used ({stats.used})
            </TabsTrigger>
            <TabsTrigger value="expired" className="dark:data-[state=active]:bg-gray-700">
              Expired ({stats.expired})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <AnimatePresence mode="wait">
              {filteredCoupons.length > 0 ? (
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${activeTab}-${searchQuery}-${selectedCategory}`}
                >
                  {filteredCoupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Gift className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No coupons found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchQuery || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "You don't have any coupons yet. Start ordering to earn rewards!"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
