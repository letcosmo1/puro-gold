export type Client = {
  id: number,
  name: string
}

export type ClientEvent = {
  id: number,
  clientId: number,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number
  createdAt: Date
}