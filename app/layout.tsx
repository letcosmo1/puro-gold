import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puro Gold",
  description: "Puro Gold - Sua melhor versão",
  icons: {
    icon: "/favicon.png"
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
