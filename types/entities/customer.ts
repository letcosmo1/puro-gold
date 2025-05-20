export type Customer = {
  id: number,
  name: string
}

export type CustomerEvent = {
  id: number,
  customerId: number,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number
  createdAt: Date
}