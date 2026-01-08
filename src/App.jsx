import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useMemo, useState } from 'react'
import useLocalStorage from './customHooks/useLocalStorage'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import RecipePage from './components/RecipePage'
import FavoritesPage from './components/FavoritesPage'
import SearchResultsPage from './components/SearchResultsPage'
import { FavoritesProvider } from './context/FavoritesContext'

function AppContent({ mode, setMode }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const value = search.trim()
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`)
      setSearch('')
    }
  }

  return (
    <>
      <CssBaseline />

      <AppBar position="static" color="primary">
        <Toolbar>
          <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
            <IconButton
              color="inherit"
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              aria-label="theme toggle"
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>

          <Button component={Link} to="/" color="inherit">Home</Button>

          <Box component="form" onSubmit={handleSearch} sx={{ ml: 2, mr: 2, display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              placeholder="Search by recipe name"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
            />
            <IconButton type="submit" color="inherit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button component={Link} to="/favorites" color="inherit">Favorites</Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/sba-10/" element={<HomePage />} />
        <Route path="/sba-10/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/sba-10/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/recipe/:recipeId" element={<RecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  )
}

function App() {
  const [mode, setMode] = useLocalStorage('themeMode', 'light')
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <FavoritesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContent mode={mode} setMode={setMode} />
        </BrowserRouter>
      </ThemeProvider>
    </FavoritesProvider>
  )
}

export default App
