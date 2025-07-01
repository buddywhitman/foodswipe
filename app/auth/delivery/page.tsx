"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Truck, Clock, Star, Shield, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function DeliveryAuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("signin")
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [usePassword, setUsePassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Sign In State
  const [signInData, setSignInData] = useState({
    phone: "",
    otp: "",
    password: "",
  })

  // Application State
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    vehicleType: "",
    vehicleNumber: "",
    licenseNumber: "",
    experience: "",
    availability: [] as string[],
    documents: {
      photo: null as File | null,
      license: null as File | null,
      vehicleRC: null as File | null,
      aadhar: null as File | null,
    },
    bankDetails: {
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
    },
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
    agreeToTerms: false,
  })

  const handleSendOTP = async () => {
    if (!signInData.phone || signInData.phone.length < 10) {
      alert("Please enter a valid phone number")
      return
    }

    setIsLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
      alert("OTP sent to your phone number!")
    }, 2000)
  }

  const handleSignIn = async () => {
    setIsLoading(true)
    // Simulate sign in
    setTimeout(() => {
      setIsLoading(false)
      router.push("/delivery/dashboard")
    }, 2000)
  }

  const handleApplyNow = async () => {
    if (!applicationData.agreeToTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)
    // Simulate application submission
    setTimeout(() => {
      setIsLoading(false)
      alert("Application submitted successfully! We'll contact you within 24 hours.")
      router.push("/auth/delivery?tab=signin")
    }, 3000)
  }

  const availabilityOptions = [
    "Morning (6 AM - 12 PM)",
    "Afternoon (12 PM - 6 PM)",
    "Evening (6 PM - 12 AM)",
    "Night (12 AM - 6 AM)",
    "Weekends Only",
    "Full Time",
  ]

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    if (checked) {
      setApplicationData(prev => ({
        ...prev,
        availability: [...prev.availability, option]
      }))
    } else {
      setApplicationData(prev => ({
        ...prev,
        availability: prev.availability.filter(a => a !== option)
      }))
    }
  }

  const handleFileUpload = (field: keyof typeof applicationData.documents, file: File | null) => {
    setApplicationData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
              <div className="flex items-center space-x-2">
                <Truck className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold">Delivery Partner Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 dark:text-white">Join Our Delivery Team</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Earn flexible income by delivering food to hungry customers. Join thousands of delivery partners already earning with FoodSwipe.
            </p>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="text-center dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">Flexible Hours</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Work when you want, earn on your schedule</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">Great Earnings</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Earn ₹15,000-₹30,000 per month</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2 dark:text-white">Insurance Coverage</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive insurance for all partners</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800">
              <TabsTrigger value="signin" className="dark:data-[state=active]:bg-gray-700">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="apply" className="dark:data-[state=active]:bg-gray-700">
                Apply Now
              </TabsTrigger>
            </TabsList>

            {/* Sign In Tab */}
            <TabsContent value="signin">
              <Card className="max-w-md mx-auto dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-center dark:text-white">Delivery Partner Sign In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone" className="dark:text-gray-200">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={signInData.phone}
                      onChange={(e) => setSignInData(prev => ({ ...prev, phone: e.target.value }))}
                      className="dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>

                  {!usePassword && (
                    <>
                      {!otpSent ? (
                        <Button
                          onClick={handleSendOTP}
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                        >
                          {isLoading ? "Sending OTP..." : "Send OTP"}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="otp" className="dark:text-gray-200">Enter OTP</Label>
                            <Input
                              id="otp"
                              type="text"
                              placeholder="Enter 6-digit OTP"
                              value={signInData.otp}
                              onChange={(e) => setSignInData(prev => ({ ...prev, otp: e.target.value }))}
                              className="dark:bg-gray-700 dark:border-gray-600"
                              maxLength={6}
                            />
                          </div>
                          <Button
                            onClick={handleSignIn}
                            disabled={isLoading || signInData.otp.length !== 6}
                            className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                          >
                            {isLoading ? "Signing In..." : "Sign In"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={handleSendOTP}
                            disabled={isLoading}
                            className="w-full bg-transparent"
                          >
                            Resend OTP
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {usePassword && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={signInData.password}
                            onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                            className="dark:bg-gray-700 dark:border-gray-600 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <Button
                        onClick={handleSignIn}
                        disabled={isLoading || !signInData.password}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500"
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Button>
                    </div>
                  )}

                  <Separator className="dark:bg-gray-700" />

                  <Button
                    variant="outline"
                    onClick={() => setUsePassword(!usePassword)}
                    className="w-full"
                  >
                    {usePassword ? "Use OTP Instead" : "Use Password Instead"}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Don't have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-green-600 dark:text-green-400"
                        onClick={() => setActiveTab("apply")}
                      >
                        Apply Now
                      </Button>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Apply Now Tab */}
            <TabsContent value="apply">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Delivery Partner Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className="dark:text-gray-200">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={applicationData.fullName}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="dark:text-gray-200">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={applicationData.email}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="dark:text-gray-200">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={applicationData.phone}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience" className="dark:text-gray-200">Delivery Experience</Label>
                        <Select
                          value={applicationData.experience}
                          onValueChange={(value) => setApplicationData(prev => ({ ...prev, experience: value }))}
                        >
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Experience</SelectItem>
                            <SelectItem value="0-1">0-1 Years</SelectItem>
                            <SelectItem value="1-3">1-3 Years</SelectItem>
                            <SelectItem value="3+">3+ Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address" className="dark:text-gray-200">Full Address *</Label>
                        <Textarea
                          id="address"
                          value={applicationData.address}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, address: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city" className="dark:text-gray-200">City *</Label>
                          <Input
                            id="city"
                            value={applicationData.city}
                            onChange={(e) => setApplicationData(prev => ({ ...prev, city: e.target.value }))}
                            className="dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="dark:text-gray-200">State *</Label>
                          <Input
                            id="state"
                            value={applicationData.state}
                            onChange={(e) => setApplicationData(prev => ({ ...prev, state: e.target.value }))}
                            className="dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode" className="dark:text-gray-200">Pincode *</Label>
                          <Input
                            id="pincode"
                            value={applicationData.pincode}
                            onChange={(e) => setApplicationData(prev => ({ ...prev, pincode: e.target.value }))}
                            className="dark:bg-gray-700 dark:border-gray-600"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Vehicle Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicleType" className="dark:text-gray-200">Vehicle Type *</Label>
                        <Select
                          value={applicationData.vehicleType}
                          onValueChange={(value) => setApplicationData(prev => ({ ...prev, vehicleType: value }))}
                        >
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bike">Motorcycle/Bike</SelectItem>
                            <SelectItem value="scooter">Scooter</SelectItem>
                            <SelectItem value="bicycle">Bicycle</SelectItem>
                            <SelectItem value="car">Car</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="vehicleNumber" className="dark:text-gray-200">Vehicle Number *</Label>
                        <Input
                          id="vehicleNumber"
                          value={applicationData.vehicleNumber}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, vehicleNumber: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          placeholder="KA01AB1234"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="licenseNumber" className="dark:text-gray-200">Driving License Number *</Label>
                        <Input
                          id="licenseNumber"
                          value={applicationData.licenseNumber}
                          onChange={(e) => setApplicationData(prev => ({ ...prev, licenseNumber: e.target.value }))}
                          className="dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Availability</h3>
                    <div\
