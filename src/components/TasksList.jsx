import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { themes, applyTheme } from '../styles/themes';
import { createNewTask, createNewTag, filterTasks, getTaskStats } from '../utils/taskUtils';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { TagManager } from './TagManager';
import { TaskStats } from './TaskStats';

export default function TaskList() {
    const [tasks, setTasks] = useLocalStorage('tasks', []);
    const [tags, setTags] = useLocalStorage('tags', []);
    const [theme, setTheme] = useLocalStorage('theme', 'dark');
    const [selectedTag, setSelectedTag] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const themeStyles = themes[theme];

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const handleAddTask = (text, deadline, tag) => {
        const newTask = createNewTask(text, deadline, tag);
        setTasks([...tasks, newTask]);
    };

    const handleToggleTask = (id) => {
        setTasks(tasks.map(item => 
            item.id === id ? {...item, status: !item.status} : item
        ));
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(item => item.id !== id));
    };

    const handleEditTask = (id, newText, newDeadline, newTag) => {
        setTasks(tasks.map(task => 
            task.id === id ? {
                ...task,
                task: newText,
                deadline: newDeadline || null,
                tags: newTag ? [newTag] : []
            } : task
        ));
    };

    const handleAddTag = (name) => {
        const newTag = createNewTag(name);
        setTags([...tags, newTag]);
    };

    const handleDeleteTag = (tagId) => {
        setTags(tags.filter(t => t.id !== tagId));
        setTasks(tasks.map(task => ({ 
            ...task, 
            tags: task.tags?.filter(tg => tg.id !== tagId) || [] 
        })));
        if (selectedTag?.id === tagId) {
            setSelectedTag(null);
        }
    };

    const filteredTasks = filterTasks(tasks, searchQuery, selectedTag);
    const stats = getTaskStats(tasks);

    return (
        <div style={{ 
            maxWidth: '900px', 
            width: '100%', 
            margin: '20px', 
            padding: '20px', 
            background: themeStyles.cardBg, 
            borderRadius: '8px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h1 style={{ margin: 0, color: themeStyles.text }}>Список задач</h1>
                <button 
                    onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} 
                    style={{ 
                        padding: '8px 16px', 
                        background: themeStyles.btn, 
                        border: `1px solid ${themeStyles.border}`,
                        color: themeStyles.text,
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
                </button>
            </div>

            <input 
                placeholder="Поиск задач..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)}
                style={{ 
                    width: '100%', 
                    padding: '10px', 
                    marginBottom: '20px', 
                    background: themeStyles.bg, 
                    border: `1px solid ${themeStyles.border}`,
                    color: themeStyles.text,
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                }} 
            />

            <TaskForm 
                onAddTask={handleAddTask}
                tags={tags}
                themeStyles={themeStyles}
            />

            <TagManager 
                tags={tags}
                selectedTag={selectedTag}
                onSelectTag={setSelectedTag}
                onAddTag={handleAddTag}
                onDeleteTag={handleDeleteTag}
                themeStyles={themeStyles}
            />

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {filteredTasks.length === 0 ? (
                    <p style={{ 
                        textAlign: 'center', 
                        padding: '40px', 
                        background: themeStyles.bg,
                        color: themeStyles.text,
                        borderRadius: '4px'
                    }}>
                        Задачи не найдены
                    </p>
                ) : (
                    filteredTasks.map(task => (
                        <TaskItem 
                            key={task.id}
                            task={task}
                            tags={tags}
                            themeStyles={themeStyles}
                            onToggle={handleToggleTask}
                            onDelete={handleDeleteTask}
                            onEdit={handleEditTask}
                        />
                    ))
                )}
            </ul>

            <TaskStats stats={stats} themeStyles={themeStyles} />
        </div>
    );
}