import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import productReducer from '../features/products/productsSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    product: productReducer
  }
})