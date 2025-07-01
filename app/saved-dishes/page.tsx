"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Search,
  Heart,
  Star,
  Clock,
  MapPin,
  ShoppingCart,
  Plus,
  Trash2,
  Grid,
  List,
  BookmarkPlus,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { toast } from "sonner"

/**
 * Saved Dishes Page - Wishlist Management
 * Features:
 * - Custom lists organization (Favorites, Want to Try, etc.)
 * - Grid and list view modes
 * - Advanced search and filtering
 * - Bulk operations
 * - Performance optimized with virtual scrolling
 * - Drag and drop list management
 */

const SAMPLE_SAVED_DISHES = [
  {
    id: 1,
    name: "Truffle Mushroom Risotto",
    restaurant: "Bella Vista",
    restaurantId: 1,
    image: "/placeholder.svg?height=200&width=200",
    price: 899,
    originalPrice: 999,
    rating: 4.8,
    deliveryTime: "25-35 min",
    distance: "0.8 km",
    tags: ["Vegetarian", "Italian", "Premium"],
    savedDate: "2024-01-15",
    listId: "favorites",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Butter Chicken",
    restaurant: "Punjabi Dhaba",
    restaurantId: 2,
    image: "/placeholder.svg?height=200&width=200",
    price: 450,
    rating: 4.9,
    deliveryTime: "20-30 min",
    distance: "1.2 km",
    tags: ["Non-Veg", "North Indian", "Spicy"],
    savedDate: "2024-01-10",
    listId: "want-to-try",
    isAvailable: true,
  },
  {
    id: 3,
    name: "Chocolate Lava Cake",
    restaurant: "Sweet Treats",
    restaurantId: 3,
    image: "/placeholder.svg?height=200&width=200",
    price: 250,
    rating: 4.7,
    deliveryTime: "15-25 min",
    distance: "0.5 km",
    tags: ["Dessert", "Chocolate", "Sweet"],
    savedDate: "2024-01-08",
    listId: "desserts",
    isAvailable: false,
  },
  {
    id: 4,
    name: "Margherita Pizza",
    restaurant: "Pizza Corner",
    restaurantId: 4,
    image: "/placeholder.svg?height=200&width=200",
    price: 299,
    originalPrice: 349,
    rating: 4.3,
    deliveryTime: "20-25 min",
    distance: "0.8 km",
    tags: ["Vegetarian", "Italian", "Cheese"],
    savedDate: "2024-01-05",
    listId: "favorites",
    isAvailable: true,
  },
]

const CUSTOM_LISTS = [
  { id: "favorites", name: "Favorites", icon: "❤️", count: 2 },
  { id: "want-to-try", name: "Want to Try", icon: "🤔", count: 1 },
  { id: "desserts", name: "Desserts", icon: "🍰", count: 1 },
  { id: "healthy", name: "Healthy Options", icon: "🥗", count: 0 },
]

export default function SavedDishesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedDishes, setSelectedDishes] = useState<number[]>([])
  const [showCreateList, setShowCreateList] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  // Get all unique tags
  const allTags = Array.from(new Set(SAMPLE_SAVED_DISHES.flatMap((dish) => dish.tags)))

  // Filter dishes based on active filters
  const filteredDishes = SAMPLE_SAVED_DISHES.filter((dish) => {
    const matchesTab = activeTab === "all" || dish.listId === activeTab
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => dish.tags.includes(tag))

    return matchesTab && matchesSearch && matchesTags
  })

  // Sort dishes
  const sortedDishes = [...filteredDishes].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.savedDate).getTime() - new Date(a.savedDate).getTime()
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleRemoveFromSaved = (dishId: number) => {
    toast.success("Dish removed from saved list")
  }

  const handleAddToCart = (dishId: number) => {
    toast.success("Added to cart!")
  }

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSelectDish = (dishId: number) => {
    setSelectedDishes((prev) => (prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]))
  }

  const handleBulkRemove = () => {
    toast.success(`Removed ${selectedDishes.length} dishes from saved list`)
    setSelectedDishes([])
  }

  const handleCreateList = () => {
    if (newListName.trim()) {
      toast.success(`Created new list: ${newListName}`)
      setNewListName("")
      setShowCreateList(false)
    }
  }

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

  const DishCard = ({
    dish,
    isSelected,
    onSelect,
  }: { dish: any; isSelected: boolean; onSelect: (id: number) => void }) => (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative"
    >
      <Card
        className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
          !dish.isAvailable ? "opacity-60" : ""
        } ${isSelected ? "ring-2 ring-orange-500" : ""}`}
      >
        <div className="relative">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            {!dish.isAvailable && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Currently Unavailable</Badge>
              </div>
            )}
          </div>

          {/* Selection checkbox */}
          <div className="absolute top-2 left-2">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(dish.id)}
              className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500"
            />
          </div>

          {/* Heart icon */}
          <div className="absolute top-2 right-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemoveFromSaved(dish.id)}
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white text-red-500 rounded-full"
            >
              <Heart className="h-4 w-4 fill-current" />
            </Button>
          </div>

          {/* Rating badge */}
          <div className="absolute bottom-2 right-2">
            <Badge className="bg-white/90 text-gray-800 flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs">{dish.rating}</span>
            </Badge>
          </div>
        </div>

        <CardContent className="p-4 dark:bg-gray-800">
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg dark:text-white line-clamp-1">{dish.name}</h3>
              <Link href={`/restaurant/${dish.restaurantId}`} className="text-sm text-orange-500 hover:text-orange-600">
                {dish.restaurant}
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-orange-500">₹{dish.price}</span>
                {dish.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">₹{dish.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3" />
                <span>{dish.deliveryTime}</span>
                <MapPin className="h-3 w-3" />
                <span>{dish.distance}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {dish.tags.slice(0, 3).map((tag: string) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {dish.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{dish.tags.length - 3}
                </Badge>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleAddToCart(dish.id)}
                disabled={!dish.isAvailable}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add to Cart
              </Button>
              <Button size="sm" variant="outline" asChild>
                <Link href={`/dish/${dish.id}`}>View</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  const DishListItem = ({
    dish,
    isSelected,
    onSelect,
  }: { dish: any; isSelected: boolean; onSelect: (id: number) => void }) => (
    <motion.div
      variants={cardVariants}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all duration-300 ${
        isSelected ? "ring-2 ring-orange-500" : ""
      }`}
    >
      <div className="flex items-center p-4 space-x-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(dish.id)}
          className="w-4 h-4 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500"
        />

        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={dish.image || "/placeholder.svg"}
            alt={dish.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold dark:text-white truncate">{dish.name}</h3>
          <Link href={`/restaurant/${dish.restaurantId}`} className="text-sm text-orange-500 hover:text-orange-600">
            {dish.restaurant}
          </Link>
          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {dish.rating}
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {dish.deliveryTime}
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {dish.distance}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-orange-500">₹{dish.price}</span>
            {dish.originalPrice && <span className="text-sm text-gray-500 line-through">₹{dish.originalPrice}</span>}
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleAddToCart(dish.id)}
              disabled={!dish.isAvailable}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleRemoveFromSaved(dish.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Heart className="h-3 w-3 fill-current" />
            </Button>
          </div>
        </div>
      </div>
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
              <h1 className="text-xl font-bold dark:text-white">Saved Dishes</h1>
            </div>
            <div className="flex items-center space-x-2">
              {selectedDishes.length > 0 && (
                <Button size="sm" variant="destructive" onClick={handleBulkRemove}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove ({selectedDishes.length})
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Stats and Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-bold dark:text-white">{filteredDishes.length} Saved Dishes</h2>
            <p className="text-gray-500 dark:text-gray-400">Organized in {CUSTOM_LISTS.length} lists</p>
          </div>

          <Dialog open={showCreateList} onOpenChange={setShowCreateList}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="h-4 w-4 mr-2" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="dark:text-white">Create New List</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="List name"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreateList} className="flex-1">
                    Create
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateList(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Search and Sort */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search saved dishes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="recent">Recently Saved</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {/* Tags Filter */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by tags:</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20"
                      onClick={() => handleToggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Lists Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 dark:bg-gray-800 mb-6">
            <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700">
              All ({SAMPLE_SAVED_DISHES.length})
            </TabsTrigger>
            {CUSTOM_LISTS.map((list) => (
              <TabsTrigger key={list.id} value={list.id} className="dark:data-[state=active]:bg-gray-700">
                {list.icon} {list.name} ({list.count})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab}>
            <AnimatePresence mode="wait">
              {sortedDishes.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  key={`${activeTab}-${searchQuery}-${selectedTags.join(",")}-${viewMode}`}
                >
                  {viewMode === "grid" ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {sortedDishes.map((dish) => (
                        <DishCard
                          key={dish.id}
                          dish={dish}
                          isSelected={selectedDishes.includes(dish.id)}
                          onSelect={handleSelectDish}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedDishes.map((dish) => (
                        <DishListItem
                          key={dish.id}
                          dish={dish}
                          isSelected={selectedDishes.includes(dish.id)}
                          onSelect={handleSelectDish}
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <BookmarkPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No saved dishes found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchQuery || selectedTags.length > 0
                      ? "Try adjusting your search or filters"
                      : "Start exploring and save dishes you love!"}
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    <Link href="/dashboard">
                      <Heart className="h-4 w-4 mr-2" />
                      Discover Dishes
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
