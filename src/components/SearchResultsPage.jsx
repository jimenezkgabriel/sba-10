import React from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'

import useFetch from '../customHooks/useFetch'
import RecipeCard from './RecipeCard'

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    const { data, loading, error } = useFetch(query ? `search.php?s=${encodeURIComponent(query)}` : '')
    const recipes = data?.meals ?? []

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {query ? `Showing results for "${query}"` : 'Enter a search term'}
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

            {!loading && !error && recipes.length === 0 && query && (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography>No results found for "{query}". Try another search term.</Typography>
                </Box>
            )}

            {!loading && !error && recipes.length > 0 && (
                <Grid container spacing={3}>
                    {recipes.map((r) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={r.idMeal}>
                            <RecipeCard recipe={r} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}
