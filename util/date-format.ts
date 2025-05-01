export const formatFirestoreTimestamp = (timestamp: { seconds: number, nanoseconds: number } ) => {
  const date = new Date(timestamp.seconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
  return date.toLocaleDateString('pt-BR');
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

export const mockFirestoreTimestamp = () => {
  const date = new Date();

  const seconds = Math.floor(date.getTime() / 1000);
  const nanoseconds = (date.getTime() % 1000) * 1_000_000;

  return { seconds, nanoseconds };
}