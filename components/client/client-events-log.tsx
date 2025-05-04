import React, { BaseSyntheticEvent, useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { ClientEvent } from '@/types/client-type'
import ClientEventLogItem from './client-event-log-item'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { formatDate } from '@/util/date-format'
import { toNegative, toPositive } from '@/util/math'

const initializeClientEvent: ClientEvent = {
  id: 0,
  clientId: 0,
  type: "purchase",
  date: "",
  description: "",
  value: 0,
  createdAt: new Date(0)
}

type PropTypes = {
  clientEventsLog: ClientEvent[],
  setClientEventsLog: React.Dispatch<ClientEvent[]>,
  calcClientEventsTotal: (localClientEventsLog: ClientEvent[]) => void
}

const ClientEventsLog = (props: PropTypes) => {
  const { 
    clientEventsLog,
    setClientEventsLog,
    calcClientEventsTotal
  } = props

  const [openClientEvent, setOpenClientEvent] = useState<boolean>(false);

  const [editClientEventValueInput, setEditClientEventValueInput] = useState<string>("");
  const [editClientEventDescriptionInput, setEditClientEventDescriptionInput] = useState<string>("");

  const [selectedClientEvent, setSelectedClientEvent] = useState<ClientEvent>(initializeClientEvent);

  const handleEditClientEventButtonClick = (clientEvent: ClientEvent) => {
    setOpenClientEvent(true);
    setSelectedClientEvent(clientEvent);
    setEditClientEventValueInput(String(toPositive(clientEvent.value)));
    setEditClientEventDescriptionInput(clientEvent.description);
  }

  const handleEditClientEventValueInputChange = (e: BaseSyntheticEvent) => {
    setEditClientEventValueInput(e.target.value);
  }

  const handleEditClientEventDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setEditClientEventDescriptionInput(e.target.value);
  }

  const handleEditClientEventCancelButtonClick = () => {
    setOpenClientEvent(false);
    setSelectedClientEvent(initializeClientEvent);
    setEditClientEventValueInput("");
    setEditClientEventDescriptionInput("");
  }

  const handleEditClientEventConfirmButtonClick = () => {
    if(editClientEventValueInput && editClientEventDescriptionInput) {
      const editClientEventValueToNumber: number = Number(editClientEventValueInput);

      const clientEventsLogCopy: ClientEvent[] = [...clientEventsLog];

      const clientEventsLogCopyUpdated: ClientEvent[] = 
        clientEventsLogCopy.map(clientEvent => clientEvent.id === selectedClientEvent.id ? 
        { ...clientEvent, 
          value: clientEvent.type === "purchase" ? toPositive(editClientEventValueToNumber) : toNegative(editClientEventValueToNumber),  
          description: editClientEventDescriptionInput 
        }
        : clientEvent
      );

      calcClientEventsTotal(clientEventsLogCopyUpdated);
      setClientEventsLog(clientEventsLogCopyUpdated);
    }
    //TODO: add error toast
    setOpenClientEvent(false);
    setSelectedClientEvent(initializeClientEvent);
    setEditClientEventValueInput("");
    setEditClientEventDescriptionInput("");
  }

  return (
    <>
      <ScrollArea className="w-full h-[calc(100%-24px)]">
        <Table>
          <TableBody>
            {
              clientEventsLog.map((clientEvent, i )=> {
                return (
                  <TableRow key={ i } >
                    <TableCell className="py-2 pl-2 pr-0">
                      <ClientEventLogItem  
                        clientEvent={ clientEvent } 
                        handleEditClientEventButtonClick={ handleEditClientEventButtonClick }
                      />
                    </TableCell>
                  </TableRow> 
                )
              })
            }
          </TableBody>
        </Table>
      </ScrollArea>

      <Dialog open={ openClientEvent } onOpenChange={ setOpenClientEvent }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="sr-only">{ selectedClientEvent.type === "purchase" ? "Compra" : "Pagamento" }</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex justify-between mb-2">
              <h3>{ selectedClientEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
              <p>{ formatDate(selectedClientEvent.createdAt) }</p>
            </div>

            <Label htmlFor="event-value" className="mb-2">Valor</Label>
            <Input
              type="number"
              id="event-value"
              value={ editClientEventValueInput }
              onChange={ handleEditClientEventValueInputChange }
            />
          </div>
          <div>
            <Label htmlFor="event-description" className="mb-2">Descrição</Label>
            <Input
              id="event-description"
              value={ editClientEventDescriptionInput }
              onChange={ handleEditClientEventDescriptionInputChange }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleEditClientEventCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleEditClientEventConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ClientEventsLog