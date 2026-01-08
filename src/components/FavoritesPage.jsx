import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { useFavorites } from '../context/FavoritesContext'
import RecipeCard from './RecipeCard'

export default function FavoritesPage() {
    const { favorites } = useFavorites()

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Favorites
                </Typography>
            </Paper>

            {favorites.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography>No favorites yet. Save recipes from a recipe's page.</Typography>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {favorites.map((r) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={r.idMeal}>
                            <RecipeCard recipe={r} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}
