import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [newTagInput, setNewTagInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [theme, setTheme] = useState('dark');
    const [showTagCreator, setShowTagCreator] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editInput, setEditInput] = useState("");
    const [editDeadline, setEditDeadline] = useState("");
    const [editTag, setEditTag] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('data') || '{}');
        setTasks(saved.tasks || []);
        setTags(saved.tags || []);
        if (saved.theme) setTheme(saved.theme);
    }, []);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify({ tasks, tags, theme }));
        document.body.style.cssText = theme === 'light' 
            ? 'background:#fff;color:#333;margin:0;min-height:100vh' 
            : 'background:#1a1a1a;color:#fff;margin:0;min-height:100vh';
    }, [tasks, tags, theme]);

    const addTask = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        setTasks([...tasks, {
            id: uuidv4(),
            task: taskInput,
            status: false,
            deadline: taskDeadline || null,
            tags: selectedTag ? [selectedTag] : []
        }]);
        setTaskInput("");
        setTaskDeadline("");
        setSelectedTag(null);
    };

    const toggleCheck = (id) => {
        setTasks(tasks.map(item => 
            item.id === id ? {...item, status: !item.status} : item
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(item => item.id !== id));
    };

    const startEdit = (task) => {
        setEditingTask(task.id);
        setEditInput(task.task);
        setEditDeadline(task.deadline || "");
        setEditTag(task.tags?.[0] || null);
    };

    const saveEdit = () => {
        if (!editInput.trim()) return;
        setTasks(tasks.map(task => 
            task.id === editingTask ? {
                ...task,
                task: editInput,
                deadline: editDeadline || null,
                tags: editTag ? [editTag] : []
            } : task
        ));
        setEditingTask(null);
        setEditInput("");
        setEditDeadline("");
        setEditTag(null);
    };

    const cancelEdit = () => {
        setEditingTask(null);
        setEditInput("");
        setEditDeadline("");
        setEditTag(null);
    };

    const isOverdue = (task) => {
        return task.deadline && !task.status && new Date(task.deadline) < new Date();
    };

    const formatDeadline = (deadline) => {
        if (!deadline) return "Без дедлайна";
        const date = new Date(deadline);
        return date.toLocaleDateString('ru-RU');
    };

    const formatTag = (task) => {
        if (!task.tags || task.tags.length === 0) return "Без тега";
        return task.tags[0].name;
    };

    const themeStyles = {
        light: { 
            bg: '#f8f9fa', 
            border: '#ddd', 
            btn: '#f0f0f0',
            tag: '#e0e0e0',
            text: '#333'
        },
        dark: { 
            bg: '#2d2d2d', 
            border: '#555', 
            btn: '#404040',
            tag: '#555',
            text: '#fff'
        }
    }[theme];

    const filteredTasks = tasks.filter(task => 
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) && 
        (!selectedTag || task.tags?.some(t => t.id === selectedTag.id))
    );

    return (
        <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
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
                    borderRadius: '4px'
                }} 
            />

            <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <input 
                    value={taskInput} 
                    onChange={e => setTaskInput(e.target.value)} 
                    placeholder="Введите задачу..."
                    style={{ 
                        flex: 2, 
                        padding: '10px', 
                        minWidth: '200px', 
                        background: themeStyles.bg, 
                        border: `1px solid ${themeStyles.border}`,
                        color: themeStyles.text,
                        borderRadius: '4px'
                    }} 
                />
                <input 
                    type="date"
                    value={taskDeadline} 
                    onChange={e => setTaskDeadline(e.target.value)} 
                    style={{ 
                        padding: '10px', 
                        background: themeStyles.bg, 
                        border: `1px solid ${themeStyles.border}`,
                        color: themeStyles.text,
                        borderRadius: '4px'
                    }} 
                />
                {tags.length > 0 && (
                    <select 
                        value={selectedTag?.id || ''} 
                        onChange={e => setSelectedTag(tags.find(t => t.id === e.target.value) || null)}
                        style={{ 
                            padding: '10px', 
                            background: themeStyles.bg, 
                            border: `1px solid ${themeStyles.border}`,
                            color: themeStyles.text,
                            borderRadius: '4px'
                        }}
                    >
                        <option value="">Без тега</option>
                        {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                    </select>
                )}
                <button type="submit" style={{ 
                    padding: '10px 20px', 
                    background: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Добавить
                </button>
            </form>

            <div style={{ marginBottom: '20px', padding: '15px', background: themeStyles.bg, borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h3 style={{ color: themeStyles.text, margin: 0 }}>Теги</h3>
                    <button 
                        onClick={() => setShowTagCreator(!showTagCreator)} 
                        style={{ 
                            padding: '5px 10px', 
                            background: themeStyles.btn, 
                            border: `1px solid ${themeStyles.border}`,
                            color: themeStyles.text,
                            cursor: 'pointer',
                            borderRadius: '4px'
                        }}
                    >
                        {showTagCreator ? 'Отмена' : 'Создать тег'}
                    </button>
                </div>
                
                {showTagCreator && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input 
                            value={newTagInput} 
                            onChange={e => setNewTagInput(e.target.value)} 
                            placeholder="Название тега"
                            style={{ 
                                flex: 1, 
                                padding: '8px', 
                                background: themeStyles.bg, 
                                border: `1px solid ${themeStyles.border}`,
                                color: themeStyles.text,
                                borderRadius: '4px'
                            }} 
                        />
                        <button onClick={() => {
                            if (!newTagInput.trim()) return;
                            setTags([...tags, { 
                                id: uuidv4(), 
                                name: newTagInput
                            }]);
                            setNewTagInput("");
                            setShowTagCreator(false);
                        }} style={{ 
                            padding: '8px 16px', 
                            background: '#2196F3', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Сохранить
                        </button>
                    </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setSelectedTag(null)} 
                        style={{
                            padding: '5px 12px', 
                            borderRadius: '4px', 
                            border: '1px solid',
                            background: !selectedTag ? '#4CAF50' : themeStyles.btn,
                            color: !selectedTag ? 'white' : themeStyles.text,
                            cursor: 'pointer'
                        }}
                    >
                        Все задачи
                    </button>
                    
                    {tags.map(tag => (
                        <div key={tag.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <button 
                                onClick={() => setSelectedTag(tag)} 
                                style={{
                                    padding: '5px 12px', 
                                    borderRadius: '4px', 
                                    border: '1px solid',
                                    background: themeStyles.tag,
                                    color: themeStyles.text,
                                    fontWeight: selectedTag?.id === tag.id ? 'bold' : 'normal',
                                    cursor: 'pointer',
                                    borderColor: selectedTag?.id === tag.id ? '#4CAF50' : themeStyles.border
                                }}
                            >
                                {tag.name}
                            </button>
                            <button 
                                onClick={() => {
                                    setTags(tags.filter(t => t.id !== tag.id));
                                    setTasks(tasks.map(t => ({ 
                                        ...t, 
                                        tags: t.tags?.filter(tg => tg.id !== tag.id) || [] 
                                    })));
                                }} 
                                style={{ 
                                    padding: '2px 5px', 
                                    background: 'none', 
                                    border: 'none', 
                                    cursor: 'pointer',
                                    color: themeStyles.text,
                                    marginLeft: '2px'
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0 }}>
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
                        <li key={task.id} style={{
                            padding: '15px', 
                            marginBottom: '10px', 
                            borderRadius: '4px',
                            background: themeStyles.bg, 
                            border: `1px solid ${themeStyles.border}`,
                            borderLeft: isOverdue(task) ? '4px solid #ff4444' : 'none',
                            opacity: task.status ? 0.7 : 1
                        }}>
                            {editingTask === task.id ? (
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    flexWrap: 'wrap'
                                }}>
                                    <input 
                                        type="checkbox" 
                                        checked={task.status} 
                                        onChange={() => toggleCheck(task.id)} 
                                    />
                                    <input 
                                        value={editInput} 
                                        onChange={e => setEditInput(e.target.value)} 
                                        style={{ 
                                            flex: 2,
                                            minWidth: '200px',
                                            padding: '4px 8px', 
                                            background: themeStyles.bg, 
                                            border: `1px solid ${themeStyles.border}`,
                                            color: themeStyles.text,
                                            borderRadius: '4px'
                                        }} 
                                    />
                                    <input 
                                        type="date"
                                        value={editDeadline} 
                                        onChange={e => setEditDeadline(e.target.value)} 
                                        style={{ 
                                            padding: '4px 8px', 
                                            background: themeStyles.bg, 
                                            border: `1px solid ${themeStyles.border}`,
                                            color: themeStyles.text,
                                            borderRadius: '4px'
                                        }} 
                                    />
                                    <select 
                                        value={editTag?.id || ''} 
                                        onChange={e => setEditTag(tags.find(t => t.id === e.target.value) || null)}
                                        style={{ 
                                            padding: '4px 8px', 
                                            background: themeStyles.bg, 
                                            border: `1px solid ${themeStyles.border}`,
                                            color: themeStyles.text,
                                            borderRadius: '4px'
                                        }}
                                    >
                                        <option value="">Без тега</option>
                                        {tags.map(tag => <option key={tag.id} value={tag.id}>{tag.name}</option>)}
                                    </select>
                                    <button onClick={saveEdit} style={{ 
                                        padding: '4px 12px', 
                                        background: '#4CAF50', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>
                                        ✓
                                    </button>
                                    <button onClick={cancelEdit} style={{ 
                                        padding: '4px 12px', 
                                        background: '#ff4444', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}>
                                        ✗
                                    </button>
                                </div>
                            ) : (
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    flexWrap: 'wrap'
                                }}>
                                    <input 
                                        type="checkbox" 
                                        checked={task.status} 
                                        onChange={() => toggleCheck(task.id)} 
                                    />
                                    
                                    <span style={{ 
                                        flex: 2,
                                        textDecoration: task.status ? 'line-through' : 'none',
                                        color: themeStyles.text,
                                        minWidth: '200px'
                                    }}>
                                        {task.task}
                                    </span>

                                    <span style={{ 
                                        color: themeStyles.text,
                                        fontSize: '14px',
                                        fontStyle: !task.deadline ? 'italic' : 'normal',
                                        minWidth: '100px'
                                    }}>
                                        {formatDeadline(task.deadline)}
                                    </span>

                                    <span style={{ 
                                        color: themeStyles.text,
                                        fontSize: '14px',
                                        fontStyle: !task.tags || task.tags.length === 0 ? 'italic' : 'normal',
                                        minWidth: '80px'
                                    }}>
                                        {formatTag(task)}
                                    </span>

                                    {isOverdue(task) && (
                                        <span style={{ 
                                            color: '#ff4444', 
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            padding: '2px 6px',
                                            background: 'rgba(255, 68, 68, 0.1)',
                                            borderRadius: '4px',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            Просрочено
                                        </span>
                                    )}

                                    <div style={{ display: 'flex', gap: '5px', marginLeft: 'auto' }}>
                                        <button 
                                            onClick={() => startEdit(task)}
                                            style={{ 
                                                padding: '4px 12px', 
                                                background: '#2196F3', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '4px', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            Изменить
                                        </button>

                                        <button 
                                            onClick={() => deleteTask(task.id)}
                                            style={{ 
                                                padding: '4px 12px', 
                                                background: '#ff4444', 
                                                color: 'white', 
                                                border: 'none', 
                                                borderRadius: '4px', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            ✗
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                )}
            </ul>

            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                padding: '15px', 
                background: themeStyles.bg, 
                borderRadius: '4px', 
                marginTop: '20px',
                color: themeStyles.text
            }}>
                <span>Всего: {tasks.length}</span>
                <span>Выполнено: {tasks.filter(t => t.status).length}</span>
                <span>Просрочено: {tasks.filter(t => isOverdue(t)).length}</span>
            </div>
        </div>
    );
}