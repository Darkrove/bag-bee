import { atom } from "jotai"

import { INVOICE_DATA, Invoice, Item } from "./item-data"

export const inputAtom = atom<string>("")

export const invoiceAtom = atom<Invoice>(INVOICE_DATA)

export const itemsAtom = atom<Item[]>([])

export const deleteItemAtom = atom(
  (get) => get(itemsAtom),
  (get, set, itemCodeToDelete) => {
    const items = get(itemsAtom)
    const updatedItems = items.filter((item) => item.code !== itemCodeToDelete)
    set(itemsAtom, updatedItems)
  }
)
