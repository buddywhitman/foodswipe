"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Bell, User, Database, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, push: false })
  const [dataDownload, setDataDownload] = useState(false)

  const handleDownload = () => {
    setDataDownload(true)
    setTimeout(() => setDataDownload(false), 2000)
    // TODO: Implement real data download
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-orange-500" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications((n) => ({ ...n, email: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch checked={notifications.push} onCheckedChange={(v) => setNotifications((n) => ({ ...n, push: v }))} />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6 text-orange-500" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">Change Password</Button>
          <Button variant="destructive" className="w-full"><Trash2 className="h-4 w-4 mr-2" />Delete Account</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-6 w-6 text-orange-500" />
            Data & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleDownload} disabled={dataDownload} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            {dataDownload ? "Preparing Download..." : "Download My Data"}
          </Button>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Manage your data collection preferences in your account settings.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
