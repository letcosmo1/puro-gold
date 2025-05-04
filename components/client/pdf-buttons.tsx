import { ClientEvent, Client } from '@/types/client-type';
import { toBrazilianCurrency } from '@/util/currency-format';
import { formatDate, getCurrentDateTime } from '@/util/date-format';
import { toPositive } from '@/util/math';
import jsPDF from 'jspdf';
import { ArrowDownToLine, Share2 } from 'lucide-react';
import React from 'react'

const getEventDescription = (clientEvent: ClientEvent) => {
  const signal: string = clientEvent.type === "purchase" ? "+" : "-";
  const value: string = toBrazilianCurrency(toPositive(clientEvent.value));
  const description: string = clientEvent.description;

  const eventDescription: string = `${ signal } ${ value } ${ description }`;

  return eventDescription;
}

const clientEventsPdfLayout = (client: Client, clientEventsLog: ClientEvent[], clientEventsTotal: number | null) => {
  const total: number = clientEventsTotal ? clientEventsTotal : 0;

  const doc = new jsPDF();
  doc.setFontSize(12);

  let line = 0;

  line += 10;
  doc.text(`Cliente - ${ client.name }`, 10, line);

  line += 7;
  doc.text(`Total a pagar - ${ toBrazilianCurrency(total) }`, 10, line);
  
  line += 7;
  doc.text("", 10, line);
  
  clientEventsLog.forEach(clientEvent => {
    line = line + 5;
    doc.text(clientEvent.type === "purchase" ? "Compra" : "Pagamento", 10, line);
    doc.text(formatDate(clientEvent.createdAt), 35, line);
    
    line = line + 7;
    doc.text(getEventDescription(clientEvent), 10, line);

    line += 5;
    doc.text("", 10, line);
  })

  return doc;
}

type PropTypes = {
  client: Client,
  clientEventsLog: ClientEvent[]
  clientEventsTotal: number | null
}

const PdfButtons = ({ client, clientEventsLog, clientEventsTotal }: PropTypes) => {

  const handleDownloadButtonClick = () => {
    const doc = clientEventsPdfLayout(client, clientEventsLog, clientEventsTotal);
    doc.save(`${ client.name }${ getCurrentDateTime() }.pdf`);
  };

  const handleShareButtonClick = async () => {
    const doc = clientEventsPdfLayout(client, clientEventsLog, clientEventsTotal);

    // Create the PDF as a Blob
    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], `${ client.name }${ getCurrentDateTime() }.pdf`, { type: "application/pdf" });

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