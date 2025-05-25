import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Customer } from '@/types/entities/customer';

type PropTypes = {
  openEditCustomer: boolean,
  selectedEditCustomer: Customer,
  setSelectedEditCustomer: React.Dispatch<Customer>,
  handleEditCustomerCancelButtonClick: () => void,
  handleEditCustomerConfirmButtonClick: () => void
}

const EditCustomerDialog = (props: PropTypes) => {
  const { 
    openEditCustomer, 
    selectedEditCustomer,
    setSelectedEditCustomer,
    handleEditCustomerCancelButtonClick,
    handleEditCustomerConfirmButtonClick
  } = props;

  const handleEditedCustomerNameInputChange = (e: React.BaseSyntheticEvent) => {
    setSelectedEditCustomer({ ...selectedEditCustomer, name: e.target.value });
  }

  return (
    <Dialog open={ openEditCustomer }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar nome do cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="new-customer-name" className="mb-2">Novo nome</Label>
          <Input 
            id="new-customer-name" 
            onChange={ handleEditedCustomerNameInputChange } 
            value={ selectedEditCustomer.name }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleEditCustomerCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleEditCustomerConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCustomerDialog