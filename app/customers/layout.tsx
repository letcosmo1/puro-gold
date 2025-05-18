import Header from "@/components/global/header";

const CustomersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default CustomersLayout;