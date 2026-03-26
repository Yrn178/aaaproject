import { v4 as uuidv4 } from 'uuid';

export const createNewTask = (text, deadline, tag) => ({
    id: uuidv4(), 
    task: text, 
    status: false, 
    deadline: deadline || null, 
    tags: tag ? [tag] : []
});

export const createNewTag = (name) => ({ 
    id: uuidv4(), 
    name 
});

export const isOverdue = (task) => {
    return task.deadline && !task.status && new Date(task.deadline) < new Date();
};

export const formatDeadline = (deadline) => {
    if (!deadline) return "Без дедлайна";
    const date = new Date(deadline);
    return date.toLocaleDateString('ru-RU');
};

export const formatTag = (task) => {
    if (!task.tags || task.tags.length === 0) return "Без тега";
    return task.tags[0].name;
};

export const filterTasks = (tasks, search, tag) => {
    return tasks.filter(task => 
        task.task.toLowerCase().includes(search.toLowerCase()) && 
        (!tag || task.tags?.some(t => t.id === tag.id))
    );
};

export const getTaskStats = (tasks) => {
    return {
        total: tasks.length,
        completed: tasks.filter(t => t.status).length,
        overdue: tasks.filter(t => isOverdue(t)).length
    };
};