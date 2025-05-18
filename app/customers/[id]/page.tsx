'use client'

import AddPaymentDialog from '@/components/customers/add-payment-dialog'
import AddPurchaseDialog from '@/components/customers/add-purchase-dialog'
import CustomerEventsHistory from '@/components/customers/customer-events-history'
import PdfButtons from '@/components/customers/pdf-buttons'
import { Button } from '@/components/ui/button'
import { mockedCustomerEventHistory, mockedCustomers } from '@/mocked-data/customer-data'
import { CustomerEvent, Customer } from '@/types/customer'
import { toBrazilianCurrency } from '@/util/currency-format'
import { getCurrentDate } from '@/util/date-format'
import { toNegative, toPositive } from '@/util/math'
import { X } from 'lucide-react'
import { ParamValue } from 'next/dist/server/request/params'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'

const CustomerDetailPage = () => {
  const params = useParams();
  const customerIdParam: ParamValue = params.id;

  const [customer, setCustomer] = useState<Customer>({ id: 0, name: "" });

  const [customerEventsHistory, setCustomerEventsHistory] = useState<CustomerEvent[]>(mockedCustomerEventHistory);

  const [customerEventsTotal, setCustomerEventsTotal] = useState<number | null>(null);

  const [openAddPurchase, setOpenAddPurchase] = useState<boolean>(false);
  const [openAddPayment, setOpenAddPayment] = useState<boolean>(false);

  const [addPurchaseValueInput, setAddPurchaseValueInput] = useState<string>("");
  const [addPurchaseDescriptionInput, setAddPurchaseDescriptionInput] = useState<string>("");

  const [addPaymentValueInput, setAddPaymentValueInput] = useState<string>("");
  const [addPaymentDescriptionInput, setAddPaymentDescriptionInput] = useState<string>("");

  const calcCustomerEventsTotal = (localCustomerEventsLog: CustomerEvent[]) => {
    if(localCustomerEventsLog.length === 0) return

    let total = 0;

    localCustomerEventsLog.forEach(customerEvent => {
      total += customerEvent.value;
    });

    setCustomerEventsTotal(total);
  }

  /***** ADD PURCHASE DIALOG FUNCTIONS *****/
  const handleAddPurchaseButtonClick = () => {
    setOpenAddPurchase(true);
  }

  const handleAddPurchaseCancelButtonClick = () => {
    setAddPurchaseValueInput("");
    setAddPurchaseDescriptionInput("");
    setOpenAddPurchase(false);
  }

  const handleAddPurchaseValueInputChange = (e: BaseSyntheticEvent) => {
    setAddPurchaseValueInput(e.target.value);
  }

  const handleAddPurchaseDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setAddPurchaseDescriptionInput(e.target.value);
  }

  const handleAddPurchaseConfirmButtonClick = () => {
    if(addPurchaseValueInput && addPurchaseDescriptionInput) {
      const id: number = customerEventsHistory.length + 1;

      const currentDate: string = getCurrentDate();
      const purchaseValue: number = Number(addPurchaseValueInput);

      const customerEvent: CustomerEvent = {
        id: id,
        customerId: customer.id,
        type: "purchase",
        date: currentDate,
        description: addPurchaseDescriptionInput,
        createdAt: new Date,
        value: toPositive(purchaseValue)
      }

      const customerEventsLogCopy: CustomerEvent[] = [customerEvent, ...customerEventsHistory ];

      calcCustomerEventsTotal(customerEventsLogCopy);
      setCustomerEventsHistory(customerEventsLogCopy);
    }
    //TODO: add error toast
    setAddPurchaseValueInput("");
    setAddPurchaseDescriptionInput("");
    setOpenAddPurchase(false);
  }

  /***** ADD PAYMENT DIALOG FUNCTIONS *****/  
  const handleAddPaymentButtonClick = () => {
    setOpenAddPayment(true);
  }

  const handleAddPaymentCancelButtonClick = () => {
    setAddPaymentValueInput("");
    setAddPaymentDescriptionInput("");
    setOpenAddPayment(false);
  }

  const handleAddPaymentValueInputChange = (e: BaseSyntheticEvent) => {
    setAddPaymentValueInput(e.target.value);
  }

  const handleAddPaymentDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setAddPaymentDescriptionInput(e.target.value);
  }

  const handleAddPaymentConfirmButtonClick = () => {
    if(addPaymentValueInput && addPaymentDescriptionInput) {
      const id: number = customerEventsHistory.length + 1;

      const currentDate: string = getCurrentDate();
      const paymentValue: number = Number(addPaymentValueInput);

      const customerEvent: CustomerEvent = {
        id: id,
        customerId: customer.id,
        type: "payment",
        date: currentDate,
        description: addPaymentDescriptionInput,
        createdAt: new Date,
        value: toNegative(paymentValue)
      }

      const customerEventsLogCopy: CustomerEvent[] = [customerEvent, ...customerEventsHistory ];

      calcCustomerEventsTotal(customerEventsLogCopy);
      setCustomerEventsHistory(customerEventsLogCopy);
    }
    //TODO: add error toast
    setAddPaymentValueInput("");
    setAddPaymentDescriptionInput("");
    setOpenAddPayment(false);
  }

  const mockedGetCustomerById = () => {
    const customerId: number = Number(customerIdParam);

    const findCustomer: Customer | undefined = mockedCustomers.find(customer => customer.id === customerId);

    if(findCustomer) {
      setCustomer(findCustomer);
    }

    //TODO: handle customer not found
  }

/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => { 
    mockedGetCustomerById(); 
    calcCustomerEventsTotal(customerEventsHistory);
  }, []);
/* eslint-enable react-hooks/exhaustive-deps */

  return (
    <main>
      <div className="flex flex-col justify-between h-[calc(dvh-var(--header-height)-var(--spacing)*8)]">
        <section>
          <nav className="flex justify-end">
            <Link href="/customers">
              <X/>
            </Link>
          </nav>
          <h2 className="font-medium text-sm">Cliente</h2>
          <p>{ customer.name }</p>
        </section>

        <section className="bg-card text-card-foreground flex flex-col gap-2 rounded-md border p-4">
          <h2 className="font-medium text-sm">Total a pagar</h2>
          <p className="text-lg">{ toBrazilianCurrency(customerEventsTotal ? customerEventsTotal : 0) }</p>
        </section>

        <section className="rounded-md border p-4 h-[calc(100%-194px-var(--spacing)*16)]">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium text-sm">Histórico</h2>
            <PdfButtons 
              customer={ customer }
              customerEventsHistory={ customerEventsHistory }
              customerEventsTotal={ customerEventsTotal } 
            />
          </div>
          <CustomerEventsHistory
            customerEventsHistory={ customerEventsHistory } 
            setCustomerEventsHistory={ setCustomerEventsHistory }
            calcCustomerEventsTotal={ calcCustomerEventsTotal }        
          />
        </section>  

        <section className="flex justify-between">
          <Button className="w-[65%]" onClick={ handleAddPurchaseButtonClick } >Adicionar Compra</Button>
          <Button className="w-[30%]" onClick={ handleAddPaymentButtonClick }>Abater</Button>
        </section>
      </div>

      <AddPurchaseDialog 
        openAddPurchase={ openAddPurchase }
        setOpenAddPurchase={ setOpenAddPurchase }
        handleAddPurchaseValueInputChange={ handleAddPurchaseValueInputChange }
        addPurchaseValueInput={ addPurchaseValueInput }
        handleAddPurchaseDescriptionInputChange={ handleAddPurchaseDescriptionInputChange }
        addPurchaseDescriptionInput={ addPurchaseDescriptionInput }
        handleAddPurchaseCancelButtonClick={ handleAddPurchaseCancelButtonClick }
        handleAddPurchaseConfirmButtonClick={ handleAddPurchaseConfirmButtonClick }
      />

      <AddPaymentDialog 
        openAddPayment={ openAddPayment }
        setOpenAddPayment={ setOpenAddPayment }
        handleAddPaymentValueInputChange={ handleAddPaymentValueInputChange }
        addPaymentValueInput={ addPaymentValueInput }
        handleAddPaymentDescriptionInputChange={ handleAddPaymentDescriptionInputChange }
        addPaymentDescriptionInput={ addPaymentDescriptionInput }
        handleAddPaymentCancelButtonClick={ handleAddPaymentCancelButtonClick }
        handleAddPaymentConfirmButtonClick={ handleAddPaymentConfirmButtonClick }
      />
    </main>
  )
}

export default CustomerDetailPage