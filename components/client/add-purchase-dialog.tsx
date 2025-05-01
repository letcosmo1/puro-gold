import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PropTypes = {
  openAddPurchase: boolean,
  setOpenAddPurchase: React.Dispatch<boolean>,
  handleAddPurchaseValueInputChange: (e: React.BaseSyntheticEvent) => void,
  addPurchaseValueInput: string,
  handleAddPurchaseDescriptionInputChange: (e: React.BaseSyntheticEvent) => void,
  addPurchaseDescriptionInput: string,
  handleAddPurchaseCancelButtonClick: () => void,
  handleAddPurchaseConfirmButtonClick: () => void
}

const AddPurchaseDialog = (props: PropTypes) => {
  const {
    openAddPurchase,
    setOpenAddPurchase,
    handleAddPurchaseValueInputChange,
    addPurchaseValueInput,
    handleAddPurchaseDescriptionInputChange,
    addPurchaseDescriptionInput,
    handleAddPurchaseCancelButtonClick,
    handleAddPurchaseConfirmButtonClick
  } = props

  return (
    <Dialog open={ openAddPurchase } onOpenChange={ setOpenAddPurchase }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar Compra</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="purchase-value" className="mb-2">Valor da compra</Label>
          <Input
            type="number"
            id="purchase-value"
            onChange={ handleAddPurchaseValueInputChange }
            value={ addPurchaseValueInput }
          />
        </div>
        <div>
          <Label htmlFor="purchase-description" className="mb-2">Descrição da compra</Label>
          <Input
            id="purchase-description"
            onChange={ handleAddPurchaseDescriptionInputChange }
            value={ addPurchaseDescriptionInput }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleAddPurchaseCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleAddPurchaseConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddPurchaseDialog