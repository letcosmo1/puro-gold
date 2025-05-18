import Header from "@/components/global/header";

const CustomersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      <main className="p-4">
        {children}
      </main>
    </>
  );
}

export default CustomersLayout;