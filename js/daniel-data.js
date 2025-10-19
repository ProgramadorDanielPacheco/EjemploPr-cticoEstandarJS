const LS_KEYS = { theme: 'demo.theme', count: 'demo.count' };

export function initTheme(toggleBtn) {
    // Estado inicial: localStorage o prefers-color-scheme
    const saved = localStorage.getItem(LS_KEYS.theme);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const start = saved ?? (prefersDark ? 'dark' : 'light');
    applyTheme(start, toggleBtn);

    toggleBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next, toggleBtn);
    });
}