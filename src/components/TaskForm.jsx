import { useState } from 'react';

export function TaskForm({ onAddTask, tags, themeStyles }) {
    const [taskInput, setTaskInput] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");
    const [selectedTag, setSelectedTag] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskInput.trim()) return;
        onAddTask(taskInput, taskDeadline, selectedTag);
        setTaskInput("");
        setTaskDeadline("");
        setSelectedTag(null);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
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
                    borderRadius: '4px',
                    boxSizing: 'border-box'
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
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                }}
            />
            {tags.length > 0 && (
                <select 
                    value={selectedTag?.id || ''}
                    onChange={e => {
                        const tag = tags.find(t => t.id === e.target.value);
                        setSelectedTag(tag || null);
                    }}
                    style={{ 
                        padding: '10px',
                        background: themeStyles.bg,
                        border: `1px solid ${themeStyles.border}`,
                        color: themeStyles.text,
                        borderRadius: '4px'
                    }}
                >
                    <option value="">Без тега</option>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>
            )}
            <button 
                type="submit"
                style={{ 
                    padding: '10px 20px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Добавить
            </button>
        </form>
    );
}