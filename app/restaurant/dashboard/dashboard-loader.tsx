"use client"

import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('./dashboard'), { ssr: false })

export default function DashboardLoader() {
  return <Dashboard />
}
