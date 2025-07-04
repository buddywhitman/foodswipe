"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, ChefHat, ArrowLeft, UserPlus, Clock, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock group data
const MOCK_GROUP = {
  id: "FOOD123",
  name: "Friday Night Dinner",
  host: "Sarah Johnson",
  members: [
    { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40", isHost: true },
    { id: 2, name: "Mike Chen", avatar: "/placeholder.svg?height=40&width=40", isHost: false },
    { id: 3, name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40", isHost: false },
  ],
  maxBudget: 25,
  createdAt: "2 minutes ago",
  status: "waiting",
}

export default function JoinGroupPage() {
  const router = useRouter()
  const [groupCode, setGroupCode] = useState("")
  const [foundGroup, setFoundGroup] = useState<typeof MOCK_GROUP | null>(null)
  const [isJoining, setIsJoining] = useState(false)

  const handleSearchGroup = () => {
    // TODO: Implement group search logic
    if (groupCode.toUpperCase() === "FOOD123") {
      setFoundGroup(MOCK_GROUP)
    } else {
      setFoundGroup(null)
      // TODO: Show error message
    }
  }

  const handleJoinGroup = async () => {
    setIsJoining(true)
    // TODO: Implement join group logic
    setTimeout(() => {
      router.push(`/group/${groupCode}/swipe`)
    }, 1000)
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
          <UserPlus className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Join Group Session</h1>
          <p className="text-gray-600">Enter the group code to join your friends</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Enter Group Code</CardTitle>
            <CardDescription>Ask your friend for the 6-character group code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupCode">Group Code</Label>
              <Input
                id="groupCode"
                placeholder="e.g., FOOD123"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
                className="text-center text-lg font-mono tracking-wider"
                maxLength={7}
              />
            </div>

            <Button
              onClick={handleSearchGroup}
              disabled={groupCode.length < 6}
              className="w-full bg-transparent"
              variant="outline"
            >
              Find Group
            </Button>
          </CardContent>
        </Card>

        {foundGroup && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {foundGroup.name}
              </CardTitle>
              <CardDescription>Hosted by {foundGroup.host}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Created {foundGroup.createdAt}
                </div>
                {foundGroup.maxBudget && (
                  <div className="flex items-center text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Max ${foundGroup.maxBudget}/person
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-3">Members ({foundGroup.members.length})</h4>
                <div className="space-y-2">
                  {foundGroup.members.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                      </div>
                      {member.isHost && <Badge variant="secondary">Host</Badge>}
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleJoinGroup}
                disabled={isJoining}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                {isJoining ? "Joining..." : "Join Group"}
              </Button>
            </CardContent>
          </Card>
        )}

        {groupCode && !foundGroup && groupCode.length >= 6 && (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">😕</div>
              <h3 className="font-bold mb-2">Group Not Found</h3>
              <p className="text-gray-600 text-sm">
                Double-check the code with your friend, or ask them to share the link directly.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
