import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "henry-delivr — Stop chasing client approvals over email",
  description: "The fastest way for freelancers and agencies to get client feedback and approvals. No more email chains.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
