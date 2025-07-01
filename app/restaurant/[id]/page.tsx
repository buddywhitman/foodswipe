"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Phone,
  Share2,
  Heart,
  ShoppingCart,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useParams } from "next/navigation"

const RESTAURANT_DATA = {
  id: 1,
  name: "Paradise Restaurant",
  image: "/placeholder.svg?height=300&width=600",
  logo: "/placeholder.svg?height=100&width=100",
  rating: 4.5,
  reviewCount: 2847,
  cuisine: "Biryani, North Indian, Mughlai",
  deliveryTime: "25-30 min",
  distance: "1.2 km",
  deliveryFee: 25,
  address: "123 MG Road, Bangalore, Karnataka 560001",
  phone: "+91 98765 43210",
  offers: [
    { id: 1, title: "20% OFF", description: "On orders above ₹299", code: "SAVE20" },
    { id: 2, title: "Free Delivery", description: "On orders above ₹199", code: "FREEDEL" },
  ],
  tags: ["Pure Veg", "Family Restaurant", "Outdoor Seating"],
  description:
    "Authentic Hyderabadi cuisine with the finest biryanis and kebabs. Family-owned restaurant serving traditional recipes for over 50 years.",
  hours: {
    monday: "11:00 AM - 11:00 PM",
    tuesday: "11:00 AM - 11:00 PM",
    wednesday: "11:00 AM - 11:00 PM",
    thursday: "11:00 AM - 11:00 PM",
    friday: "11:00 AM - 11:30 PM",
    saturday: "11:00 AM - 11:30 PM",
    sunday: "11:00 AM - 11:00 PM",
  },
}

const MENU_ITEMS = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken pieces and traditional spices",
    price: 350,
    originalPrice: 400,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.6,
    category: "Biryani",
    tags: ["Bestseller", "Spicy"],
    isVeg: false,
  },
  {
    id: 2,
    name: "Mutton Biryani",
    description: "Premium mutton pieces slow-cooked with fragrant basmati rice",
    price: 450,
    originalPrice: 500,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.8,
    category: "Biryani",
    tags: ["Premium", "Spicy"],
    isVeg: false,
  },
  {
    id: 3,
    name: "Veg Biryani",
    description: "Mixed vegetables and paneer cooked with aromatic rice and spices",
    price: 280,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.3,
    category: "Biryani",
    tags: ["Vegetarian"],
    isVeg: true,
  },
  {
    id: 4,
    name: "Chicken Tikka",
    description: "Tender chicken pieces marinated in yogurt and spices, grilled to perfection",
    price: 320,
    image: "/placeholder.svg?height=150&width=150",
    rating: 4.5,
    category: "Starters",
    tags: ["Grilled"],
    isVeg: false,
  },
]

const REVIEWS = [
  {
    id: 1,
    user: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing biryani! The chicken was perfectly cooked and the rice was aromatic. Definitely ordering again.",
    helpful: 12,
  },
  {
    id: 2,
    user: "Rahul Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 week ago",
    comment: "Good food quality but delivery was a bit delayed. Overall satisfied with the taste.",
    helpful: 8,
  },
]

export default function RestaurantPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("menu")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({})
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", ...Array.from(new Set(MENU_ITEMS.map((item) => item.category)))]

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [itemId, count]) => {
      const item = MENU_ITEMS.find((i) => i.id === Number.parseInt(itemId))
      return total + (item ? item.price * count : 0)
    }, 0)
  }

  const MenuItem = ({ item }: { item: any }) => (
    <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold dark:text-white">{item.name}</h3>
                  <div className={`w-3 h-3 rounded border-2 ${item.isVeg ? "border-green-500" : "border-red-500"}`}>
                    <div className={`w-full h-full rounded ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                  </div>
                  {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-orange-500">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {cartItems[item.id] ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="font-medium dark:text-white">{cartItems[item.id]}</span>
                        <Button
                          size="sm"
                          onClick={() => addToCart(item.id)}
                          className="h-8 w-8 p-0 bg-orange-500 hover:bg-orange-600"
                        >
                          +
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => addToCart(item.id)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
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
              <h1 className="text-xl font-bold dark:text-white truncate">{RESTAURANT_DATA.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Restaurant Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="dark:bg-gray-800 overflow-hidden">
            <div className="relative h-48 sm:h-64">
              <Image
                src={RESTAURANT_DATA.image || "/placeholder.svg"}
                alt={RESTAURANT_DATA.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white">
                  <Image
                    src={RESTAURANT_DATA.logo || "/placeholder.svg"}
                    alt={`${RESTAURANT_DATA.name} logo`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold">{RESTAURANT_DATA.name}</h1>
                  <p className="text-sm opacity-90">{RESTAURANT_DATA.cuisine}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold dark:text-white">{RESTAURANT_DATA.rating}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({RESTAURANT_DATA.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{RESTAURANT_DATA.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{RESTAURANT_DATA.distance}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {RESTAURANT_DATA.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">{RESTAURANT_DATA.description}</p>

              {/* Offers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {RESTAURANT_DATA.offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-300">{offer.title}</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{offer.description}</p>
                      </div>
                      <Badge className="bg-green-500 text-white">{offer.code}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
            <TabsTrigger value="menu" className="dark:data-[state=active]:bg-gray-700">
              Menu
            </TabsTrigger>
            <TabsTrigger value="reviews" className="dark:data-[state=active]:bg-gray-700">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="info" className="dark:data-[state=active]:bg-gray-700">
              Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Categories */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="grid gap-4">
              {REVIEWS.map((review) => (
                <Card key={review.id} className="dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold dark:text-white">{review.user}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <button className="hover:text-gray-700 dark:hover:text-gray-200">
                            👍 Helpful ({review.helpful})
                          </button>
                          <button className="hover:text-gray-700 dark:hover:text-gray-200">Reply</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-6">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="dark:text-gray-200">{RESTAURANT_DATA.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span className="dark:text-gray-200">{RESTAURANT_DATA.phone}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Opening Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(RESTAURANT_DATA.hours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="capitalize dark:text-gray-200">{day}</span>
                        <span className="dark:text-gray-300">{hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Cart */}
      {getTotalItems() > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-4 left-4 right-4 z-50"
        >
          <Card className="bg-orange-500 text-white border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{getTotalItems()} items added</p>
                  <p className="text-sm opacity-90">₹{getTotalPrice()}</p>
                </div>
                <Button asChild className="bg-white text-orange-500 hover:bg-gray-100">
                  <Link href="/cart">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Cart
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
