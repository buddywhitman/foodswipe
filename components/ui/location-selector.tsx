"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Navigation, Check } from "lucide-react"

interface LocationSelectorProps {
  onLocationChange: (location: { city: string; country: string; currency: string }) => void
  currentLocation?: { city: string; country: string; currency: string }
}

const POPULAR_CITIES = [
  { city: "Mumbai", country: "India", currency: "INR" },
  { city: "Delhi", country: "India", currency: "INR" },
  { city: "Bangalore", country: "India", currency: "INR" },
  { city: "Hyderabad", country: "India", currency: "INR" },
  { city: "Chennai", country: "India", currency: "INR" },
  { city: "Pune", country: "India", currency: "INR" },
  { city: "Kolkata", country: "India", currency: "INR" },
  { city: "Ahmedabad", country: "India", currency: "INR" },
]

export function LocationSelector({ onLocationChange, currentLocation }: LocationSelectorProps) {
  const [geoError, setGeoError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [detectedLocation, setDetectedLocation] = useState<{ city: string; country: string; currency: string } | null>(null)
  const [isDetecting, setIsDetecting] = useState(false)
  // Always start with currentLocation, fallback to Mumbai
  const [location, setLocation] = useState(currentLocation || { city: "Mumbai", country: "India", currency: "INR" })

  useEffect(() => {
    // Auto-detect location on component mount
    detectLocation(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const detectLocation = async (auto = false) => {
    setIsDetecting(true)
    setGeoError(null)
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            try {
              // Use OpenStreetMap Nominatim API for reverse geocoding
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                { headers: { 'Accept-Language': 'en' } }
              )
              const data = await response.json()
              const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county || "Unknown"
              const country = data.address.country || "Unknown"
              // Simple currency mapping for demo
              let currency = "INR"
              if (country === "United States") currency = "USD"
              else if (country === "United Kingdom") currency = "GBP"
              else if (country === "Canada") currency = "CAD"
              else if (country === "Australia") currency = "AUD"
              else if (country === "Japan") currency = "JPY"
              else if (["Germany","France","Italy","Spain","Netherlands","Belgium","Austria","Finland","Ireland","Portugal","Greece","Slovenia","Slovakia","Estonia","Latvia","Lithuania","Luxembourg","Malta","Cyprus"].includes(country)) currency = "EUR"
              // Add more as needed
              const detected = { city, country, currency }
              setDetectedLocation(detected)
              setIsDetecting(false)
              // If this is the first auto-detect, update location
              if (auto && (!currentLocation || currentLocation.city === "Mumbai")) {
                setLocation(detected)
                onLocationChange(detected)
              }
            } catch (err) {
              console.error("Reverse geocoding failed:", err)
              setIsDetecting(false)
            }
          },
          (error) => {
            if (error && error.message) {
              setGeoError(error.message)
              console.error("Geolocation error:", error.message)
            } else {
              setGeoError("Unable to detect your location. Please check your browser settings or try again.")
              // Optionally suppress unknown error log for cleaner console
            }
            setIsDetecting(false)
          },
        )
      } else {
        setGeoError("Geolocation is not supported by your browser.")
        setIsDetecting(false)
      }
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        setGeoError((error as any).message)
        console.error("Location detection failed:", (error as any).message)
      } else {
        setGeoError("Unable to detect your location due to an unknown error.")
      }
      setIsDetecting(false)
    }
  }

  const handleLocationSelect = (selectedLocation: { city: string; country: string; currency: string }) => {
    setLocation(selectedLocation)
    onLocationChange(selectedLocation)
    setIsOpen(false)
  }

  const filteredCities = POPULAR_CITIES.filter((city) => city.city.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">
            {location ? `${location.city}, ${location.country}` : "Detecting..."}
          </span>
          <span className="sm:hidden">{location ? location.city : "Detecting..."}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Select Location</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Auto-detect Location */}
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => detectLocation(false)}
              disabled={isDetecting}
            >
              <Navigation className="h-4 w-4 mr-2" />
              {isDetecting ? "Detecting..." : "Use Current Location"}
            </Button>

            {geoError && (
              <div className="text-sm text-red-600 dark:text-red-400 px-2 py-1">
                {geoError}
              </div>
            )}
            {detectedLocation && (
              <div
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30"
                onClick={() => handleLocationSelect(detectedLocation)}
              >
                <div className="flex items-center space-x-2">
                  <Navigation className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-700 dark:text-blue-300">
                      {detectedLocation.city}, {detectedLocation.country}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">Detected location</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  Use This
                </Badge>
              </div>
            )}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for your city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {/* Popular Cities */}
          <div>
            <h3 className="font-medium mb-3 dark:text-white">Popular Cities</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredCities.map((city) => (
                <div
                  key={`${city.city}-${city.country}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleLocationSelect(city)}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="font-medium dark:text-white">{city.city}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{city.country}</p>
                    </div>
                  </div>
                  {location.city === city.city && location.country === city.country && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
