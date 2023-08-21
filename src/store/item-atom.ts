import { atom } from "jotai"

import { ITEM_DATA, Item } from "./item-data"

export const inputAtom = atom<string>("")

export const moviesServerAtom = atom<Item[]>([])

export const itemsAtom = atom<Item[]>([])

export const deleteItemAtom = atom(
  (get) => get(itemsAtom),
  (get, set, itemCodeToDelete) => {
    const items = get(itemsAtom)
    const updatedItems = items.filter((item) => item.code !== itemCodeToDelete)
    set(itemsAtom, updatedItems)
  }
)
