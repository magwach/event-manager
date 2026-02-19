import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { AuthLoader } from "@/components/AuthLoader";
import TanstackProvider from "@/components/providers/TanstackProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});
export const metadata: Metadata = {
  title: "EventFlow — Event Manager",
  description: "Discover, track, and manage events with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TanstackProvider>
      <ClerkProvider>
        <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
          <body className="bg-[#0f0f11] text-[#e8e6e1] font-dm-sans antialiased min-h-screen">
            <AuthLoader>
              <Navbar />
              <main>{children}</main>
            </AuthLoader>
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#1a1a1f",
                  color: "#e8e6e1",
                  border: "1px solid #2a2a30",
                  fontFamily: "var(--font-dm-sans)",
                },
              }}
            />
          </body>
        </html>
      </ClerkProvider>
    </TanstackProvider>
  );
}
