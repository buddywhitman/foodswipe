"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Copy, Share2, Settings, ChefHat, ArrowLeft, QrCode, MessageCircle, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateGroupPage() {
  const router = useRouter()
  const [groupName, setGroupName] = useState("")
  const [maxBudget, setMaxBudget] = useState("")
  const [groupCode] = useState("FOOD123") // Generated code
  const [isCreated, setIsCreated] = useState(false)

  const handleCreateGroup = () => {
    // TODO: Implement group creation logic
    console.log("Creating group:", { groupName, maxBudget })
    setIsCreated(true)
  }

  const copyGroupCode = () => {
    navigator.clipboard.writeText(groupCode)
    // TODO: Show toast notification
  }

  const shareGroup = () => {
    if (navigator.share) {
      navigator.share({
        title: `Join my FoodSwipe group: ${groupName}`,
        text: `Let's decide what to eat together! Use code: ${groupCode}`,
        url: `${window.location.origin}/group/join/${groupCode}`,
      })
    }
  }

  if (isCreated) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-900 p-4 transition-colors">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-lg">FoodSwipe</span>
            </div>
          </div>

          {/* Success State */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold mb-2">Group Created!</h1>
            <p className="text-gray-600">Share the code below with your friends to get started</p>
          </div>

          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{groupName}</CardTitle>
              <CardDescription>Group Session Code</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
                <div className="text-4xl font-bold tracking-wider">{groupCode}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button onClick={copyGroupCode} className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Button onClick={shareGroup} variant="outline" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">Or share via:</p>
                <div className="flex justify-center space-x-4">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Text
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Members */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Group Members (1)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">John Doe (You)</p>
                  <p className="text-sm text-gray-500">Host</p>
                </div>
                <Badge>Host</Badge>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                Waiting for friends to join...
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500" asChild>
              <Link href={`/group/${groupCode}/swipe`}>Start Swiping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/group/${groupCode}/settings`}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 p-4 transition-colors">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-lg">FoodSwipe</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Create Group Session</h1>
          <p className="text-gray-600">Start a collaborative food discovery session with friends</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Group Details</CardTitle>
            <CardDescription>Set up your group session preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="e.g., Friday Night Dinner"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBudget">Max Budget Per Person (Optional)</Label>
              <Input
                id="maxBudget"
                type="number"
                placeholder="e.g., 25"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
              <p className="text-sm text-gray-500">This helps filter dishes within everyone's budget</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">How it works:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Everyone joins and swipes on dishes</li>
                <li>• We find dishes that everyone likes</li>
                <li>• Vote on the final order together</li>
                <li>• Place order and enjoy!</li>
              </ul>
            </div>

            <Button
              onClick={handleCreateGroup}
              disabled={!groupName.trim()}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              size="lg"
            >
              Create Group Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
