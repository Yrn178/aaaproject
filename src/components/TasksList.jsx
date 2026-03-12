import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [addDeadline, setAddDeadline] = useState(true)
    const addTask = (e) => {
        e.preventDefault();
        if (taskInput == "") return;
        setTasks([...tasks, {task: taskInput, id: uuidv4(), status: false, setDeadline: null}]);
        setTaskInput("");
    };
    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => item.id != id));
    }
    const toggleCheck = (id) => {
        setTasks(tasks.map((item) => item.id == id ? {...item, status: !item.status} : item))
    }
    const handleClick = (id) => {
        const newText = prompt("введите значение");
        if (newText !== null) {
            setTasks(tasks.map(task => 
            task.id === id ? {...task, task: newText} : task
        ));
        }
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
                <input type="date"/>

            </form>
            <ul>
                {tasks.map((task, i)=> (
                    <li key={i}>
                        <button onClick={() => deleteTask(task.id)}>delete</button>
                        <input 
                            type="checkbox"
                            checked={task.status}
                            onChange={() => toggleCheck(task.id)}
                        />
                        <span 
                            style={{textDecoration: task.status ? "line-through" : "none"}}
                            onClick={() => handleClick(i)}
                        >
                            {task.task}
                        </span>

                    </li>
                ))}
            </ul>
        </>
    );
}



// Полезное (то что может понадобится потом)


//  логика дедлайнов
    // const deadline = (id) => {
    //     setTasks(tasks.map((item) => item.id == id ? {...item, deadline: !item.deadline} : item))
    // } 


// дедлайны
{/* <input
type="checkbox"
checked={task.deadline}
onChange={() => deadline(task.id)}
/>
{task.deadline && (
<input
type="date"
/>
)} */}