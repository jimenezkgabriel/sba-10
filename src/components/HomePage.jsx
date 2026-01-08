import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import useFetch from '../customHooks/useFetch'
import CategoryCard from './CategoryCard'

export default function HomePage() {
    const { data, loading, error } = useFetch('categories.php')
    const categories = data?.categories ?? []

    return (
        <Container sx={{ py: 4 }}>
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Categories
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

            {!loading && !error && (
                <Grid container spacing={3}>
                    {categories.map((cat) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={cat.idCategory}>
                            <CategoryCard category={cat} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    )
}
