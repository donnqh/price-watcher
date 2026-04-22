import Toaster from "@/components/ui/Toaster";
import "./globals.css";

export const metadata = {
  title: "Price Watcher",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Toaster richColors/>
      </body>

    </html>
  );
}
