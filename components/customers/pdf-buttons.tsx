import { CustomerEvent, Customer } from '@/types/entities/customer';
import { customerEventsPdfLayout } from '@/util/customer-history-pdf';
import { getCurrentDateTime } from '@/util/date-format';
import { ArrowDownToLine, Share2 } from 'lucide-react';
import React from 'react'
import { toast } from 'react-toastify';

type PropTypes = {
  customer: Customer,
  customerEventsHistory: CustomerEvent[]
  customerEventsTotal: number | null
}

const PdfButtons = ({ customer, customerEventsHistory, customerEventsTotal }: PropTypes) => {

  const handleDownloadButtonClick = async () => {
    const doc = await customerEventsPdfLayout(customer, customerEventsHistory, customerEventsTotal);
    doc.save(`${ customer.name }${ getCurrentDateTime() }.pdf`);
    toast.success("Arquivo salvo com sucesso!");
  };

  const handleShareButtonClick = async () => {
    const doc = await customerEventsPdfLayout(customer, customerEventsHistory, customerEventsTotal);

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
      } catch (error) {
        toast.error(`Erro ao compartilhar - ${ error }.`);
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