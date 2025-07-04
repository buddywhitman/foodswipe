"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const COOKIE_KEY = "cookie_consent_v1"

type Consent = "accept" | "deny" | "required" | null

export function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState<Consent>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(COOKIE_KEY)
      if (!stored) setOpen(true)
      else setConsent(stored as Consent)
    }
  }, [])

  const handleConsent = (value: Consent) => {
    setConsent(value)
    setOpen(false)
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_KEY, value || "deny")
    }
  }

  if (consent === "accept" || consent === "required") return null

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-md rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-700 shadow-xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">🍪</Badge>
            <DialogTitle className="font-bold text-lg text-gray-900 dark:text-white">Cookie Preferences</DialogTitle>
          </div>
        </DialogHeader>
        <Card className="bg-orange-50 dark:bg-gray-800 border-0 mb-2">
          <CardContent className="p-4 text-gray-700 dark:text-gray-200 text-sm">
            We use cookies to enhance your experience, show personalized content, and analyze site traffic. You can accept all cookies, allow only required cookies, or deny non-essential cookies. See our <a href="/privacy" className="underline text-orange-600 dark:text-orange-300">Privacy Policy</a>.
          </CardContent>
        </Card>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => handleConsent("deny")} className="w-full sm:w-auto">Deny</Button>
          <Button variant="secondary" onClick={() => handleConsent("required")} className="w-full sm:w-auto">Required Only</Button>
          <Button onClick={() => handleConsent("accept")} className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
