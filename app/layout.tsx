import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper"; // <-- این خط حتما باید باشد
import CustomCursor from "@/components/CustomCursor"; // <-- اضافه شدن کورسور سفارشی

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "Dawood Mashayekh | Motion Portfolio",
  description: "This is a platform for showcasing the Motion Graphics work of Mr. Dawood Mashayekh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {/* کورسور سفارشی در بالاترین سطح سایت قرار گرفت */}
        <CustomCursor />
        
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}