import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload
      const found = state.items.find(item => item.id === product.id)
      if (found) found.quantity += 1
      else state.items.push({ ...product, quantity: 1 })
    },
    removeFromCart(state, action) { state.items = state.items.filter(item => item.id !== action.payload) },
    changeQuantity(state, action) {
      const item = state.items.find(item => item.id === action.payload.id)
      if (item) item.quantity = Math.max(1, item.quantity + action.payload.delta)
    },
    clearCart(state) { state.items = [] }
  }
})
export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer