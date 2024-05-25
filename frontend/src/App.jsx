import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IntroductionPage from './pages/IntroductionPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <IntroductionPage/>
    </>
  )
}

export default App
