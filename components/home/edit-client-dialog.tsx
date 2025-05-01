import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PropTypes = {
  openEditClient: boolean,
  setOpenEditClient: React.Dispatch<boolean>,
  handleEditClientNameInputChange: (e: React.BaseSyntheticEvent) => void,
  editClientNameInput: string,
  handleEditClientCancelButtonClick: () => void,
  handleEditClientConfirmButtonClick: () => void
}

const EditClientDialog = (props: PropTypes) => {
  const { 
    openEditClient, 
    setOpenEditClient,
    handleEditClientNameInputChange,
    editClientNameInput,
    handleEditClientCancelButtonClick,
    handleEditClientConfirmButtonClick
  } = props;

  return (
    <Dialog open={ openEditClient } onOpenChange={ setOpenEditClient }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Editar nome do cliente</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="new-client-name" className="mb-2">Novo nome</Label>
          <Input 
            id="new-client-name" 
            onChange={ handleEditClientNameInputChange } 
            value={ editClientNameInput }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleEditClientCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleEditClientConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditClientDialog