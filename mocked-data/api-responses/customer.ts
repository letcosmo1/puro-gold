export const customersList = [
  { id: "1", name: "Alice Johnson" },
  { id: "2", name: "Brian Smith" },
  { id: "3", name: "Carla Martinez" },
]
export const successListCustomersApiResponse = {
  ok: true,
  status: 200,
  data: {
    success: true,
    customers: customersList
  }
}

export const createdCustomer = { id: "4", name: "New client" }
export const successCreateCustomerApiResponse = {
  ok: true,
  status: 200,
  data: {
    success: true,
    customer: createdCustomer
  }
}

export const updatedCustomer = { id: "1", name: "Edited client" } 
export const successUpdateCustomerApiResponse = {
  ok: true,
  status: 200,
  data: {
    success: true,
    customer: updatedCustomer
  }
}