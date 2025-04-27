'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { clientOneEventLog } from '@/mocked-data/client-data'
import jsPDF from 'jspdf'
import { ArrowDownToLine, Share2, X } from 'lucide-react'
import React from 'react'

const formatFirestoreTimestamp = (timestamp: { seconds: number, nanoseconds: number } ) => {
  const date = new Date(timestamp.seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
  return date.toLocaleDateString('pt-BR');  // Format the date in Brazilian locale
}

const ClientPage = () => {
  const handleDownloadButtonClick = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    let line = 0;

    line += 10;
    doc.text("Cliente - Alice Johnson", 10, line);

    line += 7;
    doc.text("Total a pagar - R$200,00", 10, line);
    
    line += 7;
    doc.text("", 10, line);
    
    clientOneEventLog.forEach(clientEvent => {
      line = line + 5;
      doc.text(clientEvent.type === "purchase" ? "Compra" : "Pagamento", 10, line);
      doc.text(formatFirestoreTimestamp(clientEvent.createdAt), 35, line);
      
      line = line + 7;
      const text = `${clientEvent.type === "purchase" ? "+" : "-"} ${ clientEvent.value.toLocaleString("pt-br", {style: "currency",currency: "BRL"}) } ${ clientEvent.description }`
      doc.text(text, 10, line);

      line += 5;
      doc.text("", 10, line);
    })

    doc.save("example.pdf");
  };

  const handleShareButtonClick = async () => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    let line = 0;

    line += 10;
    doc.text("Cliente - Alice Johnson", 10, line);

    line += 7;
    doc.text("Total a pagar - R$200,00", 10, line);
    
    line += 7;
    doc.text("", 10, line);
    
    clientOneEventLog.forEach(clientEvent => {
      line = line + 5;
      doc.text(clientEvent.type === "purchase" ? "Compra" : "Pagamento", 10, line);
      doc.text(formatFirestoreTimestamp(clientEvent.createdAt), 35, line);
      
      line = line + 7;
      const text = `${clientEvent.type === "purchase" ? "+" : "-"} ${ clientEvent.value.toLocaleString("pt-br", {style: "currency",currency: "BRL"}) } ${ clientEvent.description }`
      doc.text(text, 10, line);

      line += 5;
      doc.text("", 10, line);
    })

    // Create the PDF as a Blob
    const pdfBlob = doc.output("blob");

    console.log(navigator);

    // Check if Web Share API is supported
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      const file = new File([pdfBlob], "shared-file.pdf", { type: "application/pdf" });

      try {
        await navigator.share({
          files: [file],
          title: "Check out this PDF!",
          text: "Here’s a PDF I created!",
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-var(--header-height)-var(--spacing)*8)]">
      <div>
        <div className="flex justify-end">
          <X/>
        </div>
        <h2 className="font-medium text-sm">Cliente</h2>
        <p>Alice Johnson</p>
      </div>

      <div className="bg-card text-card-foreground flex flex-col gap-2 rounded-md border p-4">
        <h2 className="font-medium text-sm">Total a pagar</h2>
        <p className="text-lg">R$200,00</p>
      </div>

      <div className="rounded-md border p-4 h-[calc(100%-194px-var(--spacing)*16)]">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium text-sm">Histórico</h2>
          <div className="flex gap-6">
            <ArrowDownToLine onClick={ handleDownloadButtonClick } />
            <Share2 onClick={ handleShareButtonClick } />
          </div>
        </div>
        <ScrollArea className="w-full h-[calc(100%-24px)]">
          <Table>
            <TableBody>
              {
                clientOneEventLog.map((clientEvent, i )=> {
                  return (
                    <TableRow key={ i }>
                      <TableCell>
                        <div className="py-1">
                          <div className="flex justify-between mb-2">
                            <p>{ clientEvent.type === "purchase" ? "Compra" : "Pagamento" }</p>
                            <h3>{ formatFirestoreTimestamp(clientEvent.createdAt) }</h3>
                          </div>
                          <p>{ `${clientEvent.type === "purchase" ? "+" : "-"} ${ clientEvent.value.toLocaleString("pt-br", {style: "currency",currency: "BRL"}) } ${ clientEvent.description }` }</p>
                        </div>
                      </TableCell>
                    </TableRow> 
                  )
                })
              }
            </TableBody>
          </Table>
        </ScrollArea>
      </div>  

      <div className="flex justify-between">
        <Button className="w-[65%]">Adicionar Compra</Button>
        <Button className="w-[30%]">Abater</Button>
      </div>
    </div>
  )
}

export default ClientPage