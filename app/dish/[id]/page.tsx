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
  Heart,
  ShoppingCart,
  Share2,
  Camera,
  TrendingUp,
  Users,
  ChefHat,
  Flame,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { useParams } from "next/navigation"
import { PriceComparison } from "@/components/ui/price-comparison"

const DISH_DATA = {
  id: 1,
  name: "Truffle Mushroom Risotto",
  restaurant: "Bella Vista",
  restaurantId: 1,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600&text=Image2",
    "/placeholder.svg?height=400&width=600&text=Image3",
  ],
  price: 899,
  originalPrice: 999,
  rating: 4.8,
  reviewCount: 234,
  description:
    "Creamy arborio rice cooked with wild mushrooms, truffle oil, and fresh parmesan cheese. A luxurious Italian classic that melts in your mouth.",
  ingredients: [
    "Arborio Rice",
    "Wild Mushrooms",
    "Truffle Oil",
    "Parmesan Cheese",
    "White Wine",
    "Vegetable Stock",
    "Onions",
    "Garlic",
  ],
  allergens: ["Dairy", "Gluten"],
  nutritionInfo: {
    calories: 520,
    protein: "18g",
    carbs: "65g",
    fat: "22g",
    fiber: "4g",
  },
  tags: ["Vegetarian", "Italian", "Creamy", "Premium"],
  deliveryTime: "25-35 min",
  distance: "0.8 km",
  isVeg: true,
  spiceLevel: 1, // 1-5 scale
  servingSize: "1 person",
  preparationTime: "20 min",
  chefSpecial: true,
  userImages: [
    "/placeholder.svg?height=200&width=200&text=User1",
    "/placeholder.svg?height=200&width=200&text=User2",
    "/placeholder.svg?height=200&width=200&text=User3",
  ],
}

const SIMILAR_DISHES = [
  {
    id: 2,
    name: "Mushroom Pasta",
    restaurant: "Bella Vista",
    image: "/placeholder.svg?height=150&width=150",
    price: 650,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Seafood Risotto",
    restaurant: "Bella Vista",
    image: "/placeholder.svg?height=150&width=150",
    price: 1200,
    rating: 4.7,
  },
]

const REVIEWS = [
  {
    id: 1,
    user: "Priya Sharma",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely divine! The truffle aroma was incredible and the texture was perfect. Worth every penny!",
    helpful: 15,
    images: ["/placeholder.svg?height=100&width=100&text=Review1"],
  },
  {
    id: 2,
    user: "Rahul Kumar",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 week ago",
    comment: "Great taste but portion could be bigger for the price. Still recommended!",
    helpful: 8,
  },
]

export default function DishPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("details")
  const [showPriceComparison, setShowPriceComparison] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % DISH_DATA.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + DISH_DATA.images.length) % DISH_DATA.images.length)
  }

  const addToCart = () => {
    // Handle add to cart
    console.log(`Added ${quantity} x ${DISH_DATA.name} to cart`)
  }

  const SpiceIndicator = ({ level }: { level: number }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Flame key={i} className={`h-3 w-3 ${i < level ? "text-red-500 fill-red-500" : "text-gray-300"}`} />
      ))}
    </div>
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
              <h1 className="text-xl font-bold dark:text-white truncate">{DISH_DATA.name}</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Image Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="dark:bg-gray-800 overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <Image
                src={DISH_DATA.images[currentImageIndex] || "/placeholder.svg"}
                alt={DISH_DATA.name}
                fill
                className="object-cover"
              />

              {/* Chef Special Badge */}
              {DISH_DATA.chefSpecial && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-purple-500 text-white flex items-center space-x-1">
                    <ChefHat className="h-3 w-3" />
                    <span>Chef's Special</span>
                  </Badge>
                </div>
              )}

              {/* Veg/Non-veg Indicator */}
              <div className="absolute top-4 right-4">
                <div
                  className={`w-6 h-6 rounded border-2 ${DISH_DATA.isVeg ? "border-green-500" : "border-red-500"} bg-white flex items-center justify-center`}
                >
                  <div className={`w-3 h-3 rounded ${DISH_DATA.isVeg ? "bg-green-500" : "bg-red-500"}`}></div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {DISH_DATA.images.length > 1 && (
                <>
                  <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                    onClick={prevImage}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                    onClick={nextImage}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {DISH_DATA.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Rating Badge */}
              <div className="absolute bottom-4 right-4">
                <Badge className="bg-white/90 text-gray-800 flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{DISH_DATA.rating}</span>
                </Badge>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dish Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold dark:text-white mb-2">{DISH_DATA.name}</h1>
                  <Link
                    href={`/restaurant/${DISH_DATA.restaurantId}`}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    {DISH_DATA.restaurant}
                  </Link>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-2xl font-bold text-orange-500">₹{DISH_DATA.price}</span>
                    {DISH_DATA.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">₹{DISH_DATA.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    {DISH_DATA.rating} ({DISH_DATA.reviewCount} reviews)
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">{DISH_DATA.description}</p>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="dark:text-gray-300">{DISH_DATA.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="dark:text-gray-300">{DISH_DATA.distance}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="dark:text-gray-300">{DISH_DATA.servingSize}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-400">Spice:</span>
                  <SpiceIndicator level={DISH_DATA.spiceLevel} />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {DISH_DATA.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="font-medium dark:text-white px-3">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                  <Button onClick={() => setShowPriceComparison(true)} variant="outline" size="sm">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Compare Prices
                  </Button>
                </div>
                <Button
                  onClick={addToCart}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart - ₹{DISH_DATA.price * quantity}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800">
            <TabsTrigger value="details" className="dark:data-[state=active]:bg-gray-700">
              Details
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="dark:data-[state=active]:bg-gray-700">
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="reviews" className="dark:data-[state=active]:bg-gray-700">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="photos" className="dark:data-[state=active]:bg-gray-700">
              Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {DISH_DATA.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Allergen Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {DISH_DATA.allergens.map((allergen) => (
                    <Badge key={allergen} variant="destructive">
                      {allergen}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Similar Dishes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SIMILAR_DISHES.map((dish) => (
                    <Link key={dish.id} href={`/dish/${dish.id}`}>
                      <Card className="hover:shadow-lg transition-shadow dark:bg-gray-700">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <Image
                                src={dish.image || "/placeholder.svg"}
                                alt={dish.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold dark:text-white">{dish.name}</h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{dish.restaurant}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="font-bold text-orange-500">₹{dish.price}</span>
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                  <span className="text-sm dark:text-gray-300">{dish.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Nutritional Information</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">Per serving ({DISH_DATA.servingSize})</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-orange-500">{DISH_DATA.nutritionInfo.calories}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-blue-500">{DISH_DATA.nutritionInfo.protein}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-green-500">{DISH_DATA.nutritionInfo.carbs}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-purple-500">{DISH_DATA.nutritionInfo.fat}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-500">{DISH_DATA.nutritionInfo.fiber}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Fiber</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                        <p className="text-gray-600 dark:text-gray-300 mb-3">{review.comment}</p>
                        {review.images && (
                          <div className="flex space-x-2 mb-3">
                            {review.images.map((image, index) => (
                              <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Review image ${index + 1}`}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
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

          <TabsContent value="photos" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Camera className="h-5 w-5 mr-2" />
                  User Photos ({DISH_DATA.userImages.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {DISH_DATA.userImages.map((image, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`User photo ${index + 1}`}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Price Comparison Modal */}
      <PriceComparison
        dishId={DISH_DATA.id}
        dishName={DISH_DATA.name}
        isOpen={showPriceComparison}
        onClose={() => setShowPriceComparison(false)}
      />
    </div>
  )
}
