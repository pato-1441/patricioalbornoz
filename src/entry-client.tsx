import { hydrateRoot } from 'react-dom/client'
import { RouterClient } from '@tanstack/react-router/ssr/client'
import reportWebVitals from './reportWebVitals'
import { createAppRouter } from './router'
import './styles.css'

const router = createAppRouter({
  documentAssets: {
    scripts: [],
    styles: [],
  },
})

hydrateRoot(document, <RouterClient router={router} />)

reportWebVitals()
