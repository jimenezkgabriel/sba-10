import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'

import useFetch from '../customHooks/useFetch'
import { useFavorites } from '../context/FavoritesContext'

function IngredientsList({ recipe }) {
    const rows = []
    for (let i = 1; i <= 20; i++) {
        const ing = recipe[`strIngredient${i}`]
        const measure = recipe[`strMeasure${i}`]
        if (ing && ing.trim()) {
            rows.push({ ing: ing.trim(), measure: measure ? measure.trim() : '' })
        }
    }

    if (rows.length === 0) return null

    return (
        <Box>
            <Typography variant="h6" gutterBottom>Ingredients</Typography>
            <List>
                {rows.map((r, idx) => (
                    <ListItem key={idx} sx={{ pl: 0 }}>
                        <ListItemText primary={`${r.measure} ${r.ing}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default function RecipePage() {
    const { recipeId } = useParams()
    const { data, loading, error } = useFetch(`lookup.php?i=${recipeId}`)
    const recipe = data?.meals?.[0] ?? null

    const { addFavorite, removeFavorite, isFavorite } = useFavorites()
    const isFav = recipe ? isFavorite(recipe.idMeal) : false

    return (
        <Container sx={{ py: 4 }}>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && (
                <Typography color="error">Error: {error.message}</Typography>
            )}

            {!loading && !error && !recipe && (
                <Typography>No recipe found.</Typography>
            )}

            {!loading && !error && recipe && (
                <Paper elevation={2} sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CardMedia component="img" image={recipe.strMealThumb} alt={recipe.strMeal} sx={{ borderRadius: 1 }} />
                            <Box sx={{ mt: 2 }}>
                                <Stack direction="row" spacing={1}>
                                    <Chip label={recipe.strCategory} />
                                    {recipe.strArea && <Chip label={recipe.strArea} />}
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h4" component="h1" gutterBottom>{recipe.strMeal}</Typography>

                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                {recipe.strTags ? recipe.strTags.split(',').join(', ') : ''}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        if (isFav) removeFavorite(recipe.idMeal)
                                        else addFavorite(recipe)
                                    }}
                                >
                                    {isFav ? 'Remove from Favorites' : 'Add to Favorites'}
                                </Button>
                            </Box>
                            <IngredientsList recipe={recipe} />

                            <Typography variant="body1" component={"p"} sx={{ whiteSpace: 'pre-line' }}>
                                {recipe.strInstructions}
                            </Typography>

                            {recipe.strSource && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">Source: <a href={recipe.strSource} target="_blank" rel="noreferrer">{recipe.strSource}</a></Typography>
                                </Box>
                            )}

                            {recipe.strYoutube && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2">YouTube: <a href={recipe.strYoutube} target="_blank" rel="noreferrer">Watch</a></Typography>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </Container>
    )
}
