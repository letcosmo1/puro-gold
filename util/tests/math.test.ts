import { toNegative, toPositive } from "../math"

describe("Test toPositive function", () => {
  it("When given a negative number then return it's absolute value", ()=>{
    expect(toPositive(-1)).toBe(1); 
  })

  it("When given a positive number then return it's absolute value", ()=>{
    expect(toPositive(1)).toBe(1); 
  })
})

describe("Test toNegative function", ( )=> {
  it("When given a positive number then return it's absolute value", ()=>{
    expect(toNegative(1)).toBe(-1); 
  })

  it("When given a negative number then return the same value", ()=>{
    expect(toNegative(-1)).toBe(-1); 
  })
})