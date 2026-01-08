import React, { createContext, useContext } from 'react'
import useLocalStorage from '../customHooks/useLocalStorage'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useLocalStorage('favorites', [])

    const addFavorite = (recipe) => {
        setFavorites((prev) => {
            if (prev.some((r) => r.idMeal === recipe.idMeal)) return prev
            return [...prev, recipe]
        })
    }

    const removeFavorite = (idMeal) => {
        setFavorites((prev) => prev.filter((r) => r.idMeal !== idMeal))
    }

    const isFavorite = (idMeal) => favorites.some((r) => r.idMeal === idMeal)

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
    return ctx
}

export default FavoritesContext
