import type { Metadata } from "next";
import "./globals.css";
import { GlobalProvider } from "./context/GlobalContext";

export const metadata: Metadata = {
  title: "Novitafaandi App",
  description: "Novitafaandi App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className={`bg-black`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
