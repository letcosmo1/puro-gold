import { CustomerEvent, Customer } from '@/types/entities/customer';
import { toBrazilianCurrency } from '@/util/currency-format';
import { formatStringToDate, getCurrentDate, getCurrentDateTime } from '@/util/date-format';
import { toPositive } from '@/util/math';
import jsPDF from 'jspdf';

const getEventDescription = (customerEvent: CustomerEvent) => {
  const signal: string = customerEvent.type === "purchase" ? "+" : "-";
  const value: string = toBrazilianCurrency(toPositive(customerEvent.value));
  const description: string = customerEvent.description;

  const eventDescription: string = `${ signal } ${ value } ${ description }`;

  return eventDescription;
}

export const customerEventsPdfLayout = async (customer: Customer, customerEventsHistory: CustomerEvent[], customerEventsTotal: number | null) => {
  const total = customerEventsTotal ? customerEventsTotal : 0;

  const SPACING = 7;
  const CUSTOMER_EVENTS_PER_PAGE = 10;
  const MARGIN_TOP = 7;
  const MARGIN_LEFT = 10;
  const CENTER_EVENTS = 35;

  let line = 0;

  const doc = new jsPDF();

  const response = await fetch("/images/logo-2-black-rounded-no-bg.png");
  const blob = await response.blob();
  const base64data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

  // HEADER
  doc.addImage(base64data, 'png', MARGIN_LEFT, MARGIN_TOP, 30, 27);

  line = SPACING * 3;
  doc.setFontSize(14);
  doc.text("HISTÓRICO DO CLIENTE", 142, line);

  line += SPACING * 3.5;
  doc.setFontSize(12);
  doc.text(`Cliente: ${ customer.name }`, MARGIN_LEFT, line);
  doc.text(`Data de emissão: ${ getCurrentDate() }`, 145, line);

  line += SPACING;
  doc.text(`Conta: ${ toBrazilianCurrency(total) }`, MARGIN_LEFT, line);
  
  line += SPACING * 2;

  // CUSTOMER EVENTS
  for (let i = 0; i < CUSTOMER_EVENTS_PER_PAGE; i++) {
    if(customerEventsHistory[i]) {
      doc.text(customerEventsHistory[i].date, CENTER_EVENTS, line);
      doc.text(
        customerEventsHistory[i].type === "purchase" ? "Compra" : "Pagamento", 
        customerEventsHistory[i].date ? (CENTER_EVENTS + 23) : CENTER_EVENTS, 
        line
      );
    }
    
    line += SPACING;

    if(customerEventsHistory[i])
      doc.text(getEventDescription(customerEventsHistory[i]), CENTER_EVENTS, line);
    
    if(i !== (CUSTOMER_EVENTS_PER_PAGE - 1)) 
      line += SPACING * 1.7;
  }

  // FOOTER
  line += SPACING;
  doc.setFontSize(10);
  doc.text("*Conta com apenas os 10 eventos mais recentes.", CENTER_EVENTS, line);

  line += SPACING * 5.5;
  doc.setFontSize(11);
  doc.text("Desenvolvido por VerseSync | @versesync_tech", 60, line);

  return doc;
}