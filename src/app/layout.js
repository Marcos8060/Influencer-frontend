'use client'
import "./globals.css";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "react-hot-toast";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Influencer Platform</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PrimeReactProvider>
          <Provider store={store}>
            <Toaster position="top-center" />
            {children}
          </Provider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
