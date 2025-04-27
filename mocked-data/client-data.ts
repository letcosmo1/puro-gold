import { ClientEventLogType, ClientType } from "@/types/client-type";

export const mockedClients: ClientType[] = [
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

export const clientOneEventLog: ClientEventLogType[] = [
  {
    clientId: 1,
    type: "payment",
    date: "07/09/2024",
    description: "Event description 1",
    createdAt: { seconds: 1745722041, nanoseconds: 221560001 },
    value: 20
  },
  {
    clientId: 1,
    type: "purchase",
    date: "04/07/2024",
    description: "Event description 2",
    createdAt: { seconds: 1745722041, nanoseconds: 221575021 },
    value: 100
  },
  {
    clientId: 1,
    type: "payment",
    date: "25/08/2024",
    description: "Event description 3",
    createdAt: { seconds: 1745722041, nanoseconds: 221585988 },
    value: 205
  },
  {
    clientId: 1,
    type: "payment",
    date: "07/11/2024",
    description: "Event description 4",
    createdAt: { seconds: 1745722041, nanoseconds: 221596956 },
    value: 10.5
  },
  {
    clientId: 1,
    type: "purchase",
    date: "14/04/2025",
    description: "Event description 5",
    createdAt: { seconds: 1745722041, nanoseconds: 221606016 },
    value: 20.8
  },
  {
    clientId: 1,
    type: "purchase",
    date: "05/11/2024",
    description: "Event description 6",
    createdAt: { seconds: 1745722041, nanoseconds: 221615076 },
    value: 99.9
  },
]
