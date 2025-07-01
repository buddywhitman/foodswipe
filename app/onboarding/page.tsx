"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChefHat, ArrowRight, ArrowLeft, MapPin, Heart, Utensils } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const ONBOARDING_STEPS = [
  {
    id: "location",
    title: "Where are you located?",
    description: "We'll show you the best local restaurants and dishes",
  },
  {
    id: "cuisines",
    title: "What cuisines do you love?",
    description: "Select your favorite types of food",
  },
  {
    id: "dietary",
    title: "Any dietary preferences?",
    description: "Help us personalize your recommendations",
  },
  {
    id: "dishes",
    title: "Rate these dishes",
    description: "Swipe right on dishes that look amazing to you",
  },
]

const CUISINES = [
  { id: "north-indian", name: "North Indian", emoji: "🍛" },
  { id: "south-indian", name: "South Indian", emoji: "🥥" },
  { id: "italian", name: "Italian", emoji: "🍝" },
  { id: "chinese", name: "Chinese", emoji: "🥢" },
  { id: "desserts", name: "Desserts", emoji: "🍰" },
  { id: "american", name: "American", emoji: "🍔" },
  { id: "thai", name: "Thai", emoji: "🍜" },
  { id: "japanese", name: "Japanese", emoji: "🍣" },
  { id: "mexican", name: "Mexican", emoji: "🌮" },
  { id: "continental", name: "Continental", emoji: "🥗" },
  { id: "street-food", name: "Street Food", emoji: "🌭" },
  { id: "biryani", name: "Biryani", emoji: "🍚" },
]

const DIETARY_OPTIONS = [
  { id: "vegetarian", name: "Vegetarian", icon: "🌱" },
  { id: "vegan", name: "Vegan", icon: "🥬" },
  { id: "jain", name: "Jain Food", icon: "🙏" },
  { id: "eggless", name: "Eggless", icon: "🥚" },
  { id: "less-spice", name: "Less Spice", icon: "🌶️" },
  { id: "high-protein", name: "High Protein", icon: "💪" },
  { id: "dairy-free", name: "Dairy-Free", icon: "🥛" },
  { id: "low-carb", name: "Low Carb", icon: "🥑" },
]

const SAMPLE_DISHES = [
  {
    id: 1,
    name: "Butter Chicken",
    restaurant: "Punjabi Dhaba",
    image: "/placeholder.svg?height=400&width=300",
    price: 450,
  },
  {
    id: 2,
    name: "Masala Dosa",
    restaurant: "South Indian Corner",
    image: "/placeholder.svg?height=400&width=300",
    price: 180,
  },
  {
    id: 3,
    name: "Chicken Biryani",
    restaurant: "Hyderabadi House",
    image: "/placeholder.svg?height=400&width=300",
    price: 320,
  },
  {
    id: 4,
    name: "Paneer Tikka",
    restaurant: "Tandoor Express",
    image: "/placeholder.svg?height=400&width=300",
    price: 280,
  },
  {
    id: 5,
    name: "Chocolate Brownie",
    restaurant: "Sweet Treats",
    image: "/placeholder.svg?height=400&width=300",
    price: 150,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [preferences, setPreferences] = useState({
    location: "",
    cuisines: [] as string[],
    dietary: [] as string[],
    likedDishes: [] as number[],
  })
  const [currentDishIndex, setCurrentDishIndex] = useState(0)

  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      console.log("Onboarding completed:", preferences)
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleCuisine = (cuisineId: string) => {
    setPreferences((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisineId)
        ? prev.cuisines.filter((id) => id !== cuisineId)
        : [...prev.cuisines, cuisineId],
    }))
  }

  const toggleDietary = (dietaryId: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(dietaryId)
        ? prev.dietary.filter((id) => id !== dietaryId)
        : [...prev.dietary, dietaryId],
    }))
  }

  const handleDishSwipe = (dishId: number, liked: boolean) => {
    if (liked) {
      setPreferences((prev) => ({
        ...prev,
        likedDishes: [...prev.likedDishes, dishId],
      }))
    }

    if (currentDishIndex < SAMPLE_DISHES.length - 1) {
      setCurrentDishIndex(currentDishIndex + 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return preferences.location.length > 0
      case 1:
        return preferences.cuisines.length > 0
      case 2:
        return true // Dietary preferences are optional
      case 3:
        return currentDishIndex >= SAMPLE_DISHES.length - 1
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <MapPin className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Where are you located?</h2>
              <p className="text-gray-600 dark:text-gray-300">We'll show you the best local restaurants and dishes</p>
            </div>
            <div className="space-y-4">
              <motion.input
                type="text"
                placeholder="Enter your city"
                className="w-full p-4 border rounded-lg text-lg dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={preferences.location}
                onChange={(e) => setPreferences((prev) => ({ ...prev, location: e.target.value }))}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setPreferences((prev) => ({ ...prev, location: "Mumbai, India" }))}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Use Current Location
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <Utensils className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">What cuisines do you love?</h2>
              <p className="text-gray-600 dark:text-gray-300">Select your favorite types of food</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CUISINES.map((cuisine, index) => (
                <motion.div
                  key={cuisine.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Button
                    variant={preferences.cuisines.includes(cuisine.id) ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 w-full ${
                      preferences.cuisines.includes(cuisine.id)
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20"
                    }`}
                    onClick={() => toggleCuisine(cuisine.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{cuisine.emoji}</span>
                    <span className="text-sm">{cuisine.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <Heart className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Any dietary preferences?</h2>
              <p className="text-gray-600 dark:text-gray-300">Help us personalize your recommendations</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {DIETARY_OPTIONS.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Button
                    variant={preferences.dietary.includes(option.id) ? "default" : "outline"}
                    className={`p-4 h-auto flex flex-col items-center space-y-2 w-full ${
                      preferences.dietary.includes(option.id)
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-transparent hover:bg-orange-50 dark:hover:bg-orange-900/20"
                    }`}
                    onClick={() => toggleDietary(option.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="text-sm">{option.name}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="text-center text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Don't worry, you can always change these later!
            </motion.p>
          </motion.div>
        )

      case 3:
        const currentDish = SAMPLE_DISHES[currentDishIndex]
        return (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Rate these dishes</h2>
              <p className="text-gray-600 dark:text-gray-300">Swipe right on dishes that look amazing to you</p>
              <motion.p
                className="text-sm text-orange-500 mt-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                {currentDishIndex + 1} of {SAMPLE_DISHES.length}
              </motion.p>
            </div>

            {currentDishIndex < SAMPLE_DISHES.length ? (
              <motion.div
                key={currentDish.id}
                initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Card className="max-w-sm mx-auto overflow-hidden shadow-xl">
                  <div className="relative h-64">
                    <Image
                      src={currentDish.image || "/placeholder.svg"}
                      alt={currentDish.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg dark:text-white">{currentDish.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{currentDish.restaurant}</p>
                    <p className="text-orange-500 font-bold">₹{currentDish.price}</p>
                  </CardContent>
                  <div className="p-4 flex gap-4">
                    <motion.button
                      className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => handleDishSwipe(currentDish.id, false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Pass
                    </motion.button>
                    <motion.button
                      className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors"
                      onClick={() => handleDishSwipe(currentDish.id, true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Love It!
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">Great job!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You've liked {preferences.likedDishes.length} dishes. We're ready to find your perfect meals!
                </p>
              </motion.div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FoodSwipe
            </span>
          </div>
          <div className="mb-4">
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}>
              <Progress value={progress} className="w-full h-2" />
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Step {currentStep + 1} of {ONBOARDING_STEPS.length}
            </p>
          </div>
        </motion.div>

        <Card className="border-0 shadow-xl dark:bg-gray-800">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            <motion.div
              className="flex justify-between mt-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {currentStep === ONBOARDING_STEPS.length - 1 ? "Complete" : "Next"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
