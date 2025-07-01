"use client";

import { useState } from "react";
import { LocationSelector } from "@/components/ui/location-selector";

export function LandingLocationBar() {
  const [location, setLocation] = useState({ city: "Mumbai", country: "India", currency: "INR" });

  return (
    <LocationSelector
      onLocationChange={setLocation}
      currentLocation={location}
    />
  );
}
