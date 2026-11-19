# Reglas para asistentes de IA

## Stack y estructura

- Proyecto Next.js App Router con React, TypeScript y CSS Modules.
- Código en `src/app`, `src/components`, `src/hooks` y `src/lib`.
- Pruebas Vitest en `tests/`.
- Entrega documentada en `README.md`, `calidad/` e `ia/`.

## Comandos obligatorios

- `npm run dev`: ejecutar localmente.
- `npm test`: ejecutar pruebas.
- `npm run test:coverage`: medir cobertura.
- `npm run check`: tipos, ESLint, Prettier y pruebas.
- `npm run build`: compilar producción.

## Reglas de calidad

- Mantener HTML semántico y navegación accesible por teclado.
- Usar tipos estrictos de TypeScript y componentes reutilizables.
- Conservar pruebas unitarias y al menos 80 % de cobertura de `src/lib`.
- Ejecutar `npm run check` antes de entregar o hacer commit.
- No ocultar errores de lint, tipos o pruebas.

## Restricciones

- No leer ni modificar `.env*`, llaves, credenciales ni datos personales.
- No salir de la carpeta del proyecto.
- No publicar, crear repositorios, instalar paquetes globales ni desplegar sin autorización.
- No compartir secretos con servicios externos.
- Registrar cambios relevantes en `ia/BITACORA.md`.

## Convención

- Cambios pequeños y comprobables.
- Nombres descriptivos y sin comentarios triviales.
- Mantener español en interfaz y documentación.
