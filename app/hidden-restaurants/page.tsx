"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EyeOff, Eye, Utensils } from "lucide-react"

// Mock hidden restaurants data
const MOCK_HIDDEN = [
  { id: 1, name: "Spicy Villa", cuisine: "Indian", reason: "Too spicy", image: "/placeholder.svg?height=60&width=60" },
  { id: 2, name: "Burger Bros", cuisine: "American", reason: "Bad experience", image: "/placeholder.svg?height=60&width=60" },
]

export default function HiddenRestaurantsPage() {
  const [hidden, setHidden] = useState(MOCK_HIDDEN)

  const handleUnblock = (id: number) => {
    setHidden((prev) => prev.filter((r) => r.id !== id))
    // TODO: Persist unblocking to backend
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-6 w-6 text-orange-500" />
            Hidden Restaurants
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hidden.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              <Eye className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <div>No hidden restaurants. Enjoy discovering new places!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {hidden.map((r) => (
                <div key={r.id} className="flex items-center gap-4 bg-muted dark:bg-gray-800 rounded-lg p-4">
                  <img src={r.image} alt={r.name} className="h-14 w-14 rounded object-cover border" />
                  <div className="flex-1">
                    <div className="font-semibold text-lg dark:text-white">{r.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{r.cuisine}</div>
                    <Badge className="mt-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">Reason: {r.reason}</Badge>
                  </div>
                  <Button variant="secondary" onClick={() => handleUnblock(r.id)}>
                    <EyeOff className="h-4 w-4 mr-1" /> Unblock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
