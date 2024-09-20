export function calculateProfit(
  code: string,
  price: string,
  quantity: string
): string {
  const codeToDigit: { [key: string]: number } = {
    B: 0,
    L: 9,
    A: 8,
    C: 7,
    K: 6,
    S: 5,
    T: 4,
    O: 3,
    N: 2,
    E: 1,
  }

  const characters: string[] = code.toUpperCase().split("")
  const digits: number[] = characters.map((character) => codeToDigit[character])
  const correspondingNumber: string = digits.join("")
  const profit: number =
    Number(price) * Number(quantity) -
    parseInt(correspondingNumber, 10) * Number(quantity)

  console.log(profit)
  return profit.toString()
}
