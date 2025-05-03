'use client'

import AddPaymentDialog from '@/components/client/add-payment-dialog'
import AddPurchaseDialog from '@/components/client/add-purchase-dialog'
import ClientEventsLog from '@/components/client/client-events-log'
import PdfButtons from '@/components/client/pdf-buttons'
import { Button } from '@/components/ui/button'
import { mockedClientEventLog, mockedClients } from '@/mocked-data/client-data'
import { ClientEventLogType, ClientType } from '@/types/client-type'
import { toBrazilianCurrency } from '@/util/currency-format'
import { getCurrentDate, mockFirestoreTimestamp } from '@/util/date-format'
import { toNegative, toPositive } from '@/util/math'
import { X } from 'lucide-react'
import { ParamValue } from 'next/dist/server/request/params'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'

const ClientPage = () => {
  const params = useParams();
  const clientIdParam: ParamValue = params.id;

  const [client, setClient] = useState<ClientType>({ id: 0, name: "" });

  const [clientEventsLog, setClientEventsLog] = useState<ClientEventLogType[]>(mockedClientEventLog);

  const [clientEventsTotal, setClientEventsTotal] = useState<number | null>(null);

  const [openAddPurchase, setOpenAddPurchase] = useState<boolean>(false);
  const [openAddPayment, setOpenAddPayment] = useState<boolean>(false);

  const [addPurchaseValueInput, setAddPurchaseValueInput] = useState<string>("");
  const [addPurchaseDescriptionInput, setAddPurchaseDescriptionInput] = useState<string>("");

  const [addPaymentValueInput, setAddPaymentValueInput] = useState<string>("");
  const [addPaymentDescriptionInput, setAddPaymentDescriptionInput] = useState<string>("");

  const calcClientEventsTotal = (localClientEventsLog: ClientEventLogType[]) => {
    if(localClientEventsLog.length === 0) return

    let total = 0;

    localClientEventsLog.forEach(clientEvent => {
      total += clientEvent.value;
    });

    setClientEventsTotal(total);
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
      const id: number = clientEventsLog.length + 1;

      const currentDate: string = getCurrentDate();
      const purchaseValue: number = Number(addPurchaseValueInput);

      const clientEvent: ClientEventLogType = {
        id: id,
        clientId: client.id,
        type: "purchase",
        date: currentDate,
        description: addPurchaseDescriptionInput,
        createdAt: mockFirestoreTimestamp(),
        value: toPositive(purchaseValue)
      }

      const clientEventsLogCopy: ClientEventLogType[] = [clientEvent, ...clientEventsLog ];

      calcClientEventsTotal(clientEventsLogCopy);
      setClientEventsLog(clientEventsLogCopy);
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
      const id: number = clientEventsLog.length + 1;

      const currentDate: string = getCurrentDate();
      const paymentValue: number = Number(addPaymentValueInput);

      const clientEvent: ClientEventLogType = {
        id: id,
        clientId: client.id,
        type: "payment",
        date: currentDate,
        description: addPaymentDescriptionInput,
        createdAt: mockFirestoreTimestamp(),
        value: toNegative(paymentValue)
      }

      const clientEventsLogCopy: ClientEventLogType[] = [clientEvent, ...clientEventsLog ];

      calcClientEventsTotal(clientEventsLogCopy);
      setClientEventsLog(clientEventsLogCopy);
    }
    //TODO: add error toast
    setAddPaymentValueInput("");
    setAddPaymentDescriptionInput("");
    setOpenAddPayment(false);
  }

  const mockedGetClientById = () => {
    const clientId: number = Number(clientIdParam);

    const findClient: ClientType | undefined = mockedClients.find(client => client.id === clientId);

    if(findClient) {
      setClient(findClient);
    }

    //TODO: handle client not found
  }

  useEffect(() => {
    mockedGetClientById();
    calcClientEventsTotal(clientEventsLog);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-[calc(100vh-var(--header-height)-var(--spacing)*8)]">
        <section>
          <nav className="flex justify-end">
            <Link href="/">
              <X/>
            </Link>
          </nav>
          <h2 className="font-medium text-sm">Cliente</h2>
          <p>{ client.name }</p>
        </section>

        <section className="bg-card text-card-foreground flex flex-col gap-2 rounded-md border p-4">
          <h2 className="font-medium text-sm">Total a pagar</h2>
          <p className="text-lg">{ toBrazilianCurrency(clientEventsTotal ? clientEventsTotal : 0) }</p>
        </section>

        <section className="rounded-md border p-4 h-[calc(100%-194px-var(--spacing)*16)]">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium text-sm">Histórico</h2>
            <PdfButtons 
              client={ client }
              clientEventsLog={ clientEventsLog }
              clientEventsTotal={ clientEventsTotal } 
            />
          </div>
          <ClientEventsLog
            client={ client }
            clientEventsLog={clientEventsLog} 
            setClientEventsLog={ setClientEventsLog }
            calcClientEventsTotal={ calcClientEventsTotal }        
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
    </>
  )
}

export default ClientPage