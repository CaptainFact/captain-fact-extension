import React from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { CF_API_URL } from '../lib/constants'
import Popup from '../components/Popup'

// Configure Apollo client
const client = new ApolloClient({ uri: CF_API_URL, cache: new InMemoryCache() })

// Connect popup with apollo
const App = () => (
  <ApolloProvider client={client}>
    <Popup />
  </ApolloProvider>
)

// Render popup
const root = createRoot(document.getElementById('root'))
root.render(<App />)
