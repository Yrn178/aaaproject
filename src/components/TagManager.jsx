import { useState } from 'react';

export function TagManager({ tags, selectedTag, onSelectTag, onAddTag, onDeleteTag, themeStyles }) {
    const [showTagCreator, setShowTagCreator] = useState(false);
    const [newTagInput, setNewTagInput] = useState("");

    const handleAddTag = () => {
        if (!newTagInput.trim()) return;
        onAddTag(newTagInput);
        setNewTagInput("");
        setShowTagCreator(false);
    };

    return (
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
                    <button 
                        onClick={handleAddTag}
                        style={{ 
                            padding: '8px 16px',
                            background: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                <button 
                    onClick={() => onSelectTag(null)}
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
                            onClick={() => onSelectTag(tag)}
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
                            onClick={() => onDeleteTag(tag.id)}
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
    );
}