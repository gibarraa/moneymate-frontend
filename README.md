# MoneyMate Frontend

Frontend premium de **MoneyMate**, una app web para registrar ingresos y egresos, visualizar balance, administrar presupuestos, seguir metas de ahorro y generar reportes financieros.

## Stack

- React + TypeScript + Vite
- TailwindCSS
- React Router DOM
- Axios
- Recharts
- Lucide React

Nota: el frontend incluye persistencia local inteligente para funcionar incluso cuando el backend todavía no está disponible. En cuanto la API responda, la capa `services/` está lista para conectarse a `VITE_API_URL`.

## Funcionalidades implementadas

- Login y register con sesión persistida en `localStorage`
- Rutas públicas y privadas
- Layout premium con sidebar, header y responsive móvil
- Dashboard con métricas clave, gráficas y recomendación destacada
- CRUD visual de movimientos con filtros por tipo, categoría, búsqueda y fecha
- Presupuestos con porcentaje usado y alertas por nivel
- Metas de ahorro con progreso y fecha límite
- Reportes mensuales con descarga de resumen
- Settings con perfil, datos técnicos y cierre de sesión
- Toasts, empty states, estados de carga y confirmación antes de eliminar

## Usuario demo

Puedes entrar con cualquier correo y contraseña. Por defecto el formulario carga:

- Email: `demo@moneymate.app`
- Password: `123456`

## Variables de entorno

Crea tu archivo `.env` a partir de este valor:

```env
VITE_API_URL=http://localhost:4000/api
```

## Instalación

```bash
npm install
npm run dev
```

## Comandos

Para producción:

```bash
npm run build
npm run preview
```

## Estructura principal

```txt
src/
├── components/
│   ├── cards/
│   ├── charts/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── auth/
│   ├── dashboard/
│   ├── transactions/
│   ├── budgets/
│   ├── goals/
│   ├── reports/
│   └── settings/
├── routes/
├── services/
├── types/
└── utils/
```

## Rutas

- `/login`
- `/register`
- `/dashboard`
- `/transactions`
- `/budgets`
- `/goals`
- `/reports`
- `/settings`

## Arquitectura frontend

- `context/AuthContext.tsx`: sesión, token y auth
- `context/FinanceContext.tsx`: estado financiero global y CRUD visual
- `services/api.ts`: base para conexión con API
- `services/authService.ts`: login, register y lectura de usuario
- `services/financeService.ts`: snapshot financiero, cálculos y fallback local
- `routes/AppRoutes.tsx`: control de rutas públicas y privadas

## Deploy

El proyecto incluye `vercel.json` para soportar rutas SPA en Vercel.

Configuración del proyecto en Vercel:

| Ajuste | Valor |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Variable de producción | `VITE_API_URL=https://moneymate-backend-production.up.railway.app/api` |

Link público del frontend: <https://moneymate-frontend-lake.vercel.app/login>

API pública del backend: <https://moneymate-backend-production.up.railway.app/>

Health check verificado: <https://moneymate-backend-production.up.railway.app/api/health>

## Backend esperado

Este frontend espera una API compatible en:

- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

Y puede extenderse fácilmente para conectar:

- `/transactions`
- `/budgets`
- `/goals`
- `/reports`

## Rama de trabajo

- `frontend-premium`
- Documentación/deploy: `mongodb-docs-deploy`
