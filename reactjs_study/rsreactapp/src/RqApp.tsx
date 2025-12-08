import { useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Repositories from './Repositories'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

const queryClient = new QueryClient();

function RqApp() {


  return (
      <>
          <QueryClientProvider client={queryClient}>
              <Repositories />
          </QueryClientProvider>

    </>
  )
}

export default RqApp
