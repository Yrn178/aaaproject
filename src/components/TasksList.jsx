import { useState } from "react";
export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const addTask = (e) => {
        e.preventDefault();
        if (taskInput == "") return;
        setTasks([...tasks, taskInput]);
        setTaskInput("");
    };
    const deleteTask = (e) => {
        setTasks([...tasks].slice(0, -1));
    }
    return (
        <>
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    value={taskInput} 
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button type="submit">add</button>
                <button onClick={deleteTask}>delete</button>
            </form>
            <ul>
                {tasks.map((task, i)=> (
                    <li key={i}>{task}</li>
                    ))}
            </ul>
        </>
    );
}
