import { useState } from "react";
export default function Counter() {
    const [x, setX] = useState(0);
    const increment = () => {
        setX(x + 1)
    }
    const subtraction = () => {
        setX(x - 1)
    }
    return (
        <>
        <h2>{x}</h2>
        <button onClick={increment}>+</button>
        <button onClick={subtraction}>-</button>
        </>
    )
}