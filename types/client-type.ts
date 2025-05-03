export type ClientType = {
  id: number,
  name: string
}

export type ClientEventLogType = {
  id: number,
  clientId: number,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number
  createdAt: {
    seconds: number,
    nanoseconds: number
  }
}