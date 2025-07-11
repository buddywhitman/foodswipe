import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/ui/theme-provider"
import { VercelAnalyticsAndSpeed } from "@/components/vercel-analytics-and-speed"
import { CartProvider } from "@/components/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FoodSwipe - Swipe Your Way to Perfect Meals",
  description:
    "Discover dishes you'll love with AI-powered recommendations. Order together with friends in our revolutionary group mode.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>
            {children}
            <VercelAnalyticsAndSpeed />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
