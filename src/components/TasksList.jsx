import { useState } from "react";
export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState({});
    const [taskInput, setTaskInput] = useState("");
    const addTask = (e) => {
        e.preventDefault();
        if (taskInput == "") return;
        setTasks([...tasks, taskInput]);
        setCheckedTasks({...checkedTasks, [tasks.length]: false});
        setTaskInput("");
    };
    const deleteTask = (e) => {
        setTasks([...tasks].slice(0, -1));
    }
    const toggleCheck = (index) => {
        setCheckedTasks({
            ...checkedTasks,
            [index]: !checkedTasks[index]
        });
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
                    <li key={i}>
                        <input 
                            type="checkbox"
                            checked={checkedTasks[i] || false}
                            onChange={() => toggleCheck(i)}
                        />
                        <span style={{textDecoration: checkedTasks[i] ? "line-through" : "none"}}>
                            {task}
                        </span>
                    </li>
                ))}
            </ul>
        </>
    );
}

