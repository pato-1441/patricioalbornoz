import { createRoot } from 'react-dom/client'
import { StylePreview } from './style-preview'
import './styles.css'

createRoot(document.getElementById('app')!).render(<StylePreview />)
