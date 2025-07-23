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

  const confirmButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleEditedCustomerNameInputChange = (e: React.BaseSyntheticEvent) => {
    setSelectedEditCustomer({ ...selectedEditCustomer, name: e.target.value });
  }

  const handleOnOpenAutoFocus = (e: Event) => {
    e.preventDefault(); 
    confirmButtonRef.current?.focus(); 
  }

  return (
    <Dialog open={ openEditCustomer }>
      <DialogContent aria-describedby={ undefined } onOpenAutoFocus={ handleOnOpenAutoFocus }>
        <DialogHeader>
          <DialogTitle>Editar nome do cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="new-customer-name" className="mb-2">Novo nome</Label>
          <Input
            data-testid="customers-edit-customer-name-input"
            id="new-customer-name" 
            onChange={ handleEditedCustomerNameInputChange } 
            value={ selectedEditCustomer.name }
            autoFocus={ false }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button 
            data-testid="customers-edit-customer-cancel-button"
            variant="secondary" 
            className="w-1/2" 
            onClick={ handleEditCustomerCancelButtonClick }
          >
            Cancelar
          </Button>
          <Button
            data-testid="customers-edit-customer-confirm-button"
            className="w-1/2" 
            onClick={ handleEditCustomerConfirmButtonClick }
            ref={ confirmButtonRef }
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCustomerDialog