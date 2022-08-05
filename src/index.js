import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import Container from './layouts/Container'

const root = createRoot(document.getElementById('root'))
root.render(
  <Container>
    <App />
  </Container>
)
