"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, UserPlus, Users, Mail, Phone, QrCode, Share2, Check, X, MapPin } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const SUGGESTED_FRIENDS = [
  {
    id: 1,
    name: "Priya Sharma",
    username: "@priya_foodie",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 3,
    location: "Bangalore",
    commonInterests: ["Italian", "Desserts"],
    isRequested: false,
  },
  {
    id: 2,
    name: "Rahul Kumar",
    username: "@rahul_eats",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 5,
    location: "Mumbai",
    commonInterests: ["North Indian", "Street Food"],
    isRequested: false,
  },
  {
    id: 3,
    name: "Sneha Patel",
    username: "@sneha_spice",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 2,
    location: "Delhi",
    commonInterests: ["South Indian", "Healthy"],
    isRequested: true,
  },
]

const FRIEND_REQUESTS = [
  {
    id: 4,
    name: "Arjun Singh",
    username: "@arjun_taste",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 1,
    location: "Pune",
    commonInterests: ["Chinese", "Thai"],
    requestedAt: "2 days ago",
  },
  {
    id: 5,
    name: "Kavya Reddy",
    username: "@kavya_cravings",
    avatar: "/placeholder.svg?height=64&width=64",
    mutualFriends: 4,
    location: "Hyderabad",
    commonInterests: ["Mexican", "Continental"],
    requestedAt: "1 week ago",
  },
]

export default function AddFriendsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestedFriends, setSuggestedFriends] = useState(SUGGESTED_FRIENDS)
  const [friendRequests, setFriendRequests] = useState(FRIEND_REQUESTS)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      setIsSearching(true)
      // Simulate API search
      setTimeout(() => {
        const mockResults = [
          {
            id: 6,
            name: "Amit Gupta",
            username: "@amit_foodlover",
            avatar: "/placeholder.svg?height=64&width=64",
            mutualFriends: 0,
            location: "Chennai",
            commonInterests: ["Biryani", "Seafood"],
            isRequested: false,
          },
        ]
        setSearchResults(mockResults)
        setIsSearching(false)
      }, 1000)
    } else {
      setSearchResults([])
    }
  }

  const sendFriendRequest = (friendId: number) => {
    setSuggestedFriends((prev) =>
      prev.map((friend) => (friend.id === friendId ? { ...friend, isRequested: true } : friend)),
    )
    setSearchResults((prev) =>
      prev.map((friend) => (friend.id === friendId ? { ...friend, isRequested: true } : friend)),
    )
  }

  const acceptFriendRequest = (requestId: number) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const rejectFriendRequest = (requestId: number) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== requestId))
  }

  const FriendCard = ({ friend, showActions = true, isRequest = false }: any) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4">
      <Card className="dark:bg-gray-800 hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={friend.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {friend.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold dark:text-white truncate">{friend.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{friend.username}</p>
                </div>
                {showActions && (
                  <div className="flex space-x-2">
                    {isRequest ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => acceptFriendRequest(friend.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => rejectFriendRequest(friend.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => sendFriendRequest(friend.id)}
                        disabled={friend.isRequested}
                        variant={friend.isRequested ? "outline" : "default"}
                      >
                        {friend.isRequested ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Requested
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Add Friend
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{friend.location}</span>
                  {friend.mutualFriends > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <Users className="h-3 w-3 mr-1" />
                      <span>{friend.mutualFriends} mutual friends</span>
                    </>
                  )}
                </div>

                {friend.commonInterests && friend.commonInterests.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {friend.commonInterests.map((interest: string) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                )}

                {isRequest && friend.requestedAt && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">Requested {friend.requestedAt}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

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
              <h1 className="text-xl font-bold dark:text-white">Add Friends</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 dark:bg-gray-800">
            <TabsTrigger value="discover" className="dark:data-[state=active]:bg-gray-700">
              Discover
            </TabsTrigger>
            <TabsTrigger value="requests" className="dark:data-[state=active]:bg-gray-700">
              Requests ({friendRequests.length})
            </TabsTrigger>
            <TabsTrigger value="invite" className="dark:data-[state=active]:bg-gray-700">
              Invite
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            {/* Search */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Search className="h-5 w-5 mr-2" />
                  Find Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, username, or email..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchQuery.length > 2 && (
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Search Results</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {isSearching ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                      <p className="mt-2 text-gray-500 dark:text-gray-400">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y dark:divide-gray-700">
                      {searchResults.map((friend) => (
                        <FriendCard key={friend.id} friend={friend} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">No users found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Suggested Friends */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Users className="h-5 w-5 mr-2" />
                  Suggested Friends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-700">
                  {suggestedFriends.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Friend Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {friendRequests.length > 0 ? (
                  <div className="divide-y dark:divide-gray-700">
                    {friendRequests.map((request) => (
                      <FriendCard key={request.id} friend={request} isRequest={true} />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <UserPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No pending friend requests</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invite" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Invite by Email */}
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Mail className="h-5 w-5 mr-2" />
                    Invite by Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Enter email addresses..." className="dark:bg-gray-700 dark:border-gray-600" />
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">Send Invitations</Button>
                </CardContent>
              </Card>

              {/* Invite by Phone */}
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center dark:text-white">
                    <Phone className="h-5 w-5 mr-2" />
                    Invite by Phone
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Enter phone numbers..." className="dark:bg-gray-700 dark:border-gray-600" />
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">Send SMS Invites</Button>
                </CardContent>
              </Card>
            </div>

            {/* Share Profile */}
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <QrCode className="h-16 w-16 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium dark:text-white">Your FoodSwipe Profile</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">foodswipe.com/user/johndoe</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Copy Link
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Instagram
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
