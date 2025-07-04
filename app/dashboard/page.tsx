"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SwipeCard } from "@/components/ui/swipe-card"
import { LocationSelector } from "@/components/ui/location-selector"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Users,
  ShoppingCart,
  Settings,
  History,
  ChefHat,
  Filter,
  Search,
  Plus,
  Bell,
  TrendingUp,
  User,
  LogOut,
  UserPlus,
  Shield,
  Truck,
  CreditCard,
  Gift,
  Heart,
  EyeOff,
  PlusCircle,
  Home,
  UserCheck,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-context"

// Enhanced mock data with recommendation reasons
const SAMPLE_DISHES = [
  {
    id: 1,
    name: "Truffle Mushroom Risotto",
    restaurant: "Bella Vista",
    restaurantId: 1,
    images: [
      "/placeholder.svg?height=500&width=400",
      "/placeholder.svg?height=500&width=400&text=Image2",
      "/placeholder.svg?height=500&width=400&text=Image3",
    ],
    price: 899,
    rating: 4.8,
    tags: ["Vegetarian", "Italian", "Creamy"],
    description: "Creamy arborio rice with wild mushrooms and truffle oil, garnished with fresh parmesan",
    deliveryTime: "25-35 min",
    distance: "0.8 km",
    friendActivity: {
      liked: true,
      ordered: false,
      friendName: "Priya",
      friendAvatar: "/placeholder.svg?height=32&width=32",
    },
    userImages: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    compareAvailable: true,
    recommendationReason:
      "You ordered Mushroom Pasta last week and loved creamy Italian dishes. This risotto has similar flavors with premium truffle oil!",
  },
  {
    id: 2,
    name: "Butter Chicken",
    restaurant: "Punjabi Dhaba",
    restaurantId: 2,
    images: ["/placeholder.svg?height=500&width=400", "/placeholder.svg?height=500&width=400&text=Image2"],
    price: 450,
    rating: 4.9,
    tags: ["North Indian", "Spicy", "Protein-Rich"],
    description: "Tender chicken in rich tomato and butter gravy, served with basmati rice",
    deliveryTime: "20-30 min",
    distance: "1.2 km",
    friendActivity: {
      liked: false,
      ordered: true,
      friendName: "Rahul",
      friendAvatar: "/placeholder.svg?height=32&width=32",
    },
    compareAvailable: true,
    recommendationReason:
      "Based on your preference for spicy North Indian food and 5-star rating for Chicken Tikka Masala. This is the restaurant's signature dish!",
  },
  {
    id: 3,
    name: "Masala Dosa",
    restaurant: "South Indian Corner",
    restaurantId: 3,
    images: ["/placeholder.svg?height=500&width=400"],
    price: 180,
    rating: 4.6,
    tags: ["South Indian", "Vegan", "Breakfast"],
    description: "Crispy rice crepe filled with spiced potato curry, served with coconut chutney and sambar",
    deliveryTime: "15-25 min",
    distance: "0.5 km",
    userImages: ["/placeholder.svg?height=100&width=100"],
    compareAvailable: true,
    recommendationReason:
      "Perfect for your morning cravings! You frequently order breakfast items between 8-11 AM, and this is highly rated in your area.",
  },
  {
    id: 4,
    name: "Chocolate Brownie",
    restaurant: "Sweet Treats",
    restaurantId: 4,
    images: ["/placeholder.svg?height=500&width=400", "/placeholder.svg?height=500&width=400&text=Image2"],
    price: 250,
    rating: 4.7,
    tags: ["Dessert", "Chocolate", "Sweet"],
    description: "Rich, fudgy chocolate brownie topped with vanilla ice cream and chocolate sauce",
    deliveryTime: "10-20 min",
    distance: "0.3 km",
    compareAvailable: false,
    recommendationReason:
      "You've been ordering desserts more frequently this month, and chocolate items are your top choice based on your order history.",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [currentDishIndex, setCurrentDishIndex] = useState(0)
  const [likedDishes, setLikedDishes] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [location, setLocation] = useState<{ city: string; country: string; currency: string } | undefined>(undefined)
  const [dishes, setDishes] = useState(SAMPLE_DISHES)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [hiddenRestaurants, setHiddenRestaurants] = useState<number[]>([])

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    cuisines: [] as string[],
    dietary: [] as string[],
    deliveryTime: 60,
  })

  // Add this line to use the global cart context
  const { addToCart } = useCart()

  const CUISINES = ["Italian", "North Indian", "South Indian", "Chinese", "Thai", "Mexican", "American"]
  const DIETARY = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Halal"]

  const handleSwipe = (direction: "left" | "right", dishId: number) => {
    if (direction === "right") {
      setLikedDishes((prev) => [...prev, dishId])
      // Use addToCart from context
      const dish = dishes.find((d) => d.id === dishId)
      if (dish) {
        addToCart({
          id: dish.id.toString(),
          name: dish.name,
          price: dish.price,
          image: dish.images?.[0],
          quantity: 1,
          customizations: [],
          selectedExtras: [],
          availableExtras: [],
          specialInstructions: "",
        })
      }
    }

    // Move to next dish with animation
    setTimeout(() => {
      if (currentDishIndex < filteredDishes.length - 1) {
        setCurrentDishIndex(currentDishIndex + 1)
      } else {
        // Reset to first dish for demo
        setCurrentDishIndex(0)
      }
    }, 300)
  }

  const handleAddToCart = (dishId: number) => {
    const dish = dishes.find((d) => d.id === dishId)
    if (dish) {
      addToCart({
        id: dish.id.toString(),
        name: dish.name,
        price: dish.price,
        image: dish.images?.[0],
        quantity: 1,
        customizations: [],
        selectedExtras: [],
        availableExtras: [],
        specialInstructions: "",
      })
    }
  }

  const handleCompare = (dishId: number) => {
    router.push(`/compare/dish/${dishId}`)
  }

  const handlePriceCompare = (dishId: number) => {
    router.push(`/compare/price/${dishId}`)
  }

  const handleHideRestaurant = (restaurantId: number) => {
    setHiddenRestaurants((prev) => [...prev, restaurantId])
  }

  const handleReportDish = (dishId: number) => {
    // Handle dish reporting
    console.log("Reporting dish:", dishId)
  }

  const handleLogout = () => {
    // Handle logout
    router.push("/auth/signin")
  }

  // Apply filters
  const filteredDishes = dishes.filter((dish) => {
    // Price filter
    if (dish.price < filters.priceRange[0] || dish.price > filters.priceRange[1]) return false

    // Rating filter
    if (dish.rating < filters.rating) return false

    // Cuisine filter
    if (filters.cuisines.length > 0 && !filters.cuisines.some((cuisine) => dish.tags.includes(cuisine))) return false

    // Dietary filter
    if (filters.dietary.length > 0 && !filters.dietary.some((diet) => dish.tags.includes(diet))) return false

    // Delivery time filter (convert "25-35 min" to number)
    const deliveryMinutes = Number.parseInt(dish.deliveryTime.split("-")[1] || dish.deliveryTime.split(" ")[0])
    if (deliveryMinutes > filters.deliveryTime) return false

    // Hidden restaurants filter
    if (hiddenRestaurants.includes(dish.restaurantId)) return false

    return true
  })

  const visibleDishes = filteredDishes.slice(currentDishIndex, currentDishIndex + 3)

  const toggleCuisineFilter = (cuisine: string) => {
    setFilters((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }))
  }

  const toggleDietaryFilter = (dietary: string) => {
    setFilters((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(dietary) ? prev.dietary.filter((d) => d !== dietary) : [...prev.dietary, dietary],
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      rating: 0,
      cuisines: [],
      dietary: [],
      deliveryTime: 60,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Top Navigation - Responsive */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  FoodSwipe
                </span>
              </div>
              <LocationSelector onLocationChange={setLocation} currentLocation={location} />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="hidden sm:flex">
                <Filter className="h-4 w-4" />
                {(filters.cuisines.length > 0 || filters.dietary.length > 0 || filters.rating > 0) && (
                  <Badge className="ml-1 bg-orange-500 text-white text-xs">
                    {filters.cuisines.length + filters.dietary.length + (filters.rating > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/search">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {likedDishes.length > 0 && (
                    <Badge className="ml-1 bg-orange-500 text-white text-xs">{likedDishes.length}</Badge>
                  )}
                </Link>
              </Button>
              <ThemeToggle />

              {/* Profile Sheet */}
              <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80 dark:bg-gray-800 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="dark:text-white">Profile & Settings</SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    {/* User Info */}
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold dark:text-white">John Doe</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
                        <Badge variant="outline" className="mt-1">
                          Premium Member
                        </Badge>
                      </div>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-orange-500">{likedDishes.length}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Liked</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-500">8</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-500">12</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Friends</p>
                      </div>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    {/* Menu Items */}
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/profile/edit">
                          <User className="h-4 w-4 mr-3" />
                          Edit Profile
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/addresses">
                          <Home className="h-4 w-4 mr-3" />
                          Manage Addresses
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/friends/add">
                          <UserPlus className="h-4 w-4 mr-3" />
                          Add Friends
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/friends/invite">
                          <UserCheck className="h-4 w-4 mr-3" />
                          Invite Friends (20% OFF)
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/orders">
                          <History className="h-4 w-4 mr-3" />
                          Order History
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/coupons">
                          <Gift className="h-4 w-4 mr-3" />
                          My Coupons
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/saved-dishes">
                          <Heart className="h-4 w-4 mr-3" />
                          Saved Dishes
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/payment-methods">
                          <CreditCard className="h-4 w-4 mr-3" />
                          Payment Methods
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/hidden-restaurants">
                          <EyeOff className="h-4 w-4 mr-3" />
                          Hidden Restaurants ({hiddenRestaurants.length})
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        className="w-full justify-start dark:text-gray-200 dark:hover:bg-gray-700"
                        asChild
                      >
                        <Link href="/settings">
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                      </Button>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    {/* Admin/Delivery Login Options */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Other Portals</p>

                      <Button
                        variant="outline"
                        className="w-full justify-start bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                        asChild
                      >
                        <Link href="/auth/admin">
                          <Shield className="h-4 w-4 mr-3" />
                          Admin Login
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full justify-start bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                        asChild
                      >
                        <Link href="/auth/delivery">
                          <Truck className="h-4 w-4 mr-3" />
                          Delivery Partner
                        </Link>
                      </Button>
                    </div>

                    <Separator className="dark:bg-gray-700" />

                    {/* Logout */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold dark:text-white">Filters</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                    <Button size="sm" onClick={() => setShowFilters(false)}>
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Price Range */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">
                      Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                    </Label>
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
                      max={1000}
                      step={50}
                      className="w-full"
                    />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Minimum Rating: {filters.rating}+</Label>
                    <Slider
                      value={[filters.rating]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, rating: value[0] }))}
                      max={5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Delivery Time */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Max Delivery Time: {filters.deliveryTime} min</Label>
                    <Slider
                      value={[filters.deliveryTime]}
                      onValueChange={(value) => setFilters((prev) => ({ ...prev, deliveryTime: value[0] }))}
                      max={60}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Quick Filters */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Quick Filters</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={filters.rating >= 4.5 ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setFilters((prev) => ({ ...prev, rating: prev.rating >= 4.5 ? 0 : 4.5 }))}
                      >
                        Top Rated
                      </Badge>
                      <Badge
                        variant={filters.deliveryTime <= 30 ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, deliveryTime: prev.deliveryTime <= 30 ? 60 : 30 }))
                        }
                      >
                        Fast Delivery
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cuisines */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Cuisines</Label>
                    <div className="flex flex-wrap gap-2">
                      {CUISINES.map((cuisine) => (
                        <Badge
                          key={cuisine}
                          variant={filters.cuisines.includes(cuisine) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleCuisineFilter(cuisine)}
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dietary */}
                  <div className="space-y-2">
                    <Label className="dark:text-gray-200">Dietary Preferences</Label>
                    <div className="flex flex-wrap gap-2">
                      {DIETARY.map((dietary) => (
                        <Badge
                          key={dietary}
                          variant={filters.dietary.includes(dietary) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleDietaryFilter(dietary)}
                        >
                          {dietary}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Swipe Area */}
          <div className="lg:col-span-2">
            <motion.div
              className="text-center mb-4 sm:mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-2 dark:text-white">Discover Your Next Meal</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Swipe right on dishes you love, left to pass
              </p>
              {filteredDishes.length !== dishes.length && (
                <p className="text-xs text-orange-500 mt-1">
                  Showing {filteredDishes.length} of {dishes.length} dishes
                </p>
              )}
            </motion.div>

            {/* Swipe Cards Container - Responsive */}
            <div className="relative max-w-sm sm:max-w-md mx-auto h-[600px] sm:h-[650px] lg:h-[700px]">
              <AnimatePresence>
                {visibleDishes.map((dish, index) => (
                  <SwipeCard
                    key={dish.id}
                    dish={dish}
                    onSwipe={handleSwipe}
                    onCompare={handleCompare}
                    onPriceCompare={handlePriceCompare}
                    onHideRestaurant={handleHideRestaurant}
                    onReportDish={handleReportDish}
                    isTop={index === 0}
                  />
                ))}
              </AnimatePresence>

              {/* No more cards message */}
              {(currentDishIndex >= filteredDishes.length || filteredDishes.length === 0) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Card className="p-6 sm:p-8 text-center dark:bg-gray-800">
                    <div className="text-4xl sm:text-6xl mb-4">{filteredDishes.length === 0 ? "🔍" : "🎉"}</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 dark:text-white">
                      {filteredDishes.length === 0 ? "No dishes match your filters" : "You've seen all dishes!"}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                      {filteredDishes.length === 0
                        ? "Try adjusting your filters to see more options"
                        : "Check back later for more recommendations"}
                    </p>
                    {filteredDishes.length === 0 ? (
                      <Button onClick={clearFilters} className="bg-gradient-to-r from-orange-500 to-red-500">
                        Clear Filters
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setCurrentDishIndex(0)}
                        className="bg-gradient-to-r from-orange-500 to-red-500"
                      >
                        Start Over
                      </Button>
                    )}
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar - Hidden on mobile, shown on larger screens */}
          <div className="space-y-4 sm:space-y-6 hidden lg:block">
            {/* Quick Actions */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white text-lg">
                    <Users className="h-5 w-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500" asChild>
                    <Link href="/group/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Start Group Session
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/group/join">Join Group Session</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/orders">
                      <History className="h-4 w-4 mr-2" />
                      Order History
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Likes */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Recent Likes</CardTitle>
                </CardHeader>
                <CardContent>
                  {likedDishes.length > 0 ? (
                    <div className="space-y-3">
                      {likedDishes.slice(-3).map((dishId) => {
                        const dish = dishes.find((d) => d.id === dishId)
                        return dish ? (
                          <motion.div
                            key={dishId}
                            className="flex items-center space-x-3"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                              <img
                                src={dish.images[0] || "/placeholder.svg"}
                                alt={dish.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate dark:text-white text-sm">{dish.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{dish.restaurant}</p>
                            </div>
                            <Button size="sm" variant="outline">
                              <ShoppingCart className="h-3 w-3" />
                            </Button>
                          </motion.div>                          
                        ) : null
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4 text-sm">
                      Start swiping to see your liked dishes here!
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Trending Now</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      North Indian dishes are 40% more popular in your area today
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Perfect Match</p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Based on your preferences, you'll love spicy dishes from Punjabi Dhaba
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Your Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">{likedDishes.length}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dishes Liked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Orders Placed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-500">₹2,450</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Saved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-500">4.8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Avg Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 lg:hidden z-40">
        <div className="grid grid-cols-5 gap-1 p-2">
          <Button variant="ghost" size="sm" className="flex flex-col items-center py-2">
            <ChefHat className="h-5 w-5" />
            <span className="text-xs mt-1">Discover</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center py-2" asChild>
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Search</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center py-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
            <span className="text-xs mt-1">Filter</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center py-2" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs mt-1">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center py-2" onClick={() => {
            const currentDish = dishes[currentDishIndex];
            if (currentDish) {
              handleAddToCart(currentDish.id);
            }
          }}>
            <PlusCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center py-2"
            onClick={() => setIsProfileOpen(true)}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
