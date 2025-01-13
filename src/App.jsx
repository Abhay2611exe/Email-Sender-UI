import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmailSender from './component/EmailSender'
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0)

  return (
     <div>
      <EmailSender/>
      <Toaster/>
     </div>
  )
}

export default App
