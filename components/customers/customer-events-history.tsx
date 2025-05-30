import React from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { CustomerEvent, CustomerEventUpdateResponse, UpdateCustomerEventData } from '@/types/entities/customer'
import CustomerEventHistoryItem from './customer-event-history-item'
import { toNegative, toPositive } from '@/util/math'
import EditCustomerEventDialog from './edit-customer-event-dialog'
import { toast } from 'react-toastify'
import { getCookie } from '@/lib/get-cookie'
import { request } from '@/lib/api'
import { ApiErrorResponse } from '@/types/api/api-response'

const initializeCustomerEvent: CustomerEvent = {
  id: 0,
  customerId: 0,
  type: "purchase",
  date: "",
  description: "",
  value: 0,
  createdAt: ""
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

  const [openEditCustomerEvent, setOpenEditCustomerEvent] = React.useState<boolean>(false);
  const [selectedEditCustomerEvent, setSelectedEditCustomerEvent] = React.useState<CustomerEvent>(initializeCustomerEvent);

  const handleEditCustomerEventButtonClick = (customerEvent: CustomerEvent) => {
    setOpenEditCustomerEvent(true);
    setSelectedEditCustomerEvent({ ...customerEvent, value: toPositive(customerEvent.value) } );
  }

  const handleEditCustomerEventCancelButtonClick = () => {
    setOpenEditCustomerEvent(false);
    setSelectedEditCustomerEvent(initializeCustomerEvent);
  }

  const handleEditCustomerEventConfirmButtonClick = () => {
    if(!selectedEditCustomerEvent.description || !selectedEditCustomerEvent.value) {
      toast.warning("Dados inválidos");
      return
    }

    const valueWithSignal: number = 
      selectedEditCustomerEvent.type === "purchase" 
      ? toPositive(Number(selectedEditCustomerEvent.value)) 
      : toNegative(Number(selectedEditCustomerEvent.value))

    const updateCustomerEventData: UpdateCustomerEventData = {
      description: selectedEditCustomerEvent.description,
      value: valueWithSignal
    }

    const token = getCookie("token");
    request<CustomerEventUpdateResponse | ApiErrorResponse, UpdateCustomerEventData>(
      `customer-events/${selectedEditCustomerEvent.id}`, 
      { method: "PATCH", token: token, body: updateCustomerEventData }
    ).then(result => {
      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }

      const customerEventsHistoryCopy: CustomerEvent[] = [...customerEventsHistory];
      const customerEventsHistoryCopyUpdated: CustomerEvent[] = customerEventsHistoryCopy.map(
        customerEvent => customerEvent.id === selectedEditCustomerEvent.id ? 
        { ...selectedEditCustomerEvent, value: valueWithSignal } : customerEvent
      );

      console.log(customerEventsHistoryCopyUpdated)

      calcCustomerEventsTotal(customerEventsHistoryCopyUpdated);
      setCustomerEventsHistory(customerEventsHistoryCopyUpdated);
    });
    
    setOpenEditCustomerEvent(false);
    setSelectedEditCustomerEvent(initializeCustomerEvent);
  }

  return (
    <>
      <ScrollArea className="w-full h-[calc(100%-24px)]">
        <Table>
        <TableBody>
          { customerEventsHistory.map((customerEvent, i )=> {
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
          })}
        </TableBody>
        </Table>
      </ScrollArea>

      <EditCustomerEventDialog 
        openEditCustomerEvent={ openEditCustomerEvent } 
        selectedEditCustomerEvent={ selectedEditCustomerEvent } 
        setSelectedEditCustomerEvent={ setSelectedEditCustomerEvent } 
        handleEditCustomerEventCancelButtonClick={ handleEditCustomerEventCancelButtonClick } 
        handleEditCustomerEventConfirmButtonClick={ handleEditCustomerEventConfirmButtonClick }     
      />

    </>
  )
}

export default CustomerEventsHistory