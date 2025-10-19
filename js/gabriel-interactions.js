// BY Gabriel
// Interacciones de DOM + accesibilidad (aria-live) + validación básica

export function setupCounter({ incBtn, resetBtn, countEl, liveEl, getCount, setCount }) {
    const announce = (msg) => { liveEl.textContent = msg; };

    incBtn.addEventListener('click', () => {
        const next = getCount() + 1;
        setCount(next);
        countEl.textContent = String(next);
        announce(`Contador: ${next}`);
    });

    resetBtn.addEventListener('click', () => {
        setCount(0);
        countEl.textContent = '0';
        announce('Contador reiniciado a 0');
    });

    // Acceso por teclado: Enter para sumar
    incBtn.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') incBtn.click();
    });
}

export function setupForm({ form, msgEl }) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        if (nombre.length < 3) {
            msgEl.textContent = 'Por favor, ingresa un nombre de al menos 3 caracteres.';
            form.nombre.focus();
            return;
        }
        msgEl.textContent = `¡Hola, ${nombre}! Tu formulario fue enviado correctamente.`;
        form.reset();
    });
}
