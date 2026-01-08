import React from 'react'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActionArea from '@mui/material/CardActionArea'
import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
    const { strCategory: title, strCategoryThumb: img, strCategoryDescription: desc } = category

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea component={Link} to={`category/${encodeURIComponent(title)}`} sx={{ display: 'block', textAlign: 'left' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt={title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
