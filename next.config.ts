import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // برای اینکه تصاویر در گیت‌هاب پیجز بدون خطا لود شوند
  },
};

export default nextConfig;