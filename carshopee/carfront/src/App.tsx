/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
*/
import { AppBar, Toolbar } from "@mui/material"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Carlist from './components/Carlist'

const queryClient = new QueryClient();

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Container maxWidth="x1">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Car Shop
            </Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}>
          <Carlist />
        </QueryClientProvider>
      </Container>
    </>
  )
}

export default App
