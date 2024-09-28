import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { SnackbarContent, SnackbarProvider } from 'notistack'
import ChatProvider from './components/context/contextProvider.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <SnackbarProvider>
  <ChakraProvider>
  <ChatProvider>
    <App/>
  </ChatProvider>
  </ChakraProvider>
  </SnackbarProvider>
  </BrowserRouter>
  

)