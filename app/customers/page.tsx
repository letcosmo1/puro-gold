'use client'

import AddCustomerDialog from "@/components/customers/add-customer-dialog";
import EditCustomerDialog from "@/components/customers/edit-customer-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { mockedCustomers } from "@/mocked-data/customer-data";
import { Customer } from "@/types/customer";
import { Settings2 } from "lucide-react";
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";

const CustomersPage = () => {
  const [openEditCustomer, setOpenEditCustomer] = useState<boolean>(false);
  const [openAddCustomer, setOpenAddCustomer] = useState<boolean>(false);

  const [customers, setCustomers] = useState<Customer[]>(mockedCustomers);

  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(mockedCustomers);
  const [filterInput, setFilterInput] = useState<string>("");

  const [addCustomerNameInput, setAddCustomerNameInput] = useState<string>("");
  const [editCustomerNameInput, setEditCustomerNameInput] = useState<string>("");

  const [selectedCustomerEditId, setSelectedCustomerEditId] = useState<number | null>(null);

  const handleFilterCustomersInputChange = (e: BaseSyntheticEvent) => {
    const filterWord: string = e.target.value;

    setFilterInput(filterWord);

    setFilteredCustomers(customers.filter(customer => 
      customer.name.toLowerCase().includes(filterWord.toLowerCase()))
    );
  }

  /***** EDIT CUSTOMER DIALOG FUNCTIONS *****/
  const handleEditCustomerNameInputChange = (e: BaseSyntheticEvent) => {
    setEditCustomerNameInput(e.target.value);
  }
  
  const handleEditCustomerButtonClick = (id: number, name: string) => {
    if(id && name) {
      setOpenEditCustomer(true);
      setEditCustomerNameInput(name);
      setSelectedCustomerEditId(id);
    }
    //TODO: add error toast
  }

  const handleEditCustomerConfirmButtonClick = () => {
    if(editCustomerNameInput && selectedCustomerEditId) {
      const customersCopy: Customer[] = [...customers];
      const customersUpdated: Customer[] = customersCopy.map(customer => customer.id === selectedCustomerEditId ? 
        { ...customer, name: editCustomerNameInput }
        : customer
      );

      setCustomers(customersUpdated);
      setFilteredCustomers(customersUpdated);
      setFilterInput("");
      setEditCustomerNameInput("");
      setSelectedCustomerEditId(null);
    }
    //TODO: add error toast
    setOpenEditCustomer(false);
  }

  const handleEditCustomerCancelButtonClick = () => {
    setEditCustomerNameInput("");
    setSelectedCustomerEditId(null);
    setOpenEditCustomer(false);
  }

  /***** ADD CUSTOMER DIALOG FUNCTIONS *****/
  const handleAddCustomerButtonClick = () => {
    setOpenAddCustomer(true);
  }

  const handleAddCustomerNameInputChange = (e: BaseSyntheticEvent) => {
    setAddCustomerNameInput(e.target.value);
  }

  const handleAddCustomerConfirmButtonClick = () => {
    if(addCustomerNameInput) {
      const id: number = customers.length + 1;

      const customersCopy: Customer[] = [...customers, { id: id, name: addCustomerNameInput }];

      setCustomers(customersCopy);
      setFilteredCustomers(customersCopy);
      setFilterInput("");
      setAddCustomerNameInput("");
    }
    //TODO: add error toast
    setOpenAddCustomer(false);
  }

  const handleAddCustomerCancelButtonClick = () => {
    setAddCustomerNameInput("");
    setOpenAddCustomer(false);
  }

  return (
    <>
      <main className="flex flex-col justify-between h-[calc(100dvh-var(--header-height)-var(--spacing)*8)]">
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
                      <TableRow key={ customer.id }>
                        <TableCell className="flex justify-between py-4">
                          <Link href={`/customers/${customer.id}`}>
                            <p>{ customer.name }</p>
                          </Link>
                          <Settings2 onClick={ () => handleEditCustomerButtonClick(customer.id, customer.name) } />
                        </TableCell>
                      </TableRow>
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
        setOpenAddCustomer={ setOpenAddCustomer }
        handleAddCustomerNameInputChange={ handleAddCustomerNameInputChange }
        addCustomerNameInput={ addCustomerNameInput } 
        handleAddCustomerCancelButtonClick={ handleAddCustomerCancelButtonClick }
        handleAddCustomerConfirmButtonClick={ handleAddCustomerConfirmButtonClick }
      />

      <EditCustomerDialog 
        openEditCustomer={ openEditCustomer }
        setOpenEditCustomer={ setOpenEditCustomer }
        handleEditCustomerNameInputChange={ handleEditCustomerNameInputChange }
        editCustomerNameInput={ editCustomerNameInput } 
        handleEditCustomerCancelButtonClick={ handleEditCustomerCancelButtonClick }
        handleEditCustomerConfirmButtonClick={ handleEditCustomerConfirmButtonClick }
      />
    </>
  );
}

export default CustomersPage;
