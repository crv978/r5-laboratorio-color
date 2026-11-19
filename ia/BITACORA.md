# Bitácora de uso responsable de IA

## Caso 1 — Scripts incompletos

- Propósito: completar los scripts de prueba y calidad.
- Evidencia: el proyecto original no tenía `test` ni `check`.
- Validación: se añadió el script completo y se ejecutó `npm run check`.
- Decisión: aceptada la corrección después de comprobarla.

## Caso 2 — Renderizado de URL

- Propósito: restaurar los colores desde la URL.
- Evidencia: una propuesta inicial sincronizaba estado dentro de efectos sin validación clara.
- Validación: se separó el estado inicial con `useState` y se corrigió la validación.
- Decisión: se rechazó parte de la propuesta y se conservó la versión comprobada con tipos y lint.

## Caso 3 — Prueba con matcher incorrecto

- Propósito: comprobar el último cambio del selector.
- Evidencia: se intentó usar `toHaveLastCalledWith`, que no estaba disponible en el entorno Vitest.
- Validación: se reemplazó por una lectura directa de `mock.calls`.
- Decisión: corregido y ambas suites aprobaron.
