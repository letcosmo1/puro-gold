import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { CustomerEvent } from '@/types/entities/customer';
import { Label } from '@radix-ui/react-label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { formatStringToDate } from '@/util/date-format';

type PropTypes = {
  openEditCustomerEvent: boolean,
  selectedEditCustomerEvent: CustomerEvent,
  setSelectedEditCustomerEvent: React.Dispatch<CustomerEvent>,
  handleEditCustomerEventCancelButtonClick: () => void,
  handleEditCustomerEventConfirmButtonClick: () => void
}

const EditCustomerEventDialog = (props: PropTypes) => {
  const { 
    openEditCustomerEvent, 
    selectedEditCustomerEvent,
    setSelectedEditCustomerEvent,
    handleEditCustomerEventCancelButtonClick,
    handleEditCustomerEventConfirmButtonClick
  } = props;

  const handleValueInputChange = (e: React.BaseSyntheticEvent) => {
    setSelectedEditCustomerEvent({ ...selectedEditCustomerEvent, value: e.target.value });
  }

  const handleDescriptionInputChange = (e: React.BaseSyntheticEvent) => {
    setSelectedEditCustomerEvent({ ...selectedEditCustomerEvent, description: e.target.value });
  }

  return (
    <Dialog open={ openEditCustomerEvent } >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="sr-only">
            { selectedEditCustomerEvent.type === "purchase" ? "Compra" : "Pagamento" }
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between mb-2">
            <h3>{ selectedEditCustomerEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
            <p>{ formatStringToDate(selectedEditCustomerEvent.createdAt) }</p>
          </div>

          <Label htmlFor="event-value" className="mb-2">Valor</Label>
          <Input
            type="number"
            id="event-value"
            value={ selectedEditCustomerEvent.value }
            onChange={ handleValueInputChange }
          />
        </div>
        <div>
          <Label htmlFor="event-description" className="mb-2">Descrição</Label>
          <Input
            id="event-description"
            value={ selectedEditCustomerEvent.description }
            onChange={ handleDescriptionInputChange }
          />
        </div>
        <DialogFooter className="flex-row">
          <Button variant="secondary" className="w-1/2" onClick={ handleEditCustomerEventCancelButtonClick }>Cancelar</Button>
          <Button className="w-1/2" onClick={ handleEditCustomerEventConfirmButtonClick }>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditCustomerEventDialog