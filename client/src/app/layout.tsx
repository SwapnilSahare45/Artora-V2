import { Inter, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-luxury",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jakarta.variable}`}
    >
      <body className="bg-primary text-white antialiased selection:brand selection:text-white">
        <ReduxProvider>{children}</ReduxProvider>

        <Toaster
          position="bottom-right"
          theme="dark"
          expand={false}
          richColors
          toastOptions={{
            style: {
              background: "#080808",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontFamily: "var(--font-jakarta)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
            className: "border-glass shadow-2xl",
          }}
        />
      </body>
    </html>
  );
}
