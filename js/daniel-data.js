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

function applyTheme(theme, toggleBtn) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(LS_KEYS.theme, theme);
    const pressed = theme === 'dark';
    toggleBtn.setAttribute('aria-pressed', String(pressed));
    toggleBtn.textContent = pressed ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
}

export function getPersistedCount() {
    return Number(localStorage.getItem(LS_KEYS.count) ?? 0);
}
export function setPersistedCount(n) {
    localStorage.setItem(LS_KEYS.count, String(n));
}
