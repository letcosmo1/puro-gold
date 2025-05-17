import Header from "@/components/global/header";

const CustomersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}

export default CustomersLayout;