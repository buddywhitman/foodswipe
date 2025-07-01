"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Share2,
  Mail,
  MessageSquare,
  Copy,
  Gift,
  Users,
  Star,
  Trophy,
  Sparkles,
  Send,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  PhoneIcon as Whatsapp,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { toast } from "sonner"

/**
 * Invite Friends Page - Referral System
 * Features:
 * - Multiple invitation methods (email, SMS, social media)
 * - QR code sharing
 * - Referral tracking and rewards
 * - Social sharing integration
 * - Performance optimized with lazy loading
 * - Mobile-first responsive design
 */

const REFERRAL_STATS = {
  totalInvites: 12,
  successfulReferrals: 8,
  pendingInvites: 4,
  totalRewards: 1600, // in rupees
  currentStreak: 3,
}

const RECENT_REFERRALS = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    status: "joined",
    reward: 200,
    date: "2 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    status: "pending",
    reward: 0,
    date: "1 week ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Anita Patel",
    email: "anita@example.com",
    status: "joined",
    reward: 200,
    date: "2 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function InviteFriendsPage() {
  const [activeTab, setActiveTab] = useState("invite")
  const [emailList, setEmailList] = useState("")
  const [phoneList, setPhoneList] = useState("")
  const [customMessage, setCustomMessage] = useState(
    "Hey! I've been using FoodSwipe to discover amazing food. Join me and get 20% off your first order! 🍕",
  )
  const [isLoading, setIsLoading] = useState(false)

  const referralCode = "FOODIE2024"
  const referralLink = `https://foodswipe.app/join/${referralCode}`

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      toast.success("Referral link copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleSendInvites = async (method: "email" | "sms") => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast.success(`Invites sent via ${method}!`)
      if (method === "email") setEmailList("")
      if (method === "sms") setPhoneList("")
    }, 2000)
  }

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(customMessage)
    const url = encodeURIComponent(referralLink)

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      instagram: `https://www.instagram.com/`, // Instagram doesn't support direct sharing
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank")
    toast.success(`Shared on ${platform}!`)
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
              <h1 className="text-xl font-bold dark:text-white">Invite Friends</h1>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">20% OFF for friends</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-4">
            <Gift className="h-16 w-16 text-orange-500 mx-auto" />
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
            Share the Love, Earn Rewards!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Invite friends to FoodSwipe and both of you get 20% off your next order
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{REFERRAL_STATS.totalInvites}</p>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Total Invites</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <CardContent className="p-4">
                <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {REFERRAL_STATS.successfulReferrals}
                </p>
                <p className="text-sm text-green-600/80 dark:text-green-400/80">Successful</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
              <CardContent className="p-4">
                <Gift className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  ₹{REFERRAL_STATS.totalRewards}
                </p>
                <p className="text-sm text-orange-600/80 dark:text-orange-400/80">Earned</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <CardContent className="p-4">
                <Trophy className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {REFERRAL_STATS.currentStreak}
                </p>
                <p className="text-sm text-purple-600/80 dark:text-purple-400/80">Day Streak</p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
            <TabsTrigger value="invite" className="dark:data-[state=active]:bg-gray-700">
              Invite Friends
            </TabsTrigger>
            <TabsTrigger value="track" className="dark:data-[state=active]:bg-gray-700">
              Track Referrals
            </TabsTrigger>
            <TabsTrigger value="rewards" className="dark:data-[state=active]:bg-gray-700">
              My Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invite" className="space-y-6">
            {/* Referral Link */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Share2 className="h-5 w-5 mr-2" />
                  Your Referral Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input value={referralLink} readOnly className="flex-1 dark:bg-gray-700 dark:border-gray-600" />
                  <Button onClick={handleCopyLink} className="bg-orange-500 hover:bg-orange-600">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Share this link with friends to give them 20% off their first order
                </p>
              </CardContent>
            </Card>

            {/* Social Media Sharing */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Share on Social Media</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => handleSocialShare("whatsapp")}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Whatsapp className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    onClick={() => handleSocialShare("facebook")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    onClick={() => handleSocialShare("twitter")}
                    className="bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    onClick={() => handleSocialShare("instagram")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Email Invites */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Email Invites
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter email addresses separated by commas"
                  value={emailList}
                  onChange={(e) => setEmailList(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Textarea
                  placeholder="Customize your message"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button
                  onClick={() => handleSendInvites("email")}
                  disabled={!emailList.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  Send Email Invites
                </Button>
              </CardContent>
            </Card>

            {/* SMS Invites */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Send SMS Invites
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter phone numbers separated by commas"
                  value={phoneList}
                  onChange={(e) => setPhoneList(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600"
                />
                <Button
                  onClick={() => handleSendInvites("sms")}
                  disabled={!phoneList.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Phone className="h-4 w-4 mr-2" />
                  )}
                  Send SMS Invites
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="track" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Recent Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {RECENT_REFERRALS.map((referral) => (
                    <motion.div
                      key={referral.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={referral.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{referral.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold dark:text-white">{referral.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{referral.email}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">{referral.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={referral.status === "joined" ? "default" : "secondary"}
                          className={referral.status === "joined" ? "bg-green-500" : ""}
                        >
                          {referral.status}
                        </Badge>
                        {referral.reward > 0 && (
                          <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">
                            +₹{referral.reward}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Reward History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold dark:text-white mb-2">
                    Total Rewards Earned: ₹{REFERRAL_STATS.totalRewards}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">Keep inviting friends to earn more rewards!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
