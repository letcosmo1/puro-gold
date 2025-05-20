import { CustomerEvent } from '@/types/entities/customer'
import { toBrazilianCurrency } from '@/util/currency-format'
import { toPositive } from '@/util/math'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { formatDate } from '@/util/date-format'

type PropTypes = {
  customerEvent: CustomerEvent,
  handleEditCustomerEventButtonClick: (customerEvent: CustomerEvent) => void
}

const CustomerEventHistoryItem = ({ customerEvent, handleEditCustomerEventButtonClick }: PropTypes) => {
  const getEventDescription = () => {
    const signal: string = customerEvent.type === "purchase" ? "+" : "-";
    const value: string = toBrazilianCurrency(toPositive(customerEvent.value));
    const description: string = customerEvent.description;

    const eventDescription: string = `${ signal } ${ value } ${ description }`;

    return eventDescription;
  }

  return (
    <article className="flex justify-between py-1">
      <div className="w-[calc(100%-36px)]">
        <div className="flex justify-between mb-2">
          <h3>{ customerEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
          <p>{ formatDate(customerEvent.createdAt) }</p>
        </div>
        <p>{ getEventDescription() }</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-fit"><EllipsisVertical className="text-primary" /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={ () => handleEditCustomerEventButtonClick(customerEvent) }>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}

export default CustomerEventHistoryItem