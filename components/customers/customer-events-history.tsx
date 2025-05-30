import React, { BaseSyntheticEvent, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { CustomerEvent } from '@/types/entities/customer'
import CustomerEventHistoryItem from './customer-event-history-item'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { formatDate } from '@/util/date-format'
import { toNegative, toPositive } from '@/util/math'

const initializeCustomerEvent: CustomerEvent = {
  id: 0,
  customerId: 0,
  type: "purchase",
  date: "",
  description: "",
  value: 0,
  createdAt: new Date(0)
}

type PropTypes = {
  customerEventsHistory: CustomerEvent[],
  setCustomerEventsHistory: React.Dispatch<CustomerEvent[]>,
  calcCustomerEventsTotal: (localCustomerEventsHistory: CustomerEvent[]) => void
}

const CustomerEventsHistory = (props: PropTypes) => {
  const { 
    customerEventsHistory,
    setCustomerEventsHistory,
    calcCustomerEventsTotal
  } = props

  const [openCustomerEvent, setOpenCustomerEvent] = useState<boolean>(false);

  const [editCustomerEventValueInput, setEditCustomerEventValueInput] = useState<string>("");
  const [editCustomerEventDescriptionInput, setEditCustomerEventDescriptionInput] = useState<string>("");

  const [selectedCustomerEvent, setSelectedCustomerEvent] = useState<CustomerEvent>(initializeCustomerEvent);

  const handleEditCustomerEventButtonClick = (customerEvent: CustomerEvent) => {
    setOpenCustomerEvent(true);
    setSelectedCustomerEvent(customerEvent);
    setEditCustomerEventValueInput(String(toPositive(customerEvent.value)));
    setEditCustomerEventDescriptionInput(customerEvent.description);
  }

  const handleEditCustomerEventValueInputChange = (e: BaseSyntheticEvent) => {
    setEditCustomerEventValueInput(e.target.value);
  }

  const handleEditCustomerEventDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setEditCustomerEventDescriptionInput(e.target.value);
  }

  const handleEditCustomerEventCancelButtonClick = () => {
    setOpenCustomerEvent(false);
    setSelectedCustomerEvent(initializeCustomerEvent);
    setEditCustomerEventValueInput("");
    setEditCustomerEventDescriptionInput("");
  }

  const handleEditCustomerEventConfirmButtonClick = () => {
    if(editCustomerEventValueInput && editCustomerEventDescriptionInput) {
      const editCustomerEventValueToNumber: number = Number(editCustomerEventValueInput);

      const customerEventsHistoryCopy: CustomerEvent[] = [...customerEventsHistory];

      const customerEventsHistoryCopyUpdated: CustomerEvent[] = 
        customerEventsHistoryCopy.map(customerEvent => customerEvent.id === selectedCustomerEvent.id ? 
        { ...customerEvent, 
          value: customerEvent.type === "purchase" ? toPositive(editCustomerEventValueToNumber) : toNegative(editCustomerEventValueToNumber),  
          description: editCustomerEventDescriptionInput 
        }
        : customerEvent
      );

      calcCustomerEventsTotal(customerEventsHistoryCopyUpdated);
      setCustomerEventsHistory(customerEventsHistoryCopyUpdated);
    }
    //TODO: add error toast
    setOpenCustomerEvent(false);
    setSelectedCustomerEvent(initializeCustomerEvent);
    setEditCustomerEventValueInput("");
    setEditCustomerEventDescriptionInput("");
  }

  return (
    <>
      <ScrollArea className="w-full h-[calc(100%-24px)]">
        <Table>
          <TableBody>
            {
              customerEventsHistory.map((customerEvent, i )=> {
                return (
                  <TableRow key={ i } >
                    <TableCell className="py-2 pl-2 pr-0">
                      <CustomerEventHistoryItem  
                        customerEvent={ customerEvent } 
                        handleEditCustomerEventButtonClick={ handleEditCustomerEventButtonClick }
                      />
                    </TableCell>
                  </TableRow> 
                )
              })
            }
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={ openCustomerEvent } onOpenChange={ setOpenCustomerEvent }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="sr-only">{ selectedCustomerEvent.type === "purchase" ? "Compra" : "Pagamento" }</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex justify-between mb-2">
              <h3>{ selectedCustomerEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
              <p>{ formatDate(selectedCustomerEvent.createdAt) }</p>
            </div>

            <Label htmlFor="event-value" className="mb-2">Valor</Label>
            <Input
              type="number"
              id="event-value"
              value={ editCustomerEventValueInput }
              onChange={ handleEditCustomerEventValueInputChange }
            />
          </div>
          <div>
            <Label htmlFor="event-description" className="mb-2">Descrição</Label>
            <Input
              id="event-description"
              value={ editCustomerEventDescriptionInput }
              onChange={ handleEditCustomerEventDescriptionInputChange }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleEditCustomerEventCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleEditCustomerEventConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CustomerEventsHistory