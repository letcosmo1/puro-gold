import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropTypes = {
  openEditCustomer: boolean,
  setOpenEditCustomer: React.Dispatch<boolean>,
  handleEditCustomerNameInputChange: (e: React.BaseSyntheticEvent) => void,
  editCustomerNameInput: string,
  handleEditCustomerCancelButtonClick: () => void,
  handleEditCustomerConfirmButtonClick: () => void
}

const EditCustomerDialog = (props: PropTypes) => {
  const { 
    openEditCustomer, 
    setOpenEditCustomer,
    handleEditCustomerNameInputChange,
    editCustomerNameInput,
    handleEditCustomerCancelButtonClick,
    handleEditCustomerConfirmButtonClick
  } = props;

  return (
    <Dialog open={ openEditCustomer } onOpenChange={ setOpenEditCustomer }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar nome do cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="new-customer-name" className="mb-2">Novo nome</Label>
          <Input 
            id="new-customer-name" 
            onChange={ handleEditCustomerNameInputChange } 
            value={ editCustomerNameInput }
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