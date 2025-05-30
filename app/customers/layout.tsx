import Header from "@/components/global/header";
import { ToastContainer } from "react-toastify";

const CustomersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
      <ToastContainer autoClose={ 2000 } />
    </>
  );
}

export default CustomersLayout;