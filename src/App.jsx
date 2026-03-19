import { useState } from 'react'
import './App.css'
import Mycompanent from './components/Mycompanent.jsx'
import Counter from './components/counter.jsx'
import Inputer from './components/Inputer.jsx'
import TaskList from './components/TasksList.jsx'
function App({name, age}) {
  name = "Guard";
  return (
    <>
      {/* <Mycompanent name={name} age={15}></Mycompanent> */}
      {/* <Counter></Counter> */}
      {/* <Inputer></Inputer> */}
      <TaskList></TaskList>
    </>
  )
}

export default App
