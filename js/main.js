// by Gabriel
import { setupCounter, setupForm } from './gabriel-interactions.js';

const $ = (sel) => document.querySelector(sel);

// Pequeña capa de persistencia opcional (si Daniel exporta sus funciones)
const persist = {
    get: () => 0,
    set: (_n) => {}
};

(async () => {
    // 1) Intentamos cargar el módulo de Daniel SIN romper nada si falla
    try {
        const d = await import('./daniel-data.js');

        // Tema (si está exportado)
        d.initTheme?.($('#btn-theme'));

        // Persistencia del contador (si está exportado)
        if (d.getPersistedCount && d.setPersistedCount) {
            persist.get = () => Number(d.getPersistedCount());
            persist.set = (n) => d.setPersistedCount(n);
        }

        // Datos + filtro (si está exportado)
        d.loadAndRenderProducts?.({
            url: './data/products.json',
            listEl: $('#listado'),
            filterEl: $('#q')
        });
    } catch (e) {
        console.warn('Módulo de Daniel no cargó o tiene exportaciones distintas:', e);
    }

    // 2) Tu parte (Gabriel): SIEMPRE se inicializa
    const countEl = $('#count');
    const liveEl  = $('#live');
    const incBtn  = $('#btn-inc');
    const resetBtn = $('#btn-reset');

    let count = persist.get();                // si no hay persistencia, empieza en 0
    countEl.textContent = String(count);

    setupCounter({
        incBtn,
        resetBtn,
        countEl,
        liveEl,
        getCount: () => count,
        setCount: (n) => { count = n; persist.set(n); }
    });

    setupForm({ form: $('#demo-form'), msgEl: $('#form-msg') });
})();
