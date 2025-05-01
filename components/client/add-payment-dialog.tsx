import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type PropTypes = {
  openAddPayment: boolean,
  setOpenAddPayment: React.Dispatch<boolean>,
  handleAddPaymentValueInputChange: (e: React.BaseSyntheticEvent) => void,
  addPaymentValueInput: string,
  handleAddPaymentDescriptionInputChange: (e: React.BaseSyntheticEvent) => void,
  addPaymentDescriptionInput: string,
  handleAddPaymentCancelButtonClick: () => void,
  handleAddPaymentConfirmButtonClick: () => void
}

const AddPaymentDialog = (props: PropTypes) => {
  const {
    openAddPayment,
    setOpenAddPayment,
    handleAddPaymentValueInputChange,
    addPaymentValueInput,
    handleAddPaymentDescriptionInputChange,
    addPaymentDescriptionInput,
    handleAddPaymentCancelButtonClick,
    handleAddPaymentConfirmButtonClick
  } = props

  return (
    <Dialog open={ openAddPayment } onOpenChange={ setOpenAddPayment }>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Adicionar Pagamento</DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="payment-value" className="mb-2">Valor do pagamento</Label>
          <Input
            type="number"
            id="payment-value"
            onChange={ handleAddPaymentValueInputChange }
            value={ addPaymentValueInput }
          />
        </div>
        <div>
          <Label htmlFor="payment-description" className="mb-2">Descrição do pagamento</Label>
          <Input
            id="payment-description"
            onChange={ handleAddPaymentDescriptionInputChange }
            value={ addPaymentDescriptionInput }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleAddPaymentCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleAddPaymentConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddPaymentDialog