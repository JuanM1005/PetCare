# 🐾 PetCare

PetCare es una aplicación web para la gestión de clínicas veterinarias pequeñas y medianas.

El proyecto busca ofrecer una interfaz moderna, clara y escalable para administrar pacientes, propietarios, citas, consultas veterinarias e historial clínico desde una sola plataforma.

Actualmente, PetCare se encuentra en desarrollo y el trabajo está enfocado principalmente en la arquitectura y experiencia del frontend.

---

## ✨ Objetivos

PetCare está diseñado para facilitar el trabajo diario dentro de una clínica veterinaria mediante una interfaz que prioriza:

- claridad;
- rapidez de uso;
- accesibilidad;
- reutilización de componentes;
- organización modular;
- tipado estricto;
- experiencia offline-first;
- facilidad de integración futura con un backend.

---

## 🧩 Módulos principales

La aplicación contempla los siguientes módulos:

- Dashboard
- Pacientes
- Propietarios
- Citas
- Consultas veterinarias
- Historial clínico
- Signos vitales
- Usuarios y roles
- Estado offline y sincronización

---

## 👥 Roles previstos

PetCare está pensado para manejar diferentes perfiles dentro de una clínica:

- **Administrador**
- **Veterinario**
- **Recepcionista**

Cada rol tendrá acceso a diferentes funcionalidades de acuerdo con sus responsabilidades.

> La autenticación y autorización real todavía no están implementadas.

---

## 🛠️ Stack tecnológico

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- React Hook Form
- Valibot
- `@hookform/resolvers`
- clsx
- React Icons
- React Context API
- React Portals
- i18next
- react-i18next

### Tooling

- Bun
- Git
- GitHub
- ESLint
- Prettier
- VS Code

---

## 🏗️ Arquitectura

El proyecto sigue una arquitectura orientada a features.

La dirección general de la aplicación es:

```text
src/
├── app/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
├── hooks/
├── lib/
├── mocks/
├── types/
└── styles/
```

No todas las carpetas necesariamente existirán desde el inicio.

La arquitectura crecerá progresivamente según las necesidades reales del proyecto.

---

## 📦 Import aliases

El proyecto utilizará aliases para mantener imports limpios y evitar rutas relativas profundas.

```ts
import { Button } from '@/components/ui';
import type { Patient } from '@/features/patients/types';
```

Alias principal:

```text
@/* → src/*
```

---

## 📚 Barrel files

Los barrel files (`index.ts`) se utilizarán de manera selectiva para definir APIs públicas de carpetas reutilizables.

Ejemplo:

```text
components/ui/
├── Button.tsx
├── Input.tsx
├── Card.tsx
└── index.ts
```

```ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
```

No se crearán barrel files automáticamente en todas las carpetas para evitar dependencias circulares y ocultar innecesariamente la estructura interna.

---

## 🎨 Design System

El diseño de PetCare se está desarrollando previamente en Figma.

Las reglas visuales del proyecto están documentadas en:

```text
docs/DESIGN.md
```

Las referencias visuales se encuentran en:

```text
docs/references/figma/
```

El sistema de diseño actualmente define:

- paleta de colores;
- colores semánticos;
- spacing;
- border radius;
- border widths;
- familia tipográfica;
- jerarquía tipográfica;
- identidad visual de PetCare.

Los diseños aprobados en Figma tienen prioridad sobre estilos genéricos de dashboards.

---

## 🎨 Color principal

PetCare utiliza azul como identidad visual principal.

```text
Primary 600 → #2563EB
```

La paleta completa está documentada en:

```text
docs/DESIGN.md
```

---

## 🔠 Tipografía

La tipografía principal del proyecto es:

**Inter**

La jerarquía definida en Figma contempla:

- Display LG
- Heading H1
- Heading H2
- Heading H3
- Label MD
- Label SM
- Body LG
- Body MD
- Body SM
- Caption

---

## 💾 Enfoque offline-first

PetCare está pensado como una aplicación **offline-first**.

En etapas posteriores se contempla utilizar:

```text
IndexedDB
```

para almacenar información localmente y permitir que ciertas operaciones continúen funcionando sin conexión.

Posteriormente se implementará un mecanismo de sincronización con el backend.

Estados previstos:

```text
online
offline
pending-sync
synced
conflict
```

> La persistencia y sincronización todavía no están implementadas.

---

## 🗃️ Modelo de dominio

Las principales entidades previstas son:

```text
User
Owner
Pet
Appointment
MedicalRecord
VitalSigns
```

Relaciones principales:

```text
Owner 1 ─── N Pet

Pet 1 ─── N Appointment

Pet 1 ─── N MedicalRecord

User 1 ─── N Appointment

User 1 ─── N MedicalRecord

Appointment 1 ─── 1 MedicalRecord

MedicalRecord 1 ─── 1 VitalSigns
```

Actualmente estas entidades se utilizarán principalmente como contratos y tipos del frontend.

---

## 🧪 Datos durante el desarrollo

Mientras no exista backend, PetCare utilizará datos mock tipados.

Ejemplo:

```text
mocks/
├── patients.mock.ts
└── appointments.mock.ts
```

La interfaz se desarrollará de forma que posteriormente estos datos puedan sustituirse por servicios HTTP sin reescribir los componentes visuales.

---

## 🌐 Backend

El backend se desarrollará en una etapa posterior.

Tecnologías previstas:

- Node.js
- Express
- TypeScript
- PostgreSQL
- REST API
- autenticación
- control de roles
- sincronización de datos

Actualmente **no forman parte de la implementación activa del proyecto**.

---

## 🚀 Instalación

Clona el repositorio:

```bash
git clone <repository-url>
```

Entra al proyecto:

```bash
cd petcare
```

Instala las dependencias:

```bash
bun install
```

Inicia el entorno de desarrollo:

```bash
bun run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

---

## 📜 Scripts

Los scripts disponibles pueden consultarse en:

```text
package.json
```

Los principales serán:

```bash
bun run dev
bun run build
bun run lint
```

---

## 🧪 Build

Para generar una versión de producción:

```bash
bun run build
```

---

## 📐 Buenas prácticas

El proyecto prioriza:

- TypeScript estricto;
- componentes reutilizables;
- separación clara de responsabilidades;
- arquitectura feature-based;
- estado local antes que global;
- React Context API cuando sea necesario;
- imports mediante aliases;
- barrel files selectivos;
- `import type`;
- código inmutable;
- accesibilidad;
- HTML semántico;
- reutilización de design tokens;
- dependencias únicamente cuando aporten valor;
- evitar sobreingeniería.

---

## 📋 Estado actual

### Foundation

- [x] Proyecto React + TypeScript + Vite
- [x] Documentación de arquitectura
- [x] Design foundations en Figma
- [x] Paleta de colores
- [x] Spacing
- [x] Radius
- [x] Borders
- [x] Identidad gráfica
- [x] AGENTS.md
- [x] DESIGN.md

### Próximamente

- [ ] Configuración de Tailwind CSS v4
- [ ] Configuración de React Router
- [ ] Configuración de aliases
- [ ] Design tokens en código
- [ ] Componentes UI
- [ ] App Layout
- [ ] Sidebar
- [ ] Dashboard
- [ ] Módulo de pacientes
- [ ] Módulo de citas
- [ ] Módulo de consultas
- [ ] Persistencia offline
- [ ] Backend

---

## 🗺️ Roadmap

El desarrollo se realizará de manera incremental.

### Fase 1 — Foundation

- configuración técnica;
- design tokens;
- componentes UI;
- layout principal;
- routing.

### Fase 2 — Pacientes

- listado;
- búsqueda;
- registro;
- edición;
- detalle.

### Fase 3 — Citas

- agenda;
- creación;
- estados;
- reprogramación;
- cancelación.

### Fase 4 — Flujo clínico

- consultas;
- signos vitales;
- diagnóstico;
- tratamiento;
- historial clínico.

### Fase 5 — Dashboard y UX

- métricas;
- próximas citas;
- gráficas;
- estados vacíos;
- loading states.

### Fase 6 — Offline y backend

- IndexedDB;
- sincronización;
- API;
- autenticación;
- roles;
- PostgreSQL.

---

## 📖 Documentación

Documentación principal:

```text
AGENTS.md
docs/DESIGN.md
docs/references/figma/
```

### `AGENTS.md`

Define las reglas técnicas y de arquitectura que deben seguirse al desarrollar PetCare.

### `docs/DESIGN.md`

Define el sistema visual y las decisiones de diseño provenientes de Figma.

### `docs/references/figma/`

Contiene referencias visuales aprobadas para implementar la interfaz.

---

## 👥 Integrantes del proyecto

- **Aguirre Mares Juan Antonio** — 219554864
- **Arreguin Covarrubias Renata Margarita** — 219776638
- **Jiménez Bautista Evelin Mariana** — 214120726
- **Orozco Rosas Eriberto** — 217882945
- **Soto Langarica César Josué** — 218768216

---

## 📄 Licencia

Este proyecto se encuentra actualmente en desarrollo con fines académicos, profesionales y de portafolio.
