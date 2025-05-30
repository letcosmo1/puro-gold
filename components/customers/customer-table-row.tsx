import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import Link from 'next/link'
import { Settings2 } from 'lucide-react'
import { Customer } from '@/types/entities/customer'

type PropTypes = {
  customer: Customer
  handleEditCustomerButtonClick: (customer: Customer) => void
}

const CustomerTableRow = ({ customer, handleEditCustomerButtonClick }: PropTypes) => {
  return (
    <TableRow key={ customer.id }>
      <TableCell className="flex justify-between py-4">
        <Link href={`/customers/${customer.id}`}>
          <p>{ customer.name }</p>
        </Link>
        <Settings2 className="text-primary" onClick={ () => handleEditCustomerButtonClick(customer) } />
      </TableCell>
    </TableRow>
  )
}

export default CustomerTableRow