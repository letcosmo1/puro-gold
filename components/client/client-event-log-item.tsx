import { ClientEventLogType } from '@/types/client-type'
import { toBrazilianCurrency } from '@/util/currency-format'
import { formatFirestoreTimestamp } from '@/util/date-format'
import { toPositive } from '@/util/math'
import React from 'react'

type PropTypes = {
  clientEvent: ClientEventLogType
}

const ClientEventLogItem = ({ clientEvent }: PropTypes) => {
  const getEventDescription = () => {
    const signal: string = clientEvent.type === "purchase" ? "+" : "-";
    const value: string = toBrazilianCurrency(toPositive(clientEvent.value));
    const description: string = clientEvent.description;

    const eventDescription: string = `${ signal } ${ value } ${ description }`;

    return eventDescription;
  }

  return (
    <article className="py-1">
      <div className="flex justify-between mb-2">
        <h3>{ clientEvent.type === "purchase" ? "Compra" : "Pagamento" }</h3>
        <p>{ formatFirestoreTimestamp(clientEvent.createdAt) }</p>
      </div>
      <p>{ getEventDescription() }</p>
    </article>
  )
}

export default ClientEventLogItem