import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Unauthorized from "@/components/unauthorized/unauthorized.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learning Tracker",
  description: "A app that helps students to track their studies progress",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Unauthorized />
          </Providers>
        </body>
      </html>
    );
  }
}
