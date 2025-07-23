import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropTypes = {
  openAddCustomer: boolean,
  handleAddCustomerCancelButtonClick: () => void,
  handleAddCustomerConfirmButtonClick: (name: string) => void
}

const AddCustomerDialog = (props: PropTypes) => {
  const { 
    openAddCustomer, 
    handleAddCustomerCancelButtonClick,
    handleAddCustomerConfirmButtonClick
  } = props;

  const [name, setName]= React.useState("");

  const handleNameInputChange = (e: React.BaseSyntheticEvent) => {
    setName(e.target.value);
  }

  const handleConfirmButtonClick = (name: string) => {
    setName("");
    handleAddCustomerConfirmButtonClick(name);
  }

  const handleCancelButtonClick = () => {
    setName("");
    handleAddCustomerCancelButtonClick();
  }

  return (
    <Dialog open={ openAddCustomer }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="customer-name" className="mb-2">Nome</Label>
          <Input
            data-testid="customers-add-customer-name-input"
            id="customer-name" 
            onChange={ handleNameInputChange }
            value={ name }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button
            data-testid="customers-add-customer-cancel-button"
            variant="secondary" 
            className="w-1/2" 
            onClick={ handleCancelButtonClick }
          >
            Cancelar
          </Button>
          <Button
            data-testid="customers-add-customer-confirm-button"
            className="w-1/2" 
            onClick={ () => handleConfirmButtonClick(name) }
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCustomerDialog