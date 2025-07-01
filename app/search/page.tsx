"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Mic,
  MicOff,
  ArrowLeft,
  Filter,
  Star,
  Clock,
  MapPin,
  Utensils,
  TrendingUp,
  History,
  X,
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const TRENDING_SEARCHES = [
  "Biryani",
  "Pizza",
  "Burger",
  "Chinese",
  "South Indian",
  "Desserts",
  "Healthy Food",
  "Street Food",
]

const RECENT_SEARCHES = ["Butter Chicken", "Masala Dosa", "Chocolate Cake", "Thai Curry"]

const SAMPLE_DISHES = [
  {
    id: 1,
    name: "Chicken Biryani",
    restaurant: "Paradise Restaurant",
    restaurantId: 1,
    image: "/placeholder.svg?height=200&width=200",
    price: 350,
    rating: 4.5,
    deliveryTime: "25-30 min",
    distance: "1.2 km",
    tags: ["Biryani", "Non-Veg", "Spicy"],
  },
  {
    id: 2,
    name: "Margherita Pizza",
    restaurant: "Pizza Corner",
    restaurantId: 2,
    image: "/placeholder.svg?height=200&width=200",
    price: 299,
    rating: 4.3,
    deliveryTime: "20-25 min",
    distance: "0.8 km",
    tags: ["Pizza", "Italian", "Vegetarian"],
  },
]

const SAMPLE_RESTAURANTS = [
  {
    id: 1,
    name: "Paradise Restaurant",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.5,
    cuisine: "Biryani, North Indian",
    deliveryTime: "25-30 min",
    distance: "1.2 km",
    offers: "20% OFF",
  },
  {
    id: 2,
    name: "Pizza Corner",
    image: "/placeholder.svg?height=100&width=100",
    rating: 4.3,
    cuisine: "Pizza, Italian",
    deliveryTime: "20-25 min",
    distance: "0.8 km",
    offers: "Buy 1 Get 1",
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [searchResults, setSearchResults] = useState<any>({ dishes: [], restaurants: [] })
  const [isSearching, setIsSearching] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES)
  const [activeTab, setActiveTab] = useState("all")
  const recognitionRef = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSearchQuery(transcript)
        handleSearch(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ dishes: [], restaurants: [] })
      return
    }

    setIsSearching(true)
    setShowSuggestions(false)

    // Add to recent searches
    if (!recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 9)])
    }

    // Simulate API search
    setTimeout(() => {
      const filteredDishes = SAMPLE_DISHES.filter(
        (dish) =>
          dish.name.toLowerCase().includes(query.toLowerCase()) ||
          dish.restaurant.toLowerCase().includes(query.toLowerCase()) ||
          dish.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )

      const filteredRestaurants = SAMPLE_RESTAURANTS.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(query.toLowerCase()),
      )

      setSearchResults({
        dishes: filteredDishes,
        restaurants: filteredRestaurants,
      })
      setIsSearching(false)
    }, 500)
  }

  const handleInputChange = (value: string) => {
    setSearchQuery(value)

    if (value.length > 0) {
      // Generate suggestions
      const allSuggestions = [...TRENDING_SEARCHES, ...recentSearches, "Chicken Biryani", "Margherita Pizza"]
      const filtered = allSuggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
      setSearchResults({ dishes: [], restaurants: [] })
    }
  }

  const startVoiceSearch = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopVoiceSearch = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults({ dishes: [], restaurants: [] })
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    handleSearch(suggestion)
  }

  const DishCard = ({ dish }: { dish: any }) => (
    <Link href={`/dish/${dish.id}`}>
      <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex space-x-4">
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
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{dish.restaurant}</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{dish.rating}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {dish.deliveryTime}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  {dish.distance}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-orange-500">₹{dish.price}</span>
                <div className="flex flex-wrap gap-1">
                  {dish.tags.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  const RestaurantCard = ({ restaurant }: { restaurant: any }) => (
    <Link href={`/restaurant/${restaurant.id}`}>
      <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={restaurant.image || "/placeholder.svg"}
                alt={restaurant.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold dark:text-white truncate">{restaurant.name}</h3>
                {restaurant.offers && <Badge className="bg-green-500 text-white text-xs">{restaurant.offers}</Badge>}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{restaurant.cuisine}</p>
              <div className="flex items-center space-x-3 mt-1">
                <div className="flex items-center">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{restaurant.rating}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  {restaurant.distance}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>

            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  ref={inputRef}
                  placeholder="Search for dishes, restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                  className="pl-10 pr-20 dark:bg-gray-700 dark:border-gray-600"
                  autoFocus
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {searchQuery && (
                    <Button variant="ghost" size="sm" onClick={clearSearch} className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                    className={`h-6 w-6 p-0 ${isListening ? "text-red-500" : ""}`}
                  >
                    {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                  </Button>
                </div>
              </div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && (suggestions.length > 0 || searchQuery.length === 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
                  >
                    {searchQuery.length === 0 ? (
                      <div className="p-4 space-y-4">
                        {/* Trending Searches */}
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Trending
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {TRENDING_SEARCHES.map((term) => (
                              <Badge
                                key={term}
                                variant="secondary"
                                className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20"
                                onClick={() => selectSuggestion(term)}
                              >
                                {term}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Recent Searches */}
                        {recentSearches.length > 0 && (
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <History className="h-4 w-4 mr-2" />
                              Recent
                            </h3>
                            <div className="space-y-1">
                              {recentSearches.slice(0, 5).map((term) => (
                                <div
                                  key={term}
                                  className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded cursor-pointer"
                                  onClick={() => selectSuggestion(term)}
                                >
                                  <div className="flex items-center">
                                    <History className="h-3 w-3 text-gray-400 mr-2" />
                                    <span className="text-sm dark:text-gray-200">{term}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-2">
                        {suggestions.map((suggestion) => (
                          <div
                            key={suggestion}
                            className="flex items-center px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => selectSuggestion(suggestion)}
                          >
                            <Search className="h-4 w-4 text-gray-400 mr-3" />
                            <span className="dark:text-gray-200">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Voice Search Indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-700 dark:text-red-300 text-sm">Listening... Speak now</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-6">
            {isSearching ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Searching...</p>
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="dark:bg-gray-800">
                  <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700">
                    All ({searchResults.dishes.length + searchResults.restaurants.length})
                  </TabsTrigger>
                  <TabsTrigger value="dishes" className="dark:data-[state=active]:bg-gray-700">
                    Dishes ({searchResults.dishes.length})
                  </TabsTrigger>
                  <TabsTrigger value="restaurants" className="dark:data-[state=active]:bg-gray-700">
                    Restaurants ({searchResults.restaurants.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {searchResults.dishes.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                        <Utensils className="h-5 w-5 mr-2" />
                        Dishes
                      </h2>
                      <div className="grid gap-4">
                        {searchResults.dishes.map((dish: any) => (
                          <DishCard key={dish.id} dish={dish} />
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.restaurants.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
                        <Utensils className="h-5 w-5 mr-2" />
                        Restaurants
                      </h2>
                      <div className="grid gap-4">
                        {searchResults.restaurants.map((restaurant: any) => (
                          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.dishes.length === 0 && searchResults.restaurants.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Try searching for something else or check your spelling
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="dishes">
                  <div className="grid gap-4">
                    {searchResults.dishes.map((dish: any) => (
                      <DishCard key={dish.id} dish={dish} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="restaurants">
                  <div className="grid gap-4">
                    {searchResults.restaurants.map((restaurant: any) => (
                      <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
