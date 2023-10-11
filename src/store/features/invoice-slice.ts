import { INVOICE_DATA, Invoice } from "@/store/item-data"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type InvoiceState = {
  value: Invoice
}

const initialState = {
  value: INVOICE_DATA,
} as InvoiceState

export const invoicer = createSlice({
  name: "invoicer",
  initialState,
  reducers: {
    reset: () => initialState,
    setValue: (state, action: PayloadAction<Invoice>) => {
      state.value = action.payload // Replace the entire value object
    },
  },
})

export const { reset, setValue } = invoicer.actions
export default invoicer.reducer
