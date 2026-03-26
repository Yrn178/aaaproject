import { useState } from "react";
export default function inputer() {
      const [text, setText] = useState('')
        const clear = () => {
            setText('')
        }
      return(
        <>
        <div>
              <input onChange={(e)=>{
                  setText(e.target.value)
                }}type="text" value={text}/>
                <button onClick={clear}>Очистить</button>
              <h1>{text}</h1>
        </div>
        </>
      )
}