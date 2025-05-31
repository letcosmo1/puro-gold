'use client'

import React from 'react'
import Link from 'next/link'
import AddPaymentDialog from '@/components/customers/add-payment-dialog'
import AddPurchaseDialog from '@/components/customers/add-purchase-dialog'
import CustomerEventsHistory from '@/components/customers/customer-events-history'
import PdfButtons from '@/components/customers/pdf-buttons'
import { Button } from '@/components/ui/button'
import { request } from '@/lib/api'
import { getCookie } from '@/lib/get-cookie'
import { ApiErrorResponse } from '@/types/api/api-response'
import { CustomerEvent, Customer, NewCustomerEventData, CustomerEventCreateResponse, CustomerResponse, CustomerEventListResponse } from '@/types/entities/customer'
import { toBrazilianCurrency } from '@/util/currency-format'
import { getCurrentDate } from '@/util/date-format'
import { toNegative, toPositive } from '@/util/math'
import { X } from 'lucide-react'
import { ParamValue } from 'next/dist/server/request/params'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import LoadingOverlay from '@/components/global/loading-overlay'

const CustomerDetailPage = () => {
  const params = useParams();
  const customerIdParam: ParamValue = params.id;

  const [customer, setCustomer] = React.useState<Customer>({ id: 0, name: "" });

  const [customerEventsHistory, setCustomerEventsHistory] = React.useState<CustomerEvent[]>([]);
  const [customerEventsTotal, setCustomerEventsTotal] = React.useState<number | null>(null);

  const [openAddPurchase, setOpenAddPurchase] = React.useState<boolean>(false);
  const [openAddPayment, setOpenAddPayment] = React.useState<boolean>(false);

  const [apiLoading, setApiLoading] = React.useState(false);

  const getCustomer = () => {
    const customerId: string = String(customerIdParam);

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerResponse | ApiErrorResponse, null>(`customers/${customerId}`, 
      { method: "GET", token: token }
    ).then(result => {
      setApiLoading(false);

      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      setCustomer(result.data.customer);
    });
  }

  const getCustomerEvents = () => {
    const customerId: string = String(customerIdParam);

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerEventListResponse | ApiErrorResponse, null>(`customer-events/${customerId}`, 
      { method: "GET", token: token }
    ).then(result => {
      setApiLoading(false);

      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      setCustomerEventsHistory(result.data.customerEvents);
      calcCustomerEventsTotal(result.data.customerEvents);
    });
  }

  const calcCustomerEventsTotal = (customerEvents: CustomerEvent[]) => {
    if(customerEvents.length === 0) return
    let total = 0;
    customerEvents.forEach(event => total += event.value);
    setCustomerEventsTotal(total);
  }

  /***** ADD PURCHASE DIALOG FUNCTIONS *****/
  const handleAddPurchaseButtonClick = () => setOpenAddPurchase(true);
  const handleAddPurchaseCancelButtonClick = () => setOpenAddPurchase(false);

  const handleAddPurchaseConfirmButtonClick = (description: string, value: string) => {
    if(!description || !value) {
      toast.warning("Dados inválidos");
      return
    }
    
    const currentDate: string = getCurrentDate();
    const numberValue: number = Number(value);
    const customerEvent: NewCustomerEventData = {
      customerId: customer.id,
      type: "purchase",
      date: currentDate,
      description: description,
      createdAt: new Date,
      value: toPositive(numberValue)
    }

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerEventCreateResponse | ApiErrorResponse, NewCustomerEventData>("customer-events", 
      { method: "POST", token: token, body: customerEvent }
    ).then(result => {
      setApiLoading(false);

      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      const customerEventsLogCopy: CustomerEvent[] = [result.data.customerEvent, ...customerEventsHistory ];
      calcCustomerEventsTotal(customerEventsLogCopy);
      setCustomerEventsHistory(customerEventsLogCopy);
    });

    setOpenAddPurchase(false);
  }

  /***** ADD PAYMENT DIALOG FUNCTIONS *****/  
  const handleAddPaymentButtonClick = () => setOpenAddPayment(true);
  const handleAddPaymentCancelButtonClick = () => setOpenAddPayment(false);

  const handleAddPaymentConfirmButtonClick = (description: string, value: string) => {
    if(!description || !value) {
      toast.warning("Dados inválidos");
      return
    }
    
    const currentDate: string = getCurrentDate();
    const numberValue: number = Number(value);
    const customerEvent: NewCustomerEventData = {
      customerId: customer.id,
      type: "payment",
      date: currentDate,
      description: description,
      createdAt: new Date,
      value: toNegative(numberValue)
    }

    setApiLoading(true);
    const token = getCookie("token");
    request<CustomerEventCreateResponse | ApiErrorResponse, NewCustomerEventData>("customer-events",
      { method: "POST", token: token, body: customerEvent }
    ).then(result => {
      setApiLoading(false);

      if(!result.data.success) {
        toast.error(result.data.errorMessage);
        return
      }
      const customerEventsLogCopy: CustomerEvent[] = [result.data.customerEvent, ...customerEventsHistory ];
      calcCustomerEventsTotal(customerEventsLogCopy);
      setCustomerEventsHistory(customerEventsLogCopy);
    });

    setOpenAddPayment(false);
  }

/* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => { 
    getCustomer(); 
    getCustomerEvents();
  }, []);
/* eslint-enable react-hooks/exhaustive-deps */

  return (
    <>
      <LoadingOverlay show={ apiLoading } />

      <main className="p-4">
        <div className="flex flex-col justify-between h-[calc(100dvh-var(--header-height)-var(--spacing)*8)]">
          <section>
            <nav className="flex justify-end">
              <Link href="/customers">
                <X className="text-primary"/>
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
          handleAddPurchaseCancelButtonClick={ handleAddPurchaseCancelButtonClick }
          handleAddPurchaseConfirmButtonClick={ handleAddPurchaseConfirmButtonClick }
        />

        <AddPaymentDialog 
          openAddPayment={ openAddPayment }
          handleAddPaymentCancelButtonClick={ handleAddPaymentCancelButtonClick }
          handleAddPaymentConfirmButtonClick={ handleAddPaymentConfirmButtonClick }
        />
      </main>
    </>
  )
}

export default CustomerDetailPage