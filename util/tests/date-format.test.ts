import { formatDate, formatStringToDate, getCurrentDate, getCurrentDateTime } from "../date-format";

describe("Test date-format.ts functions", () => {
  const fixedDate = new Date("2023-12-25T12:30:05");

  beforeAll(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  })

  afterAll(() => {
    vi.useRealTimers();
  })

  describe("Test getCurrentDate function", () => {
    it("Should get the date in the correct format", ()=>{
      expect(getCurrentDate()).toBe("25/12/2023"); 
    })
  })

  describe("Test getCurrentDateTime function", () => {
    it("Should get the date in the correct format", ()=>{
      expect(getCurrentDateTime()).toBe("251223123005"); 
    })
  })

  describe("Test formatDate function", () => {
    it("Should get the date in the correct format", ()=>{
      expect(formatDate(fixedDate)).toBe("25/12/2023"); 
    })
  })

  describe("Test formatStringToDate function", () => {
    it("Should get the date in the correct format", ()=>{
      expect(formatStringToDate(fixedDate.toString())).toBe("25/12/2023"); 
    })
  })
})