import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropTypes = {
  openAddClient: boolean,
  setOpenAddClient: React.Dispatch<boolean>,
  handleAddClientNameInputChange: (e: React.BaseSyntheticEvent) => void,
  addClientNameInput: string,
  handleAddClientCancelButtonClick: () => void,
  handleAddClientConfirmButtonClick: () => void
}

const AddClientDialog = (props: PropTypes) => {
  const { 
    openAddClient, 
    setOpenAddClient,
    handleAddClientNameInputChange,
    addClientNameInput,
    handleAddClientCancelButtonClick,
    handleAddClientConfirmButtonClick
  } = props;

  return (
    <Dialog open={ openAddClient } onOpenChange={ setOpenAddClient }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="client-name" className="mb-2">Nome</Label>
          <Input 
            id="client-name" 
            onChange={ handleAddClientNameInputChange }
            value={ addClientNameInput }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleAddClientCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleAddClientConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddClientDialog