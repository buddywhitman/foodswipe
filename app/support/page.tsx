"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, ChefHat, HelpCircle, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SupportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.category || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Support Request Submitted",
        description: "We'll get back to you within 24 hours!",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg">FoodSwipe Support</span>
          </div>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <HelpCircle className="h-5 w-5 mr-2" />
                    Get Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-blue-800 dark:text-blue-300">Call Us</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">+91 1800-123-4567</p>
                      <p className="text-xs text-blue-500 dark:text-blue-500">24/7 Support</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300">Live Chat</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Available 9 AM - 11 PM</p>
                      <Button size="sm" className="mt-1 bg-green-500 hover:bg-green-600">
                        Start Chat
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Mail className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-purple-800 dark:text-purple-300">Email Us</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">support@foodswipe.com</p>
                      <p className="text-xs text-purple-500 dark:text-purple-500">Response within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Clock className="h-5 w-5 mr-2" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Phone Support</span>
                    <Badge className="bg-green-500">24/7</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Live Chat</span>
                    <span className="text-sm dark:text-white">9 AM - 11 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Email Support</span>
                    <span className="text-sm dark:text-white">24 hours</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start dark:text-gray-300">
                    Order Issues
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-gray-300">
                    Payment Problems
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-gray-300">
                    Account Help
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-gray-300">
                    Delivery Issues
                  </Button>
                  <Button variant="ghost" className="w-full justify-start dark:text-gray-300">
                    Restaurant Complaints
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Submit a Support Request</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="dark:text-gray-200">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="dark:text-gray-200">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="dark:text-gray-200">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category" className="dark:text-gray-200">
                          Issue Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="order-issue">Order Issue</SelectItem>
                            <SelectItem value="payment-problem">Payment Problem</SelectItem>
                            <SelectItem value="delivery-issue">Delivery Issue</SelectItem>
                            <SelectItem value="account-help">Account Help</SelectItem>
                            <SelectItem value="restaurant-complaint">Restaurant Complaint</SelectItem>
                            <SelectItem value="app-bug">App Bug/Technical Issue</SelectItem>
                            <SelectItem value="feature-request">Feature Request</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="dark:text-gray-200">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your issue"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="dark:text-gray-200">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please describe your issue in detail..."
                        rows={6}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Submit Support Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-4 dark:border-gray-600">
                    <h4 className="font-medium mb-2 dark:text-white">How do I track my order?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can track your order in real-time from the Orders section in your dashboard or through the
                      tracking link sent to your phone.
                    </p>
                  </div>
                  <div className="border-b pb-4 dark:border-gray-600">
                    <h4 className="font-medium mb-2 dark:text-white">What if my order is delayed?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      If your order is significantly delayed, you'll receive automatic updates. You can also contact the
                      restaurant or delivery partner directly through the app.
                    </p>
                  </div>
                  <div className="border-b pb-4 dark:border-gray-600">
                    <h4 className="font-medium mb-2 dark:text-white">How do I get a refund?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Refunds are processed automatically for cancelled orders. For other issues, please contact support
                      and we'll resolve it within 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 dark:text-white">Can I change my delivery address?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      You can change your delivery address before the restaurant confirms your order. After
                      confirmation, please contact support for assistance.
                    </p>
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
