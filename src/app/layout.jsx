import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Narbar";
import { UserProvider } from "./context/UserContext";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Helpdesk",
  description: "helpdesk ticketing system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
          
         
          <link rel="icon" href="/chatbot.png" type="image/png" />
        </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <UserProvider>
          <Navbar />
            {children}
        </UserProvider>
      </body>
    </html>
  );
}
