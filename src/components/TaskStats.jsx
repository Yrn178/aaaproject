export function TaskStats({ stats, themeStyles }) {
    return (
        <div style={{ 
            display: 'flex',
            justifyContent: 'space-around',
            padding: '15px',
            background: themeStyles.bg,
            borderRadius: '4px',
            marginTop: '20px',
            color: themeStyles.text
        }}>
            <span>Всего: {stats.total}</span>
            <span>Выполнено: {stats.completed}</span>
            <span>Просрочено: {stats.overdue}</span>
        </div>
    );
}