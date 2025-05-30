import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PropTypes = {
  openAddPurchase: boolean,
  handleAddPurchaseCancelButtonClick: () => void,
  handleAddPurchaseConfirmButtonClick: (description: string, value: string) => void
}

const AddPurchaseDialog = (props: PropTypes) => {
  const {
    openAddPurchase,
    handleAddPurchaseCancelButtonClick,
    handleAddPurchaseConfirmButtonClick
  } = props

  const [value, setValue] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const handleValueInputChange = (e: React.BaseSyntheticEvent) => {
    setValue(e.target.value);
  }

  const handleDescriptionInputChange = (e: React.BaseSyntheticEvent) => {
    setDescription(e.target.value);
  }

  const handleCancelButtonClick = () => {
    setValue("");
    setDescription("");
    handleAddPurchaseCancelButtonClick();
  }

  const handleConfirmButtonClick = () => {
    setValue("");
    setDescription("");
    handleAddPurchaseConfirmButtonClick(description, value);
  }

  return (
    <Dialog open={ openAddPurchase }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar Compra</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="purchase-value" className="mb-2">Valor da compra</Label>
          <Input
            type="number"
            id="purchase-value"
            onChange={ handleValueInputChange }
            value={ value }
          />
        </div>
        <div>
          <Label htmlFor="purchase-description" className="mb-2">Descrição da compra</Label>
          <Input
            id="purchase-description"
            onChange={ handleDescriptionInputChange }
            value={ description }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddPurchaseDialog