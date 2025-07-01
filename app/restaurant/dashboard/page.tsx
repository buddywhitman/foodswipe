"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Plus, Edit, Trash2, ChefHat, Tag, Users, BarChart3, LogOut, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function RestaurantDashboard() {
  const [activeTab, setActiveTab] = useState("dishes")
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Butter Chicken",
      price: 450,
      category: "North Indian",
      description: "Tender chicken in rich tomato and butter gravy",
      image: "/placeholder.svg?height=100&width=100",
      isActive: true,
      tags: ["Spicy", "Popular"],
    },
    {
      id: 2,
      name: "Masala Dosa",
      price: 180,
      category: "South Indian",
      description: "Crispy rice crepe with spiced potato filling",
      image: "/placeholder.svg?height=100&width=100",
      isActive: true,
      tags: ["Vegetarian", "Breakfast"],
    },
  ])

  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SAVE20",
      title: "20% Off",
      description: "Get 20% off on orders above ₹500",
      discount: 20,
      type: "percentage",
      minOrder: 500,
      isActive: true,
      expiryDate: "2024-12-31",
    },
  ])

  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    tags: "",
    image: "",
  })

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    title: "",
    description: "",
    discount: "",
    type: "percentage",
    minOrder: "",
    expiryDate: "",
  })

  const [isAddingDish, setIsAddingDish] = useState(false)
  const [isAddingCoupon, setIsAddingCoupon] = useState(false)

  const handleAddDish = async () => {
    if (!newDish.name || !newDish.price || !newDish.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const dish = {
      id: Date.now(),
      name: newDish.name,
      price: Number.parseInt(newDish.price),
      category: newDish.category,
      description: newDish.description,
      image: newDish.image || "/placeholder.svg?height=100&width=100",
      isActive: true,
      tags: newDish.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    setDishes([...dishes, dish])
    setNewDish({ name: "", price: "", category: "", description: "", tags: "", image: "" })
    setIsAddingDish(false)

    toast({
      title: "Success",
      description: "Dish added successfully!",
    })
  }

  const handleAddCoupon = async () => {
    if (!newCoupon.code || !newCoupon.title || !newCoupon.discount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const coupon = {
      id: Date.now(),
      code: newCoupon.code.toUpperCase(),
      title: newCoupon.title,
      description: newCoupon.description,
      discount: Number.parseInt(newCoupon.discount),
      type: newCoupon.type,
      minOrder: newCoupon.minOrder ? Number.parseInt(newCoupon.minOrder) : 0,
      isActive: true,
      expiryDate: newCoupon.expiryDate,
    }

    setCoupons([...coupons, coupon])
    setNewCoupon({
      code: "",
      title: "",
      description: "",
      discount: "",
      type: "percentage",
      minOrder: "",
      expiryDate: "",
    })
    setIsAddingCoupon(false)

    toast({
      title: "Success",
      description: "Coupon created successfully!",
    })
  }

  const toggleDishStatus = (dishId: number) => {
    setDishes(dishes.map((dish) => (dish.id === dishId ? { ...dish, isActive: !dish.isActive } : dish)))
  }

  const toggleCouponStatus = (couponId: number) => {
    setCoupons(coupons.map((coupon) => (coupon.id === couponId ? { ...coupon, isActive: !coupon.isActive } : coupon)))
  }

  const deleteDish = (dishId: number) => {
    setDishes(dishes.filter((dish) => dish.id !== dishId))
    toast({
      title: "Success",
      description: "Dish deleted successfully!",
    })
  }

  const deleteCoupon = (couponId: number) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== couponId))
    toast({
      title: "Success",
      description: "Coupon deleted successfully!",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Restaurant Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your restaurant, dishes, and promotions</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500">Punjabi Dhaba</Badge>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <ChefHat className="h-8 w-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Dishes</p>
                    <p className="text-2xl font-bold dark:text-white">{dishes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Tag className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Coupons</p>
                    <p className="text-2xl font-bold dark:text-white">{coupons.filter((c) => c.isActive).length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders Today</p>
                    <p className="text-2xl font-bold dark:text-white">47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue Today</p>
                    <p className="text-2xl font-bold dark:text-white">₹12,450</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dishes">Dishes</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
          </TabsList>

          {/* Dishes Tab */}
          <TabsContent value="dishes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">Manage Dishes</h2>
              <Dialog open={isAddingDish} onOpenChange={setIsAddingDish}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Dish
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Dish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="dishName">Dish Name *</Label>
                      <Input
                        id="dishName"
                        value={newDish.name}
                        onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                        placeholder="Enter dish name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishPrice">Price (₹) *</Label>
                      <Input
                        id="dishPrice"
                        type="number"
                        value={newDish.price}
                        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                        placeholder="Enter price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishCategory">Category *</Label>
                      <Select
                        value={newDish.category}
                        onValueChange={(value) => setNewDish({ ...newDish, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="North Indian">North Indian</SelectItem>
                          <SelectItem value="South Indian">South Indian</SelectItem>
                          <SelectItem value="Chinese">Chinese</SelectItem>
                          <SelectItem value="Continental">Continental</SelectItem>
                          <SelectItem value="Desserts">Desserts</SelectItem>
                          <SelectItem value="Beverages">Beverages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dishDescription">Description</Label>
                      <Textarea
                        id="dishDescription"
                        value={newDish.description}
                        onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                        placeholder="Enter dish description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishTags">Tags (comma separated)</Label>
                      <Input
                        id="dishTags"
                        value={newDish.tags}
                        onChange={(e) => setNewDish({ ...newDish, tags: e.target.value })}
                        placeholder="e.g., Spicy, Vegetarian, Popular"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dishImage">Image URL</Label>
                      <Input
                        id="dishImage"
                        value={newDish.image}
                        onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddDish} className="flex-1">
                        Add Dish
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingDish(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <Card className="dark:bg-gray-800">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Image
                          src={dish.image || "/placeholder.svg"}
                          alt={dish.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold dark:text-white">{dish.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{dish.category}</p>
                          <p className="text-lg font-bold text-orange-500">₹{dish.price}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {dish.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{dish.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge variant={dish.isActive ? "default" : "secondary"}>
                          {dish.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleDishStatus(dish.id)}
                            className="bg-transparent"
                          >
                            {dish.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteDish(dish.id)}
                            className="bg-transparent text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold dark:text-white">Manage Coupons</h2>
              <Dialog open={isAddingCoupon} onOpenChange={setIsAddingCoupon}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Coupon
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Coupon</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="couponCode">Coupon Code *</Label>
                      <Input
                        id="couponCode"
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                        placeholder="e.g., SAVE20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponTitle">Title *</Label>
                      <Input
                        id="couponTitle"
                        value={newCoupon.title}
                        onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
                        placeholder="Enter coupon title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponDescription">Description</Label>
                      <Textarea
                        id="couponDescription"
                        value={newCoupon.description}
                        onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                        placeholder="Enter coupon description"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponDiscount">Discount *</Label>
                      <Input
                        id="couponDiscount"
                        type="number"
                        value={newCoupon.discount}
                        onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                        placeholder="Enter discount value"
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponType">Discount Type</Label>
                      <Select
                        value={newCoupon.type}
                        onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (%)</SelectItem>
                          <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="couponMinOrder">Minimum Order (₹)</Label>
                      <Input
                        id="couponMinOrder"
                        type="number"
                        value={newCoupon.minOrder}
                        onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                        placeholder="Enter minimum order amount"
                      />
                    </div>
                    <div>
                      <Label htmlFor="couponExpiry">Expiry Date</Label>
                      <Input
                        id="couponExpiry"
                        type="date"
                        value={newCoupon.expiryDate}
                        onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleAddCoupon} className="flex-1">
                        Create Coupon
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingCoupon(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {coupons.map((coupon) => (
                <motion.div key={coupon.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <Card className="dark:bg-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white">{coupon.title}</h3>
                          <Badge className="bg-orange-500 text-white mt-1">{coupon.code}</Badge>
                        </div>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{coupon.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Discount:</span>
                          <span className="font-medium dark:text-white">
                            {coupon.type === "percentage" ? `${coupon.discount}%` : `₹${coupon.discount}`}
                          </span>
                        </div>
                        {coupon.minOrder > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Min Order:</span>
                            <span className="font-medium dark:text-white">₹{coupon.minOrder}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                          <span className="font-medium dark:text-white">{coupon.expiryDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleCouponStatus(coupon.id)}
                            className="bg-transparent"
                          >
                            {coupon.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteCoupon(coupon.id)}
                            className="bg-transparent text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Restaurant Tab */}
          <TabsContent value="restaurant" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Restaurant Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input id="restaurantName" defaultValue="Punjabi Dhaba" />
                  </div>
                  <div>
                    <Label htmlFor="restaurantPhone">Phone Number</Label>
                    <Input id="restaurantPhone" defaultValue="+91 98765 43210" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="restaurantAddress">Address</Label>
                    <Textarea id="restaurantAddress" defaultValue="123 MG Road, Bangalore, Karnataka 560001" rows={3} />
                  </div>
                  <div>
                    <Label htmlFor="restaurantCuisine">Cuisine Type</Label>
                    <Select defaultValue="north-indian">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="north-indian">North Indian</SelectItem>
                        <SelectItem value="south-indian">South Indian</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                        <SelectItem value="continental">Continental</SelectItem>
                        <SelectItem value="multi-cuisine">Multi-Cuisine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deliveryTime">Average Delivery Time (minutes)</Label>
                    <Input id="deliveryTime" type="number" defaultValue="30" />
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500">Update Restaurant Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
