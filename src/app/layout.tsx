import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/header'
import { AuthProvider } from "@/providers/auth";
import { ModalProvider } from "@/providers/modal";
import { Footer } from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Easy Control - Seu sistema de gerenciamento.",
  description: "Gerencie seus clientes e atendimentos de forma simplificada!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ModalProvider>
          <div className="layout">
              <Header />
                <main>{children}</main>
             
              <Footer />
              </div>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
