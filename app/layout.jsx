import Navbar from "./components/Navbar";
import "./globals.css";
import { Nunito, Roboto_Mono } from "next/font/google";
import Footer from "./components/Footer";
export const metadata = {
  title: "The Joker",
  description: "A joke explanation app",
};
const nunito = Nunito({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
  variable: "--font-nunito",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: "500",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${roboto_mono.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
