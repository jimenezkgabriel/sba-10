import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'

import useFetch from '../customHooks/useFetch'
import RecipeCard from './RecipeCard'

export default function CategoryPage() {
    const { categoryName } = useParams()
    const decoded = decodeURIComponent(categoryName || '')
    const { data, loading, error } = useFetch(`filter.php?c=${encodeURIComponent(decoded)}`)

    const recipes = data?.meals ?? []

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {decoded} Recipes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Recipes for the <strong>{decoded}</strong> category.
                </Typography>
            </Paper>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error">Error: {error.message}</Typography>
            )}

            {!loading && !error && recipes.length === 0 && (
                <Typography>No recipes found for this category.</Typography>
            )}

            {!loading && !error && recipes.length > 0 && (
                <Grid container spacing={3}>
                    {recipes.map((r) => (
                        <Grid size={{ sm: 6, md: 4, lg: 3 }} key={r.idMeal}>
                            <RecipeCard recipe={r} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}
