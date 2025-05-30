import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PropTypes = {
  openAddPayment: boolean,
  handleAddPaymentCancelButtonClick: () => void,
  handleAddPaymentConfirmButtonClick: (description: string, value: string) => void
}

const AddPaymentDialog = (props: PropTypes) => {
  const {
    openAddPayment,
    handleAddPaymentCancelButtonClick,
    handleAddPaymentConfirmButtonClick
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
    handleAddPaymentCancelButtonClick();
  }

  const handleConfirmButtonClick = () => {
    setValue("");
    setDescription("");
    handleAddPaymentConfirmButtonClick(description, value);
  }

  return (
    <Dialog open={ openAddPayment }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar Pagamento</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="payment-value" className="mb-2">Valor do pagamento</Label>
          <Input
            type="number"
            id="payment-value"
            onChange={ handleValueInputChange }
            value={ value }
          />
        </div>
        <div>
          <Label htmlFor="payment-description" className="mb-2">Descrição do pagamento</Label>
          <Input
            id="payment-description"
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

export default AddPaymentDialog