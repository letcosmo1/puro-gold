'use client'

import React from "react";
import AddCustomerDialog from "@/components/customers/add-customer-dialog";
import EditCustomerDialog from "@/components/customers/edit-customer-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody } from "@/components/ui/table";
import { mockedCustomers } from "@/mocked-data/customer-data";
import { Customer } from "@/types/entities/customer";
import CustomerTableRow from "@/components/customers/customer-table-row";

const CustomersPage = () => {
  const [openEditCustomer, setOpenEditCustomer] = React.useState<boolean>(false);
  const [openAddCustomer, setOpenAddCustomer] = React.useState<boolean>(false);

  const [customers, setCustomers] = React.useState<Customer[]>(mockedCustomers);

  const [filteredCustomers, setFilteredCustomers] = React.useState<Customer[]>(mockedCustomers);
  const [filterInput, setFilterInput] = React.useState<string>("");

  const [selectedEditClient, setSelectedEditClient] = React.useState<Customer>({ id: 0, name: "" })

  const handleFilterCustomersInputChange = (e: React.BaseSyntheticEvent) => {
    const filterWord: string = e.target.value;
    setFilterInput(filterWord);
    setFilteredCustomers(customers.filter(customer => 
      customer.name.toLowerCase().includes(filterWord.toLowerCase()))
    );
  }

  /***** EDIT CUSTOMER DIALOG FUNCTIONS *****/
  const handleEditCustomerButtonClick = (customer: Customer) => {
    if(customer.id && customer.name) {
      setSelectedEditClient(customer);
      setOpenEditCustomer(true);
    }
    //TODO: add error toast
  }

  const handleEditCustomerConfirmButtonClick = () => {
    if(selectedEditClient.id && selectedEditClient.name) {
      const customersCopy: Customer[] = [...customers];

      const customersUpdated: Customer[] = customersCopy.map(customer => 
        customer.id === selectedEditClient.id ? selectedEditClient : customer
      );

      setCustomers(customersUpdated);
      setFilteredCustomers(customersUpdated);
      setFilterInput("");
      setSelectedEditClient({ id: 0, name: "" });
    }
    //TODO: add error toast
    setOpenEditCustomer(false);
  }

  const handleEditCustomerCancelButtonClick = () => {
    setSelectedEditClient({ id: 0, name: "" });
    setOpenEditCustomer(false);
  }

  /***** ADD CUSTOMER DIALOG FUNCTIONS *****/
  const handleAddCustomerButtonClick = () => setOpenAddCustomer(true);
  const handleAddCustomerCancelButtonClick = () => setOpenAddCustomer(false);

  const handleAddCustomerConfirmButtonClick = (name: string) => {
    if(name) {
      const id: number = customers.length + 1;

      const customersCopy: Customer[] = [...customers, { id: id, name: name }];

      setCustomers(customersCopy);
      setFilteredCustomers(customersCopy);
      setFilterInput("");
    }
    //TODO: add error toast
    setOpenAddCustomer(false);
  }

  return (
    <>
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
                { 
                  filteredCustomers.map(customer => { 
                    return (
                      <CustomerTableRow 
                        key={ customer.id } 
                        customer={ customer } 
                        handleEditCustomerButtonClick={ handleEditCustomerButtonClick } 
                      /> 
                    )
                  })
                }
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
        selectedEditCustomer={ selectedEditClient }
        setSelectedEditClient={ setSelectedEditClient } 
        handleEditCustomerCancelButtonClick={ handleEditCustomerCancelButtonClick }
        handleEditCustomerConfirmButtonClick={ handleEditCustomerConfirmButtonClick }
      />
    </>
  );
}

export default CustomersPage;
