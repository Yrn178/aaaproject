import { useState } from 'react';
import { isOverdue, formatDeadline, formatTag } from '../utils/taskUtils';

export function TaskItem({ task, onToggle, onDelete, onEdit, tags, themeStyles }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.task);
    const [editDeadline, setEditDeadline] = useState(task.deadline || "");
    const [editTag, setEditTag] = useState(task.tags?.[0] || null);

    const handleSaveEdit = () => {
        if (!editText.trim()) return;
        onEdit(task.id, editText, editDeadline, editTag);
        setIsEditing(false);
    };

    const commonStyle = {
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '4px',
        background: themeStyles.bg,
        border: `1px solid ${themeStyles.border}`,
        borderLeft: isOverdue(task) ? '4px solid #ff4444' : 'none',
        opacity: task.status ? 0.7 : 1,
        listStyle: 'none'
    };

    if (isEditing) {
        return (
            <li style={commonStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="checkbox" checked={task.status} onChange={() => onToggle(task.id)} />
                    <input 
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        style={{ 
                            flex: 2,
                            minWidth: '200px',
                            padding: '4px 8px',
                            background: themeStyles.bg,
                            border: `1px solid ${themeStyles.border}`,
                            color: themeStyles.text,
                            borderRadius: '4px',
                            boxSizing: 'border-box'
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
                        onChange={e => {
                            const tag = tags.find(t => t.id === e.target.value);
                            setEditTag(tag || null);
                        }}
                        style={{ 
                            padding: '4px 8px',
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
                    <button 
                        onClick={handleSaveEdit}
                        style={{ 
                            padding: '4px 12px',
                            background: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ✓
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)}
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
            </li>
        );
    }

    return (
        <li style={commonStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <input type="checkbox" checked={task.status} onChange={() => onToggle(task.id)} />
                
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
                        onClick={() => setIsEditing(true)}
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
                        onClick={() => onDelete(task.id)}
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
        </li>
    );
}