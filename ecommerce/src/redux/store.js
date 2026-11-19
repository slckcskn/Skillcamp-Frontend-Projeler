import { configureStore } from '@reduxjs/toolkit'
import productsSlice from '../features/products'
import cartSlice from '../features/cart/cartSlice'
import favoritesSlice from '../features/favorites/favoritesSlice'

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        favorites: favoritesSlice
    }
})