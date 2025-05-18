import { CustomerEvent, Customer } from '@/types/customer';
import { toBrazilianCurrency } from '@/util/currency-format';
import { formatDate, getCurrentDateTime } from '@/util/date-format';
import { toPositive } from '@/util/math';
import jsPDF from 'jspdf';
import { ArrowDownToLine, Share2 } from 'lucide-react';
import React from 'react'

const getEventDescription = (customerEvent: CustomerEvent) => {
  const signal: string = customerEvent.type === "purchase" ? "+" : "-";
  const value: string = toBrazilianCurrency(toPositive(customerEvent.value));
  const description: string = customerEvent.description;

  const eventDescription: string = `${ signal } ${ value } ${ description }`;

  return eventDescription;
}

const customerEventsPdfLayout = (customer: Customer, customerEventsHistory: CustomerEvent[], customerEventsTotal: number | null) => {
  const total: number = customerEventsTotal ? customerEventsTotal : 0;

  const doc = new jsPDF();
  doc.setFontSize(12);

  let line = 0;

  line += 10;
  doc.text(`Cliente - ${ customer.name }`, 10, line);

  line += 7;
  doc.text(`Total a pagar - ${ toBrazilianCurrency(total) }`, 10, line);
  
  line += 7;
  doc.text("", 10, line);
  
  customerEventsHistory.forEach(customerEvent => {
    line = line + 5;
    doc.text(customerEvent.type === "purchase" ? "Compra" : "Pagamento", 10, line);
    doc.text(formatDate(customerEvent.createdAt), 35, line);
    
    line = line + 7;
    doc.text(getEventDescription(customerEvent), 10, line);

    line += 5;
    doc.text("", 10, line);
  })

  return doc;
}

type PropTypes = {
  customer: Customer,
  customerEventsHistory: CustomerEvent[]
  customerEventsTotal: number | null
}

const PdfButtons = ({ customer, customerEventsHistory, customerEventsTotal }: PropTypes) => {

  const handleDownloadButtonClick = () => {
    const doc = customerEventsPdfLayout(customer, customerEventsHistory, customerEventsTotal);
    doc.save(`${ customer.name }${ getCurrentDateTime() }.pdf`);
  };

  const handleShareButtonClick = async () => {
    const doc = customerEventsPdfLayout(customer, customerEventsHistory, customerEventsTotal);

    // Create the PDF as a Blob
    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], `${ customer.name }${ getCurrentDateTime() }.pdf`, { type: "application/pdf" });

    // Check if Web Share API is supported
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "PDF do Cliente Puro Gold",
          text: "PDF de Histórico de Compras do Cliente",
        });
        //TODO: add toast
        console.log("Shared successfully!");
      } catch (error) {
        //TODO: add toast
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="flex gap-6">
      <ArrowDownToLine onClick={ handleDownloadButtonClick } />
      <Share2 onClick={ handleShareButtonClick } />
    </div>
  )
}

export default PdfButtons