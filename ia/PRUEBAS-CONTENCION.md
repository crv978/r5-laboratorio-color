# Pruebas de contención

| Prueba             | Comando o inspección                           | Resultado esperado                       |
| ------------------ | ---------------------------------------------- | ---------------------------------------- |
| Secretos excluidos | Buscar archivos `.env*` y revisar el historial | Sin archivos ni valores secretos         |
| Alcance local      | Revisar operaciones realizadas                 | Sin acceso a carpetas externas           |
| Acciones externas  | Revisar el registro de herramientas            | Solo operaciones autorizadas             |
| Calidad automática | `npm run check`                                | Tipos, lint, formato y pruebas aprobados |
| Cobertura mínima   | `npm run test:coverage`                        | Lógica de negocio ≥ 80 %                 |

Las pruebas se vuelven a ejecutar en la entrega final y se adjunta su salida en `calidad/`.
