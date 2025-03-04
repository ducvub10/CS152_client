import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LoadingAuth from "@/components/LoadingAuth";
import { AuthProvider } from "@/hooks/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <LoadingAuth />
          <div className='max-w-5xl min-w-[700px] mx-auto mb-20'>
            <Navbar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
