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
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store';

// Location context
export const LocationContext = createContext({
  location: null,
  setLocation: () => {},
});

export function useLocation() {
  return useContext(LocationContext);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === null || lon1 === null || lat2 === null || lon2 === null) return Infinity;
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // in km
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocationState] = useState(null);

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
    }, 3000);

    const requestUserLocation = () => {
      if (typeof window === 'undefined' || !navigator.geolocation) {
        return;
      }

      if (window.localStorage.getItem('locationDenied') === '1') {
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const storedLocationRaw = window.localStorage.getItem('userLocation');

            if (storedLocationRaw) {
                const storedLocation = JSON.parse(storedLocationRaw);
                const distance = calculateDistance(storedLocation.lat, storedLocation.lon, latitude, longitude);
                if (distance < 1) { 
                  return;
                }
            }

            const data = await reverseGeocode(latitude, longitude);
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
          } catch (err) {
            console.error("Could not determine your address.", err);
          }
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            window.localStorage.setItem('locationDenied', '1');
          }
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    };
    
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('userLocation');
      if (stored) {
        try {
          setLocationState(JSON.parse(stored));
        } catch {}
      }
      requestUserLocation();
    }
  }, []);

  // Reverse geocode function (OpenStreetMap Nominatim)
  async function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch address");
    return res.json();
  }

  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Grace Belgravia</title>
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> */}
      </head>
      <body>
        <PrimeReactProvider>
          <Provider store={store}>
            <PersistGate loading={<SplashScreen />} persistor={persistor}>
              <AuthProvider>
                <LocationContext.Provider value={{ location, setLocation }}>
                  <Toaster position="top-center" />
                  {isLoading ? <SplashScreen /> : null}
                  {children}
                </LocationContext.Provider>
              </AuthProvider>
            </PersistGate>
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
