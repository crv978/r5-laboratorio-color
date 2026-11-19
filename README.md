# R5 · Laboratorio de color y contraste

Herramienta accesible para calcular contraste WCAG, sugerir correcciones y generar paletas exportables en CSS.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Comprobación

```bash
npm test
npm run test:coverage
npm run check
npm run build
```

`npm run check` exige tipos, ESLint sin advertencias, Prettier y pruebas.

## Entrega

- Código y documentos: repositorio de GitHub.
- Producción: dirección de Vercel pendiente de publicar.
- Evidencias: `calidad/CALIDAD.md` y `calidad/CHECKLIST.md`.
- Uso responsable de IA: `ia/`, incluido `ia/BITACORA.md`.

## Páginas

- `/`: verificador de contraste.
- `/paleta`: generación y exportación de paletas.
- `/guardadas`: paletas almacenadas en `localStorage`.
