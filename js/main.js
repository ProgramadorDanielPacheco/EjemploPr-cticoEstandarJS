// by Gabriel
import { setupCounter, setupForm } from './gabriel-interactions.js';

const $ = (sel) => document.querySelector(sel);

(async () => {
    // 1️⃣ — Intentamos cargar el módulo de Daniel
    try {
        const daniel = await import('./daniel-data-theme.js');

        // ✅ Inicializar tema
        if (daniel.initTheme) {
            const btnTheme = $('#btn-theme');
            daniel.initTheme(btnTheme);
        }

        // ✅ Inicializar persistencia (contador guardado en localStorage)
        const persist = {
            get: daniel.getPersistedCount
                ? () => Number(daniel.getPersistedCount())
                : () => 0,
            set: daniel.setPersistedCount
                ? (n) => daniel.setPersistedCount(n)
                : () => {}
        };

        // ✅ Inicializar productos (listado y filtro)
        if (daniel.loadAndRenderProducts) {
            daniel.loadAndRenderProducts({
                url: './data/products.json',
                listEl: $('#listado'),
                filterEl: $('#q')
            });
        }

        // 2️⃣ — Tu parte (Gabriel)
        const countEl  = $('#count');
        const liveEl   = $('#live');
        const incBtn   = $('#btn-inc');
        const resetBtn = $('#btn-reset');

        let count = persist.get(); // Trae el valor persistido si existe
        countEl.textContent = String(count);

        setupCounter({
            incBtn,
            resetBtn,
            countEl,
            liveEl,
            getCount: () => count,
            setCount: (n) => { count = n; persist.set(n); }
        });

        setupForm({
            form: $('#demo-form'),
            msgEl: $('#form-msg')
        });

    } catch (err) {
        console.error('❌ Error cargando módulo de Daniel:', err);
    }
})();
