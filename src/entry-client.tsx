import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import reportWebVitals from './reportWebVitals'
import { createAppRouter } from './router'
import './styles.css'

const router = createAppRouter({
  documentAssets: {
    scripts: [],
    styles: [],
  },
})

const appElement = document.getElementById('app')

if (!appElement) {
  throw new Error('Missing #app root element')
}

createRoot(appElement).render(<RouterProvider router={router} />)

reportWebVitals()
