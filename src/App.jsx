import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Mycompanent from './components/Mycompanent.jsx'
import Counter from './components/counter.jsx'

function App({name, age}) {
  const [count, setCount] = useState(0)
  return (
    <>
      <Mycompanent name={'Guard'} age={15}></Mycompanent>
      <Counter></Counter>
    </>
  )
}

export default App
