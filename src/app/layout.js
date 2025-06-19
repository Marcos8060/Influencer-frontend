"use client";
import "./globals.css";
import React, { useEffect, useState, createContext, useContext } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "@/assets/context/use-context";
import SplashScreen from "./Components/SplashScreen";
import { Inter } from 'next/font/google';

// Location context
export const LocationContext = createContext({
  location: null,
  setLocation: () => {},
});

export function useLocation() {
  return useContext(LocationContext);
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [location, setLocationState] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  // Helper to set location in state and localStorage
  const setLocation = (loc) => {
    setLocationState(loc);
    if (loc) {
      window.localStorage.setItem('userLocation', JSON.stringify(loc));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // On mount, check for location in localStorage
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem('userLocation');
        if (stored) {
          try {
            setLocationState(JSON.parse(stored));
          } catch {}
        }
        // Only prompt if not already set and not denied
        if (!stored && !window.localStorage.getItem('locationDenied')) {
          setShowLocationPrompt(true);
        }
      }
    }, 3000);
  }, []);

  // Reverse geocode function (OpenStreetMap Nominatim)
  async function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch address");
    return res.json();
  }

  const handleAllowLocation = () => {
    setIsGettingLocation(true);
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setIsGettingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const data = await reverseGeocode(latitude, longitude);
          // Extract address fields
          const address = data.address || {};
          const loc = {
            addressLine1: address.road || "",
            addressLine2: address.neighbourhood || "",
            city: address.city || address.town || address.village || "",
            country: address.country || "",
            countryCode: address.country_code ? address.country_code.toUpperCase() : "",
            zipCode: address.postcode || "",
            lat: latitude,
            lon: longitude,
            raw: address,
          };
          setLocation(loc);
          setShowLocationPrompt(false);
        } catch (err) {
          setLocationError("Could not determine your address.");
        } finally {
          setIsGettingLocation(false);
        }
      },
      (err) => {
        setLocationError("Location permission denied or unavailable.");
        setIsGettingLocation(false);
        window.localStorage.setItem('locationDenied', '1');
        setShowLocationPrompt(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleDenyLocation = () => {
    setShowLocationPrompt(false);
    window.localStorage.setItem('locationDenied', '1');
  };

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Influencer Platform</title>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </head>
      <body>
        <PrimeReactProvider>
          <Provider store={store}>
            <AuthProvider>
              <LocationContext.Provider value={{ location, setLocation }}>
                <Toaster position="top-center" />
                {isLoading ? <SplashScreen /> : null}
                {showLocationPrompt && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center">
                      <h2 className="text-lg font-bold mb-2">Allow Location Access?</h2>
                      <p className="text-gray-500 mb-4">We can auto-fill your address details for faster onboarding.</p>
                      {locationError && <div className="text-red-500 mb-2">{locationError}</div>}
                      <div className="flex gap-3 justify-center">
                        <button
                          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
                          onClick={handleAllowLocation}
                          disabled={isGettingLocation}
                        >
                          {isGettingLocation ? "Getting location..." : "Allow"}
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
                          onClick={handleDenyLocation}
                          disabled={isGettingLocation}
                        >
                          Deny
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {children}
              </LocationContext.Provider>
            </AuthProvider>
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
