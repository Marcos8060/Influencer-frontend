"use client";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import { AuthProvider } from "@/assets/context/use-context";
import SplashScreen from "./Components/SplashScreen";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Influencer Platform</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </head>
      <body>
        <PrimeReactProvider>
          <Provider store={store}>
            <AuthProvider>
              <Toaster position="top-center" />
              {isLoading ? <SplashScreen /> : null}
              {children}
            </AuthProvider>
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
