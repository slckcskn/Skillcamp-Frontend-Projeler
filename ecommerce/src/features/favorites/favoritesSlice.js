import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite(state, action) {
      const product = action.payload
      const exists = state.items.some(item => item.id === product.id)
      state.items = exists ? state.items.filter(item => item.id !== product.id) : [...state.items, product]
    },
    removeFavorite(state, action) { state.items = state.items.filter(item => item.id !== action.payload) }
  }
})
export const { toggleFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer