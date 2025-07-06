export type Customer = {
  id: string,
  name: string
}

export type NewCustomerData = {
  name: string
}

export type UpdateCustomerData = {
  name: string
}

export type CustomerResponse = {
  success: true,
  customer: Customer
}

export type CustomerCreateResponse = {
  success: true,
  customer: Customer
}

export type CustomerUpdateResponse = {
  success: true,
  customer: Customer
}

export type CustomerListResponse = {
  success: true,
  customers: Customer[]
}

export type CustomerEvent = {
  id: string,
  customerId: string,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number
  createdAt: string
}

export type NewCustomerEventData = {
  customerId: string,
  type: "purchase" | "payment",
  date: string,
  description: string,
  value: number
  createdAt: Date
}

export type UpdateCustomerEventData = {
  description: string,
  value: number
}

export type CustomerEventCreateResponse = {
  success: true,
  customerEvent: CustomerEvent
}

export type CustomerEventUpdateResponse = {
  success: true,
  customerEvent: CustomerEvent
}

export type CustomerEventListResponse = {
  success: true,
  customerEvents: CustomerEvent[]
}

