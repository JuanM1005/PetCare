# PetCare — Agent Instructions

PetCare is a veterinary clinic management web application for small and medium-sized clinics.

This repository is currently focused on the frontend.

Before making changes, inspect the existing implementation and reuse existing components, types, utilities, design tokens and architectural patterns.

Do not redesign or restructure working parts of the project without a clear reason.

---

## 1. Current Scope

Frontend first.

Do not implement yet:

- Express backend
- PostgreSQL
- Supabase backend
- real JWT authentication
- Better Auth
- real server endpoints
- production synchronization logic

When backend data is required, use typed mock data and keep the UI prepared for future API integration.

Presentation components should not depend directly on mock implementations.

---

## 2. Main Stack

Use:

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- React Hook Form
- Valibot
- @hookform/resolvers
- clsx
- react-icons
- react-hot-toast → notifications
- React Context API
- React Portals
- i18next
- react-i18next

Runtime and package manager:

- Bun

Prefer:

```bash
bun add
bun remove
bun run
bunx
```

Do not use npm unless there is a concrete reason.

Use `i18next` with `react-i18next` as the official internationalization solution. PetCare
currently supports Spanish and English, and translations must use statically imported resources
to preserve offline-first compatibility.

Light and dark appearance is managed by a focused `ThemeProvider`. Prefer semantic design tokens
for surfaces, text and borders instead of scattering hardcoded theme-specific colors throughout
components.

---

## 3. Design Source of Truth

Before implementing or modifying UI, read:

```text
docs/DESIGN.md
```

Also inspect the Figma references located under:

```text
docs/references/figma/
```

Approved Figma designs and the PetCare design system take priority over generic dashboard conventions.

Do not redesign approved screens unless explicitly requested.

Reuse the official PetCare logo asset instead of recreating it with CSS or icons.

---

## Technical Knowledge

For frontend implementation, also consult:

```text
docs/knowledge/frontend-conventions.md
```

This file is the curated technical reference for PetCare. It is derived from the project's
FullStack notes and adapts those concepts to the architecture and decisions currently approved
for this repository.

When available locally, Codex may also consult the extended source:

```text
docs/knowledge/Apuntes-FullStack.pdf
```

`Apuntes-FullStack.pdf` is optional local reference material. It may be intentionally excluded
from Git with `.gitignore`, so remote clones, CI environments and other contributors must not
depend on it being present.

Source priority remains:

1. `AGENTS.md`
2. `docs/DESIGN.md`
3. Existing PetCare architecture and established patterns
4. `docs/knowledge/frontend-conventions.md`
5. `docs/knowledge/Apuntes-FullStack.pdf`, only when available locally

Rules for the extended notes:

- use them to clarify concepts or reinforce an established implementation pattern;
- do not treat tutorial examples as mandatory project architecture;
- do not introduce a library merely because it appears in the notes;
- do not revive superseded decisions such as Zod when PetCare currently uses Valibot;
- do not introduce backend concerns while the repository remains frontend-first;
- when the PDF conflicts with a higher-priority source, follow the higher-priority source;
- the repository must continue to build and remain understandable without the local PDF.

Do not introduce technologies from the notes unless they are already part of PetCare or the
current requirement explicitly justifies them.

## 4. Architecture

Use a feature-based architecture.

The expected direction is:

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

Create folders only when they have a real responsibility.

Do not create empty architectural layers just because they look professional.

Reusable UI components and reusable application layout components should live in their own
directory. Application layout components belong in `src/components/layout/`.

Example:

```text
components/ui/Button/
├── Button.tsx
├── Button.types.ts
└── index.ts

components/layout/Sidebar/
├── Sidebar.tsx
├── Sidebar.types.ts
└── index.ts
```

Each component directory should expose a small explicit public API through `index.ts`.

Use this structure for reusable components, but do not create unnecessary files when a component
genuinely does not need them.

`AppLayout` is the shared shell for authenticated and clinical application routes. It composes
reusable layout components such as Sidebar and, eventually, Header, and renders route content
through React Router's `Outlet`. Do not duplicate the application shell inside feature pages.

Header is a reusable layout component responsible for page context and global application
controls. Feature-specific actions and content belong to the route page, not Header.

Feature-specific components belong inside their feature directory. Do not move domain-specific
components such as Dashboard metric cards into the generic UI design system unless they become
genuinely reusable across multiple features.

Keep clear separation between:

- presentation
- state
- business/UI logic
- validation
- data access
- types
- routing
- reusable utilities

---

## 5. Import Aliases

Use the project alias:

```text
@/* → src/*
```

Prefer:

```ts
import { Button } from '@/components/ui';
import type { Patient } from '@/features/patients/types';
```

Instead of:

```ts
import { Button } from '../../../../components/ui/Button';
```

Configure the alias in TypeScript and Vite when initializing the project architecture.

Avoid deeply nested relative imports.

Short local relative imports are acceptable when importing a closely related file from the same feature or directory.

---

## 6. Barrel Files

Barrel files (`index.ts`) are allowed and encouraged when they provide a clear public API for a reusable folder.

Good examples:

```text
components/ui/index.ts
components/shared/index.ts
features/patients/components/index.ts
```

Example:

```ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
```

Then:

```ts
import { Button, Card, Input } from '@/components/ui';
```

Do not create barrel files mechanically in every directory.

Avoid barrels when they:

- create circular dependencies;
- hide important dependency relationships;
- export dozens of unrelated modules;
- make tree structure harder to understand;
- introduce unnecessary build complexity.

Prefer explicit exports.

Do not use broad wildcard exports when named exports make the public API clearer.

---

## 7. TypeScript

Use strict TypeScript.

Avoid:

```ts
any
```

Use `unknown` when the type of external data is genuinely unknown.

Prefer:

- interfaces for object contracts;
- type aliases for unions and transformations;
- literal unions for finite states;
- generics when they reduce duplication;
- utility types when appropriate.

Example:

```ts
type AppointmentStatus =
  | 'scheduled'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
```

Use `import type` for type-only imports.

Example:

```ts
import type { Patient } from '@/features/patients/types';
```

Do not duplicate types unnecessarily.

Prefer deriving related types using:

- Pick
- Omit
- Partial
- Required
- Readonly

when they correctly represent the domain.

---

## 8. Naming Conventions

React components:

```text
PascalCase
```

Examples:

```text
PatientCard.tsx
AppointmentForm.tsx
DashboardPage.tsx
```

Hooks:

```text
camelCase beginning with use
```

Examples:

```text
usePatients.ts
useOnlineStatus.ts
```

Utilities:

```text
camelCase
```

Examples:

```text
formatDate.ts
formatPatientName.ts
```

Schemas:

```text
patient.schema.ts
appointment.schema.ts
```

Mocks:

```text
patients.mock.ts
appointments.mock.ts
```

Types:

```text
patient.types.ts
appointment.types.ts
```

Context:

```text
AuthContext.ts
AuthProvider.tsx
useAuth.ts
```

Use descriptive names.

Avoid vague names such as:

- data
- item
- thing
- helper
- utils2
- component2

when a domain-specific name is possible.

---

## 9. React Components

## React Component Style

Use arrow functions for React components.

Prefer:

```tsx
export const PatientCard = () => {
  return <div>PatientCard</div>;
};
```

Prefer small, focused and reusable components.

A component should have a clear responsibility.

Pages should coordinate features and components instead of containing hundreds of lines of JSX and logic.

Prefer composition over oversized configurable components.

Do not prematurely generalize a component that is only used once.

Extract a reusable component when repetition or a clear reusable responsibility exists.

---

## 10. React State

Keep state as close as possible to where it is used.

Use local state first.

Use React Context API only when state genuinely needs to be shared between multiple distant parts of the application.

Do not create one giant `GlobalContext`.

Prefer focused contexts such as:

- AuthContext
- UIContext
- ClinicContext

only when required.

Context structure should normally follow:

```text
context/
├── ExampleContext.ts
├── ExampleProvider.tsx
└── useExampleContext.ts
```

Create contexts with `undefined` as the default value and expose a safe custom hook.

Do not introduce Zustand yet.

---

## 11. Immutability

Never mutate React state directly.

Avoid state mutations such as:

```ts
array.push()
array.splice()
array.sort()
array.reverse()
```

when operating directly on state.

Prefer immutable operations:

```ts
map()
filter()
slice()
toSorted()
toReversed()
spread syntax
```

---

## 12. Hooks

Use React hooks intentionally.

Do not add:

- useEffect
- useMemo
- useCallback

automatically.

Use them only when they solve a concrete problem.

Do not use `useEffect` for values that can be derived during render.

Custom hooks must begin with `use`.

Hooks should encapsulate reusable behavior, not simply move arbitrary code out of a component.

---

## 13. Forms

Use:

```text
React Hook Form
+
Valibot
+
@hookform/resolvers
```

Do not introduce Zod.

Prefer modular Valibot imports:

```ts
import {
  email,
  minLength,
  object,
  pipe,
  string,
} from 'valibot';
```

Avoid namespace imports when unnecessary.

Keep substantial validation schemas outside presentation components.

Example:

```text
features/patients/
└── schemas/
    └── patient.schema.ts
```

Infer TypeScript types from schemas when useful and appropriate.

Display validation errors close to their corresponding fields.

---

## 14. Routing

Use React Router v7.

Use:

- `NavLink` for sidebar/navigation items;
- `Link` for regular declarative navigation;
- `useNavigate` for navigation triggered by application logic;
- `Outlet` for nested layouts;
- dynamic route segments for entity details.

Example direction:

```text
/dashboard

/patients
/patients/new
/patients/:patientId

/appointments
/appointments/new
/appointments/:appointmentId

/consultations/:consultationId
```

Do not introduce TanStack Router.

Use explicit catch-all routes for expected 404 navigation and React Router error boundaries or
`errorElement` for unexpected route errors. Do not expose technical error details to end users.

---

## 15. Tables

`@tanstack/react-table` is approved when the UI genuinely needs a complex table.

Appropriate examples:

- patient lists;
- appointment management;
- user management;
- clinical records.

Use it when functionality such as the following is required:

- sorting;
- filtering;
- pagination;
- column visibility;
- row actions.

Do not introduce it for simple two-column layouts or small static lists.

`@tanstack/react-table` is currently used for complex management listings such as the Patients
table.

---

## 16. Styling

Use Tailwind CSS v4.

Follow the PetCare design tokens documented in:

```text
docs/DESIGN.md
```

The PetCare design system is the source of truth.

Do not silently replace approved Figma values with Tailwind defaults.

When a design value does not map correctly to a default Tailwind token, define the PetCare token globally rather than repeating arbitrary values across components.

Prefer:

```tsx
className="gap-4 rounded-lg p-6"
```

over repeated arbitrary values such as:

```tsx
className="gap-[17px] rounded-[12px] p-[23px]"
```

unless the approved design explicitly requires them.

Use `clsx` for conditional class composition when useful.

Avoid huge duplicated class strings.

---

## 17. UI Components

Prefer reusable primitives when appropriate.

Possible UI components include:

- Button
- Input
- Textarea
- Select
- Checkbox
- Radio
- Card
- Badge
- Modal
- Dialog
- Avatar
- Spinner
- Tooltip
- Table
- SearchInput

Shared application components may include:

- SearchBar
- StatusBadge
- OnlineStatusBadge
- EmptyState
- ConfirmDialog

Before creating a new component, search for an existing equivalent.

Use `react-hot-toast` for transient application notifications.
Do not implement custom toast systems unless project requirements change.

Do not create duplicate variants such as:

```text
PrimaryButton
BlueButton
SubmitButton
```

when a reusable API such as this is sufficient:

```tsx
<Button variant="primary">
```

---

## 18. Accessibility

Use semantic HTML.

Prefer:

- `button` for actions;
- `a` / `Link` / `NavLink` for navigation;
- `nav` for navigation;
- `main` for primary content;
- `label` for form controls.

Do not use clickable `div` elements when a semantic interactive element exists.

Maintain visible keyboard focus.

Use ARIA attributes when necessary.

Do not rely exclusively on color to communicate important clinical states.

---

## 19. Data and Mocking

Until the backend exists, use realistic typed mock data.

Do not hardcode large datasets directly inside components.

Prefer files such as:

```text
mocks/patients.mock.ts
mocks/appointments.mock.ts
```

or feature-local mock files when appropriate.

Components should receive data through props, hooks or feature-level abstractions.

Keep backend integration replaceable.

---

## 20. Domain Types

Core frontend entities include:

- User
- Owner
- Pet
- Appointment
- MedicalRecord
- VitalSigns

Keep these domain concepts clearly typed.

Do not model database implementation details unnecessarily in presentation components.

---

## 21. Performance

Do not optimize prematurely.

Large route-level pages may use:

- React.lazy
- Suspense
- dynamic imports

when they provide meaningful code splitting.

Do not lazy-load every small component.

Avoid unnecessary memoization.

---

## 22. Error and UI States

Data-driven features should account for relevant states:

- loading
- empty
- error
- success

Offline-capable features may additionally use:

- online
- offline
- pending-sync
- synced
- conflict

Create reusable state components when repetition exists.

---

## 23. Future Libraries

The following technologies are planned but must NOT be introduced automatically:

- Temporal
- better-auth
- motion
- fontsource
- chart.js
- zustand
- pragmatic-drag-and-drop
- nuqs

Introduce one only when a feature clearly justifies it and explain the reason first.

---

## 24. Dependency Rules

Before installing a dependency:

1. verify whether React, TypeScript or the current stack already solves the problem;
2. verify whether an existing project dependency already provides the functionality;
3. avoid dependencies for trivial utilities;
4. explain any unapproved dependency before installing it.

Do not add packages merely because they are popular.

---

## 25. Code Quality

Prefer:

- descriptive names;
- small functions;
- single responsibility;
- composition;
- explicit types;
- reusable components;
- predictable data flow;
- early returns when they improve readability.

Avoid:

- unnecessary abstraction;
- duplicated logic;
- giant components;
- magic strings;
- unexplained magic numbers;
- premature optimization;
- clever code that reduces readability.

Comments should explain decisions, not translate obvious code.

---

## 26. Avoid Overengineering

Do not introduce without a concrete need:

- Redux
- Zustand
- dependency injection containers
- frontend repository patterns
- factories everywhere
- event buses
- excessive providers
- excessive generic abstractions
- unnecessary wrappers around native APIs

PetCare should be production-oriented while remaining understandable and maintainable.

---

## 27. File Changes

Before implementing a significant feature:

1. inspect the relevant existing files;
2. identify reusable components;
3. identify reusable design tokens;
4. identify existing types;
5. identify files that need modification;
6. identify any required dependency.

Avoid unrelated refactors.

Do not modify working files simply to enforce personal style preferences.

---

## 28. Validation

After meaningful changes, run the relevant project checks available in the repository.

At minimum, when configured:

```bash
bun run build
```

Also run linting or tests when scripts exist and the change affects them.

Do not claim that the implementation works if validation failed.

---

## 29. Response Style

Keep responses concise.

Before a significant implementation, briefly state:

- what will be reused;
- what will be created or changed;
- whether a dependency is needed.

After implementation report:

- files created;
- files modified;
- relevant decisions;
- how to test the result;
- any remaining limitation.

Do not provide long tutorials unless requested.
