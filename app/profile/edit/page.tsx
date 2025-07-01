"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Camera, Save, User, Heart, Bell, Shield, Trash2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const DIETARY_PREFERENCES = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Halal",
  "Kosher",
  "Low-Carb",
  "High-Protein",
]

const CUISINE_PREFERENCES = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Japanese",
  "American",
  "Mediterranean",
  "French",
  "Korean",
]

export default function EditProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    bio: "Food enthusiast who loves trying new cuisines and sharing recommendations with friends.",
    location: "Bangalore, India",
    dateOfBirth: "1995-06-15",
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
    cuisinePreferences: ["Indian", "Italian", "Thai"],
    notifications: {
      orderUpdates: true,
      friendActivity: true,
      recommendations: true,
      promotions: false,
    },
    privacy: {
      showProfile: true,
      showActivity: true,
      showLocation: false,
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
    }, 2000)
  }

  const toggleDietaryPreference = (preference: string) => {
    setProfile((prev) => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter((p) => p !== preference)
        : [...prev.dietaryPreferences, preference],
    }))
  }

  const toggleCuisinePreference = (preference: string) => {
    setProfile((prev) => ({
      ...prev,
      cuisinePreferences: prev.cuisinePreferences.includes(preference)
        ? prev.cuisinePreferences.filter((p) => p !== preference)
        : [...prev.cuisinePreferences, preference],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Link>
              </Button>
              <h1 className="text-xl font-bold dark:text-white">Edit Profile</h1>
            </div>
            <Button onClick={handleSave} disabled={isLoading} className="bg-gradient-to-r from-orange-500 to-red-500">
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder.svg?height=128&width=128" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full h-10 w-10 p-0"
                      variant="secondary"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">
                      {profile.firstName} {profile.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
                    <Badge variant="outline" className="mt-2">
                      Premium Member
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6"
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Your Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-orange-500">24</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Dishes Liked</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">12</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-500">8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Friends</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-500">4.8</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="dark:text-gray-200">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="dark:text-gray-200">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="dark:text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="dark:text-gray-200">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="dark:text-gray-200">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth" className="dark:text-gray-200">
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="dark:text-gray-200">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Food Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Heart className="h-5 w-5 mr-2" />
                    Food Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="dark:text-gray-200 mb-3 block">Dietary Preferences</Label>
                    <div className="flex flex-wrap gap-2">
                      {DIETARY_PREFERENCES.map((preference) => (
                        <Badge
                          key={preference}
                          variant={profile.dietaryPreferences.includes(preference) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20"
                          onClick={() => toggleDietaryPreference(preference)}
                        >
                          {preference}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="dark:text-gray-200 mb-3 block">Favorite Cuisines</Label>
                    <div className="flex flex-wrap gap-2">
                      {CUISINE_PREFERENCES.map((cuisine) => (
                        <Badge
                          key={cuisine}
                          variant={profile.cuisinePreferences.includes(cuisine) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/20"
                          onClick={() => toggleCuisinePreference(cuisine)}
                        >
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notification Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Order Updates</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about your order status</p>
                    </div>
                    <Switch
                      checked={profile.notifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, orderUpdates: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Friend Activity</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">See what your friends are ordering</p>
                    </div>
                    <Switch
                      checked={profile.notifications.friendActivity}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, friendActivity: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Recommendations</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized dish recommendations</p>
                    </div>
                    <Switch
                      checked={profile.notifications.recommendations}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, recommendations: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Promotions</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive offers and discounts</p>
                    </div>
                    <Switch
                      checked={profile.notifications.promotions}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, promotions: checked },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Privacy Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Shield className="h-5 w-5 mr-2" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Show Profile to Others</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Let friends find and view your profile</p>
                    </div>
                    <Switch
                      checked={profile.privacy.showProfile}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showProfile: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Show Activity</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Share your likes and orders with friends
                      </p>
                    </div>
                    <Switch
                      checked={profile.privacy.showActivity}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showActivity: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="dark:text-gray-200">Show Location</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display your city to friends</p>
                    </div>
                    <Switch
                      checked={profile.privacy.showLocation}
                      onCheckedChange={(checked) =>
                        setProfile((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, showLocation: checked },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card className="dark:bg-gray-800 border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-red-600 dark:text-red-400">Delete Account</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
