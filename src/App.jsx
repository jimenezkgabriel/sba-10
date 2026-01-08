import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useMemo } from 'react'
import useLocalStorage from './customHooks/useLocalStorage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
import CategoryPage from './components/CategoryPage'
import RecipePage from './components/RecipePage'
import FavoritesPage from './components/FavoritesPage'
import { FavoritesProvider } from './context/FavoritesContext'

function App() {
  const [mode, setMode] = useLocalStorage('themeMode', 'light')
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

  return (
    <FavoritesProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
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
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </FavoritesProvider>
  )
}

export default App
