"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Edit, Trash2, Navigation } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const SAMPLE_ADDRESSES = [
  {
    id: 1,
    type: "Home",
    name: "Home",
    address: "123 MG Road, Koramangala, Bangalore",
    landmark: "Near Koramangala Metro Station",
    phone: "+91 98765 43210",
    isDefault: true,
    icon: Home,
  },
  {
    id: 2,
    type: "Work",
    name: "Office",
    address: "456 Brigade Road, Commercial Street, Bangalore",
    landmark: "Opposite to Commercial Street Metro",
    phone: "+91 98765 43210",
    isDefault: false,
    icon: Briefcase,
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(SAMPLE_ADDRESSES)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [formData, setFormData] = useState({
    type: "Home",
    name: "",
    address: "",
    landmark: "",
    phone: "",
  })

  const handleAddAddress = () => {
    const newAddress = {
      id: Date.now(),
      ...formData,
      isDefault: addresses.length === 0,
      icon: formData.type === "Home" ? Home : formData.type === "Work" ? Briefcase : MapPin,
    }
    setAddresses([...addresses, newAddress])
    setFormData({ type: "Home", name: "", address: "", landmark: "", phone: "" })
    setIsAddDialogOpen(false)
  }

  const handleEditAddress = (address: any) => {
    setEditingAddress(address)
    setFormData({
      type: address.type,
      name: address.name,
      address: address.address,
      landmark: address.landmark,
      phone: address.phone,
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateAddress = () => {
    setAddresses(addresses.map((addr) => (addr.id === editingAddress.id ? { ...addr, ...formData } : addr)))
    setEditingAddress(null)
    setFormData({ type: "Home", name: "", address: "", landmark: "", phone: "" })
    setIsAddDialogOpen(false)
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  const detectCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulate reverse geocoding
          setFormData((prev) => ({
            ...prev,
            address: "Current Location - Koramangala, Bangalore, Karnataka 560034",
          }))
        },
        (error) => {
          console.error("Geolocation error:", error)
        },
      )
    }
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
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-bold dark:text-white">Manage Addresses</h1>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md dark:bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="type" className="dark:text-gray-200">
                      Address Type
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700">
                        <SelectItem value="Home">Home</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="name" className="dark:text-gray-200">
                      Address Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g., Home, Office, Friend's Place"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="dark:text-gray-200">
                      Complete Address
                    </Label>
                    <div className="flex space-x-2">
                      <Textarea
                        id="address"
                        placeholder="House/Flat No, Street, Area, City, State, Pincode"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        className="dark:bg-gray-700 dark:border-gray-600"
                        rows={3}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={detectCurrentLocation}
                        className="flex-shrink-0 bg-transparent"
                      >
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="landmark" className="dark:text-gray-200">
                      Landmark (Optional)
                    </Label>
                    <Input
                      id="landmark"
                      placeholder="e.g., Near Metro Station, Opposite Mall"
                      value={formData.landmark}
                      onChange={(e) => setFormData((prev) => ({ ...prev, landmark: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="dark:text-gray-200">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddDialogOpen(false)
                        setEditingAddress(null)
                        setFormData({ type: "Home", name: "", address: "", landmark: "", phone: "" })
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500"
                      disabled={!formData.name || !formData.address}
                    >
                      {editingAddress ? "Update" : "Add"} Address
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {addresses.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No addresses saved</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Add your addresses to get faster delivery and better recommendations
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-to-r from-orange-500 to-red-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Address
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address, index) => {
              const IconComponent = address.icon
              return (
                <motion.div
                  key={address.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`hover:shadow-lg transition-shadow dark:bg-gray-800 ${address.isDefault ? "ring-2 ring-orange-500 dark:ring-orange-400" : ""}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div
                            className={`p-3 rounded-lg ${address.type === "Home" ? "bg-blue-100 dark:bg-blue-900/20" : address.type === "Work" ? "bg-green-100 dark:bg-green-900/20" : "bg-gray-100 dark:bg-gray-700"}`}
                          >
                            <IconComponent
                              className={`h-6 w-6 ${address.type === "Home" ? "text-blue-600 dark:text-blue-400" : address.type === "Work" ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold dark:text-white">{address.name}</h3>
                              <Badge variant="secondary">{address.type}</Badge>
                              {address.isDefault && <Badge className="bg-orange-500 text-white">Default</Badge>}
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">{address.address}</p>
                            {address.landmark && (
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                Landmark: {address.landmark}
                              </p>
                            )}
                            <p className="text-sm text-gray-500 dark:text-gray-400">{address.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {!address.isDefault && (
                            <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                              Set Default
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleEditAddress(address)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-white">Tips for Better Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Add clear landmarks to help delivery partners find your location easily
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keep your phone number updated for delivery coordination
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Set your most frequently used address as default for faster checkout
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
