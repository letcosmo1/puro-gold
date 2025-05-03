import { ClientEventLogType } from '@/types/client-type'
import { toBrazilianCurrency } from '@/util/currency-format'
import { formatFirestoreTimestamp } from '@/util/date-format'
import { toPositive } from '@/util/math'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'

type PropTypes = {
  clientEvent: ClientEventLogType,
  handleEditClientEventButtonClick: (clientEvent: ClientEventLogType) => void
}

const ClientEventLogItem = ({ clientEvent, handleEditClientEventButtonClick }: PropTypes) => {
  const getEventDescription = () => {
    const signal: string = clientEvent.type === "purchase" ? "+" : "-";
    const value: string = toBrazilianCurrency(toPositive(clientEvent.value));
    const description: string = clientEvent.description;

    const eventDescription: string = `${ signal } ${ value } ${ description }`;

    return eventDescription;
  }

  return (
    <article className="flex justify-between py-1">
      <div className="w-[calc(100%-36px)]">
        <div className="flex justify-between mb-2">
          <h3>{ clientEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
          <p>{ formatFirestoreTimestamp(clientEvent.createdAt) }</p>
        </div>
        <p>{ getEventDescription() }</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-fit"><EllipsisVertical /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={ () => handleEditClientEventButtonClick(clientEvent) }>Editar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </article>
  )
}

export default ClientEventLogItem