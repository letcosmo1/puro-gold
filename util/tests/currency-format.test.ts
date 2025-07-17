import { toBrazilianCurrency } from "../currency-format";

describe("Test toBrazilianCurrency function", () => {
  it("Should get the number in the correct format", () => {
    expect(toBrazilianCurrency(1)).toBe("R$\u00A01,00"); 
  })
})