import { CustomerEvent, Customer } from "@/types/entities/customer";

export const mockedCustomers: Customer[] = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Brian Smith' },
  { id: 3, name: 'Carla Martinez' },
  { id: 4, name: 'David Kim' },
  { id: 5, name: 'Emily Chen' },
  { id: 6, name: 'Franklin Moore' },
  { id: 7, name: 'Grace Thompson' },
  { id: 8, name: 'Henry Clark' },
  { id: 9, name: 'Isabella Lopez' },
  { id: 10, name: 'Jack Wilson' },
  { id: 11, name: 'Karen Patel' },
  { id: 12, name: 'Liam Nguyen' },
  { id: 13, name: 'Maya Gonzalez' },
  { id: 14, name: 'Noah Anderson' },
  { id: 15, name: 'Olivia Brown' },
  { id: 16, name: 'Paul Rivera' },
  { id: 17, name: 'Quinn Davis' },
  { id: 18, name: 'Ruby Evans'},
  { id: 19, name: 'Samuel Lee' },
  { id: 20, name: 'Tina Walker' }
];

export const mockedCustomerEventHistory: CustomerEvent[] = [
  {
    id: 1,
    customerId: 1,
    type: "payment",
    date: "07/09/2024",
    description: "Event description 1",
    createdAt: new Date('2025-01-01T10:00:00Z') ,
    value: -20
  },
  {
    id: 2,
    customerId: 1,
    type: "purchase",
    date: "04/07/2024",
    description: "Event description 2",
    createdAt: new Date('2025-02-01T12:30:00Z'),
    value: 100
  },
  {
    id: 3,
    customerId: 1,
    type: "payment",
    date: "25/08/2024",
    description: "Event description 3",
    createdAt: new Date('2025-03-01T09:15:00Z'),
    value: -25
  },
  {
    id: 1,
    customerId: 1,
    type: "payment",
    date: "07/11/2024",
    description: "Event description 4",
    createdAt: new Date('2025-04-01T14:45:00Z'),
    value: -10.5
  },
  {
    id: 4,
    customerId: 1,
    type: "purchase",
    date: "14/04/2025",
    description: "Event description 5",
    createdAt: new Date('2025-05-01T16:00:00Z'),
    value: 20.8
  },
  {
    id: 5,
    customerId: 1,
    type: "purchase",
    date: "05/11/2024",
    description: "Event description 6",
    createdAt: new Date('2025-06-01T08:20:00Z'),
    value: 99.9
  },
]
