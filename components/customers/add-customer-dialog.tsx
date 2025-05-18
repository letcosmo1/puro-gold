import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropTypes = {
  openAddCustomer: boolean,
  setOpenAddCustomer: React.Dispatch<boolean>,
  handleAddCustomerNameInputChange: (e: React.BaseSyntheticEvent) => void,
  addCustomerNameInput: string,
  handleAddCustomerCancelButtonClick: () => void,
  handleAddCustomerConfirmButtonClick: () => void
}

const AddCustomerDialog = (props: PropTypes) => {
  const { 
    openAddCustomer, 
    setOpenAddCustomer,
    handleAddCustomerNameInputChange,
    addCustomerNameInput,
    handleAddCustomerCancelButtonClick,
    handleAddCustomerConfirmButtonClick
  } = props;

  return (
    <Dialog open={ openAddCustomer } onOpenChange={ setOpenAddCustomer }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="customer-name" className="mb-2">Nome</Label>
          <Input 
            id="customer-name" 
            onChange={ handleAddCustomerNameInputChange }
            value={ addCustomerNameInput }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleAddCustomerCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleAddCustomerConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCustomerDialog