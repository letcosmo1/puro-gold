export const formatDate = (date: Date ) => {
  //FORMAT: dd/mm/yyyy
  
  return date.toLocaleDateString('pt-BR');
}

export const formatStringToDate = (date: string ) => {
  //FORMAT: dd/mm/yyyy

  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('pt-BR');
}

export const getCurrentDate = () => {
  //FORMAT: dd/mm/yyyy

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getCurrentDateTime =() => {
  //FORMAT: ddmmyyhhmmss

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear().toString().slice(-2); // Get last two digits

  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${day}${month}${year}${hours}${minutes}${seconds}`;
}