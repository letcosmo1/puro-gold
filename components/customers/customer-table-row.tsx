import React from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Settings2 } from 'lucide-react'
import { Customer } from '@/types/entities/customer'

type PropTypes = {
  customer: Customer,
  handleEditCustomerButtonClick: (customer: Customer) => void,
  handleCustomerNameClick: (customerId: string) => void
}

const CustomerTableRow = (props: PropTypes) => {
  const { customer, handleEditCustomerButtonClick, handleCustomerNameClick } = props;

  return (
    <TableRow key={ customer.id }>
      <TableCell className="flex justify-between py-4">
        <p onClick={ () => handleCustomerNameClick(customer.id) }>{ customer.name }</p>
        <Settings2
          data-testid={`customers-settings-icon-${customer.id}`}
          className="text-primary" 
          onClick={ () => handleEditCustomerButtonClick(customer) } 
        />
      </TableCell>
    </TableRow>
  )
}

export default CustomerTableRow