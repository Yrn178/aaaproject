export const themes = {
    light: { 
        bg: '#f8f9fa', 
        border: '#ddd', 
        btn: '#f0f0f0',
        tag: '#e0e0e0',
        text: '#333',
        cardBg: '#ffffff'
    },
    dark: { 
        bg: '#2d2d2d', 
        border: '#555', 
        btn: '#404040',
        tag: '#555',
        text: '#fff',
        cardBg: '#1a1a1a'
    }
};

export const applyTheme = (theme) => {
    document.body.style.cssText = theme === 'light' 
        ? 'background:#fff;color:#333;margin:0;padding:0;min-height:100vh;display:flex;justify-content:center;align-items:center' 
        : 'background:#1a1a1a;color:#fff;margin:0;padding:0;min-height:100vh;display:flex;justify-content:center;align-items:center';
};