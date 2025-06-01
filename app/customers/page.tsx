'use client'

import React from "react";
import AddCustomerDialog from "@/components/customers/add-customer-dialog";
import EditCustomerDialog from "@/components/customers/edit-customer-dialog";
import CustomerTableRow from "@/components/customers/customer-table-row";
import { toast } from "react-toastify";
import { request } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { Customer, CustomerCreateResponse, CustomerListResponse, NewCustomerData, UpdateCustomerData } from "@/types/entities/customer";
import { ApiErrorResponse } from "@/types/api/api-response";
import { getCookie } from "@/lib/get-cookie";
import { useRouter } from 'next/navigation'
import LoadingOverlay from "@/components/global/loading-overlay";

const CustomersPage = () => {
  const router = useRouter();

  const [openEditCustomer, setOpenEditCustomer] = React.useState<boolean>(false);
  const [openAddCustomer, setOpenAddCustomer] = React.useState<boolean>(false);

  const [customers, setCustomers] = React.useState<Customer[]>([]);

  const [filteredCustomers, setFilteredCustomers] = React.useState<Customer[]>([]);
  const [filterInput, setFilterInput] = React.useState<string>("");

  const [selectedEditCustomer, setSelectedEditCustomer] = React.useState<Customer>({ id: 0, name: "" });

  const [isPending, startTransition] = React.useTransition();
  const [apiLoading, setApiLoading] = React.useState(false);
  
  const showLoading = apiLoading || isPending;

  const handleCustomerNameClick = (customerId: number) => {
    startTransition(() => router.push(`/customers/${ customerId }`)); 
  }

  const handleFilterCustomersInputChange = (e: React.BaseSyntheticEvent) => {
    const filterWord: string = e.target.value;
    setFilterInput(filterWord);
    setFilteredCustomers(customers.filter(customer => 
      customer.name.toLowerCase().includes(filterWord.toLowerCase()))
    );
  }

  /***** EDIT CUSTOMER DIALOG FUNCTIONS *****/
  const handleEditCustomerButtonClick = (customer: Customer) => {
    if(!customer.id || !customer.name) {
      toast.error("Erro ao abrir janela de edição de cliente.");
      return
    }
    setSelectedEditCustomer(customer);
    setOpenEditCustomer(true);
  }

  const handleEditCustomerConfirmButtonClick = () => {
    if(!selectedEditCustomer.id || !selectedEditCustomer.name) {
      toast.warning("Dados inválidos.");
      return
    }

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerCreateResponse | ApiErrorResponse, UpdateCustomerData>(`customers/${selectedEditCustomer.id}`, 
      { method: "PATCH", token: token, body: { name: selectedEditCustomer.name } }
    ).then(result => {
      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }

      const customersCopy: Customer[] = [...customers];
      const customersUpdated: Customer[] = customersCopy.map(customer => 
        customer.id === selectedEditCustomer.id ? 
        selectedEditCustomer : customer 
      );

      setCustomers(customersUpdated);
      setFilteredCustomers(customersUpdated);
      requestAnimationFrame(() => setApiLoading(false));
    });
    
    setOpenEditCustomer(false);
    setFilterInput("");
    setSelectedEditCustomer({ id: 0, name: "" });
  }

  const handleEditCustomerCancelButtonClick = () => {
    setSelectedEditCustomer({ id: 0, name: "" });
    setOpenEditCustomer(false);
  }

  /***** ADD CUSTOMER DIALOG FUNCTIONS *****/
  const handleAddCustomerButtonClick = () => setOpenAddCustomer(true);
  const handleAddCustomerCancelButtonClick = () => setOpenAddCustomer(false);

  const handleAddCustomerConfirmButtonClick = (name: string) => {
    if(!name) {
      toast.warning("Dados inválidos.")
      return
    }

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerCreateResponse | ApiErrorResponse, NewCustomerData>("customers", 
      { method: "POST", token: token, body: { name } }
    ).then(result => {
      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      const customersCopy: Customer[] = [...customers, result.data.customer];
      setCustomers(customersCopy);
      setFilteredCustomers(customersCopy);
      requestAnimationFrame(() => setApiLoading(false));
    });

    setFilterInput("");
    setOpenAddCustomer(false);
  }

  React.useEffect(() => {
    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerListResponse | ApiErrorResponse, null>("customers", 
      { method: "GET", token: token }
    ).then(result => {
      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      setCustomers(result.data.customers);
      setFilteredCustomers(result.data.customers);
      requestAnimationFrame(() => setApiLoading(false));
    });
  }, []);

  return (
    <>
      <LoadingOverlay show={ showLoading } />
      
      <main className="p-4 flex flex-col justify-between h-[calc(100dvh-var(--header-height))]">
        <div>
          <Label htmlFor="search-customer" className="mb-2">Pesquisar</Label>
          <Input 
            id="search-customer" 
            placeholder="Nome do cliente" 
            onChange={ handleFilterCustomersInputChange }
            value={ filterInput }
          />
        </div>

        <div className="rounded-md border p-4 h-[calc(100%-94px-var(--spacing)*8)]">
          <h2 className="font-medium text-sm mb-2">Clientes</h2>
          <ScrollArea className="w-full h-[calc(100%-20px)]">
            <Table>
              <TableBody>
                { filteredCustomers.map(customer => { 
                  return (
                  <CustomerTableRow
                    key={ customer.id } 
                    customer={ customer } 
                    handleEditCustomerButtonClick={ handleEditCustomerButtonClick }
                    handleCustomerNameClick={ handleCustomerNameClick }
                  />)
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <Button onClick={ handleAddCustomerButtonClick } className="w-full">Adicionar Cliente</Button>
      </main>

      <AddCustomerDialog 
        openAddCustomer={ openAddCustomer }
        handleAddCustomerCancelButtonClick={ handleAddCustomerCancelButtonClick }
        handleAddCustomerConfirmButtonClick={ handleAddCustomerConfirmButtonClick }
      />

      <EditCustomerDialog 
        openEditCustomer={ openEditCustomer }
        selectedEditCustomer={ selectedEditCustomer }
        setSelectedEditCustomer={ setSelectedEditCustomer } 
        handleEditCustomerCancelButtonClick={ handleEditCustomerCancelButtonClick }
        handleEditCustomerConfirmButtonClick={ handleEditCustomerConfirmButtonClick }
      />
    </>
  );
}

export default CustomersPage;
