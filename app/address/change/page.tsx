"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Navigation, Home } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChangeAddressPage() {
  const router = useRouter()
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [address, setAddress] = useState({
    street: "",
    apartment: "",
    landmark: "",
    city: "",
    pincode: "",
    instructions: "",
  })
  const [isDetecting, setIsDetecting] = useState(false)

  const detectLocation = () => {
    setIsDetecting(true)

    if (!navigator.geolocation) {
      console.warn("Geolocation not supported")
      setIsDetecting(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })

        // Mock reverse geocoding - in production use Google Maps Geocoding API
        setAddress((prev) => ({
          ...prev,
          street: "123 Main Street",
          city: "Mumbai",
          pincode: "400001",
        }))

        setIsDetecting(false)
      },
      (error) => {
        console.warn("Error getting location:", error.message)
        setIsDetecting(false)
      },
      { timeout: 10000, enableHighAccuracy: true },
    )
  }

  const handleSave = () => {
    // TODO: Save address to backend
    console.log("Saving address:", address)
    router.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold dark:text-white">Change Address</h1>
          <div></div>
        </div>

        <div className="space-y-6">
          {/* Map View */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center dark:text-white">
                <MapPin className="h-5 w-5 mr-2" />
                Select Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300">Interactive Map View</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Drag the pin to select your exact location
                    </p>
                  </div>
                </div>

                {/* Mock pin */}
                {currentLocation && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-red-500 rounded-full p-2">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={detectLocation}
                disabled={isDetecting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isDetecting ? "Detecting Location..." : "Use Current Location"}
              </Button>
            </CardContent>
          </Card>

          {/* Address Form */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center dark:text-white">
                <Home className="h-5 w-5 mr-2" />
                Address Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street" className="dark:text-gray-200">
                    Street Address
                  </Label>
                  <Input
                    id="street"
                    value={address.street}
                    onChange={(e) => setAddress((prev) => ({ ...prev, street: e.target.value }))}
                    placeholder="Enter street address"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="apartment" className="dark:text-gray-200">
                    Apartment/Floor
                  </Label>
                  <Input
                    id="apartment"
                    value={address.apartment}
                    onChange={(e) => setAddress((prev) => ({ ...prev, apartment: e.target.value }))}
                    placeholder="Apt, Floor, Building"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="landmark" className="dark:text-gray-200">
                  Landmark
                </Label>
                <Input
                  id="landmark"
                  value={address.landmark}
                  onChange={(e) => setAddress((prev) => ({ ...prev, landmark: e.target.value }))}
                  placeholder="Nearby landmark"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="dark:text-gray-200">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="dark:text-gray-200">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    value={address.pincode}
                    onChange={(e) => setAddress((prev) => ({ ...prev, pincode: e.target.value }))}
                    placeholder="Pincode"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instructions" className="dark:text-gray-200">
                  Delivery Instructions
                </Label>
                <Textarea
                  id="instructions"
                  value={address.instructions}
                  onChange={(e) => setAddress((prev) => ({ ...prev, instructions: e.target.value }))}
                  placeholder="Any special instructions for delivery"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                Save Address
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
