'use client'

import ClientEventLogItem from '@/components/client/client-event-log-item'
import PdfButtons from '@/components/client/pdf-buttons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
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

  const calcClientEventsTotal = (clientEventLogParam: ClientEventLogType[]) => {
    if(clientEventLogParam.length === 0) return

    let total = 0;

    clientEventLogParam.forEach(clientEvent => {
      total += clientEvent.value;
    });

    setClientEventsTotal(total);
  }

  const handleAddPurchaseButtonClick = () => {
    setOpenAddPurchase(true);
  }

  const handleAddPaymentButtonClick = () => {
    setOpenAddPayment(true);
  }

  const handleAddPurchaseCancelButtonClick = () => {
    setAddPurchaseValueInput("");
    setAddPurchaseDescriptionInput("");
    setOpenAddPurchase(false);
  }

  const handleAddPaymentCancelButtonClick = () => {
    setAddPaymentValueInput("");
    setAddPaymentDescriptionInput("");
    setOpenAddPayment(false);
  }

  const handleAddPurchaseValueInputChange = (e: BaseSyntheticEvent) => {
    setAddPurchaseValueInput(e.target.value);
  }

  const handleAddPurchaseDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setAddPurchaseDescriptionInput(e.target.value);
  }

  const handleAddPaymentValueInputChange = (e: BaseSyntheticEvent) => {
    setAddPaymentValueInput(e.target.value);
  }

  const handleAddPaymentDescriptionInputChange = (e: BaseSyntheticEvent) => {
    setAddPaymentDescriptionInput(e.target.value);
  }

  const handleAddPurchaseConfirmButtonClick = () => {
    if(addPurchaseValueInput && addPurchaseDescriptionInput) {
      const currentDate: string = getCurrentDate();
      const purchaseValue: number = Number(addPurchaseValueInput);

      const clientEvent: ClientEventLogType = {
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
    setOpenAddPurchase(false);
  }

  const handleAddPaymentConfirmButtonClick = () => {
    if(addPaymentValueInput && addPaymentDescriptionInput) {
      const currentDate: string = getCurrentDate();
      const paymentValue: number = Number(addPaymentValueInput);

      const clientEvent: ClientEventLogType = {
        clientId: client.id,
        type: "payment",
        date: currentDate,
        description: addPaymentDescriptionInput,
        createdAt: mockFirestoreTimestamp(),
        value: toNegative(paymentValue)
      }

      console.log(clientEvent)

      const clientEventsLogCopy: ClientEventLogType[] = [clientEvent, ...clientEventsLog ];

      calcClientEventsTotal(clientEventsLogCopy);
      setClientEventsLog(clientEventsLogCopy);
    }
    //TODO: add error toast
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
          <ScrollArea className="w-full h-[calc(100%-24px)]">
            <Table>
              <TableBody>
                {
                  clientEventsLog.map((clientEvent, i )=> {
                    return (
                      <TableRow key={ i }>
                        <TableCell>
                          <ClientEventLogItem  clientEvent={ clientEvent } />
                        </TableCell>
                      </TableRow> 
                    )
                  })
                }
              </TableBody>
            </Table>
          </ScrollArea>
        </section>  

        <section className="flex justify-between">
          <Button className="w-[65%]" onClick={ handleAddPurchaseButtonClick } >Adicionar Compra</Button>
          <Button className="w-[30%]" onClick={ handleAddPaymentButtonClick }>Abater</Button>
        </section>
      </div>

      <Dialog open={ openAddPurchase } onOpenChange={ setOpenAddPurchase }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Adicionar Compra</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="purchase-value" className="mb-2">Valor da compra</Label>
            <Input
              type="number"
              id="purchase-value"
              onChange={ handleAddPurchaseValueInputChange }
              value={ addPurchaseValueInput }
            />
          </div>
          <div>
            <Label htmlFor="purchase-description" className="mb-2">Descrição da compra</Label>
            <Input
              id="purchase-description"
              onChange={ handleAddPurchaseDescriptionInputChange }
              value={ addPurchaseDescriptionInput }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleAddPurchaseCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleAddPurchaseConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={ openAddPayment } onOpenChange={ setOpenAddPayment }>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Adicionar Pagamento</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="payment-value" className="mb-2">Valor do pagamento</Label>
            <Input
              type="number"
              id="payment-value"
              onChange={ handleAddPaymentValueInputChange }
              value={ addPaymentValueInput }
            />
          </div>
          <div>
            <Label htmlFor="payment-description" className="mb-2">Descrição do pagamento</Label>
            <Input
              id="payment-description"
              onChange={ handleAddPaymentDescriptionInputChange }
              value={ addPaymentDescriptionInput }
            />
          </div>
          <DialogFooter className="flex-row">
            <Button variant="secondary" className="w-1/2" onClick={ handleAddPaymentCancelButtonClick }>Cancelar</Button>
            <Button className="w-1/2" onClick={ handleAddPaymentConfirmButtonClick }>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ClientPage