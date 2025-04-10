import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store ={store}>
    <MantineProvider>
    <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
    </MantineProvider>
    </Provider>   
      </BrowserRouter>
  
  </StrictMode>,
)
