import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import { CF_API_URL } from '../../app/lib/constants'
import Popup from '../../app/components/Popup'

// Configure Apollo client
const client = new ApolloClient({ uri: CF_API_URL, cache: new InMemoryCache() })

// Connect popup with apollo
const App = () => (
  <ApolloProvider client={client}>
    <Popup />
  </ApolloProvider>
)

// Render popup
ReactDOM.render(<App />, document.querySelector('#root'))
