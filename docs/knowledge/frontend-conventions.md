# PetCare Frontend Conventions

> Secondary technical reference for Codex and contributors.
>
> This document is derived mainly from `Apuntes FullStack.pdf` and adapted to the
> conventions already established in PetCare.
>
> It is **supporting guidance**, not the highest-priority source of truth.

## Source priority

When implementing PetCare, follow sources in this order:

1. `AGENTS.md` — project rules, constraints, architecture and current scope.
2. `docs/DESIGN.md` — visual system, tokens and UX/UI source of truth.
3. Existing PetCare code and established patterns.
4. `docs/knowledge/frontend-conventions.md` — this document.
5. `docs/knowledge/Apuntes-FullStack.pdf` — extended learning/reference material.

If this document or the FullStack notes conflict with `AGENTS.md`, `docs/DESIGN.md`,
or an established PetCare decision, follow the PetCare-specific source.

---

## 1. Imports and module boundaries

### `@/*` alias

Use the project alias for imports from `src`:

```ts
import { Button } from '@/components/ui/Button';
```

Prefer this over deeply nested imports such as:

```ts
import { Button } from '../../../components/ui/Button';
```

Short local relative imports inside the same component/feature folder are acceptable.

### `import type`

When an import is used only by TypeScript, prefer:

```ts
import type { Patient } from '@/types/patient.types';
```

This makes the type-only dependency explicit and prevents it from being treated as a
runtime import.

### Static vs dynamic imports

Use static imports for code needed immediately.

Use dynamic imports with `lazy()` only when splitting a meaningful piece of the application,
normally a route-level or genuinely heavy section:

```ts
const PatientsPage = lazy(() =>
  import('@/features/patients').then((module) => ({
    default: module.PatientsPage,
  })),
);
```

Do not lazy-load small components merely because the API exists.

When `lazy()` is used, provide an appropriate `Suspense` fallback.

---

## 2. React components

Components are independent, reusable UI blocks and should use PascalCase names.

PetCare convention:

```tsx
export const PatientCard = () => {
  return <article>...</article>;
};
```

Use arrow functions for React:

- components;
- pages;
- layouts;
- providers.

Keep components focused. Extract a component when it has a clear visual, behavioral,
or domain responsibility; do not split markup mechanically into tiny components.

Prefer semantic HTML over generic `div` elements when an appropriate element exists.

---

## 3. State

### Prefer local state first

Keep state close to the component or feature that owns it.

Only move state upward when multiple distant consumers genuinely need the same source of truth.

Do not create a global state solution for data that belongs to one page or one feature.

### Immutability

Never mutate React state directly.

Avoid mutating methods on state arrays:

```ts
push();
pop();
shift();
unshift();
splice();
sort();
reverse();
```

Prefer operations that return new references:

```ts
map();
filter();
slice();
concat();
toSorted();
toReversed();
```

or spread:

```ts
setPatients((current) => [...current, newPatient]);
```

When updating objects, create a new object/reference instead of modifying the existing one.

---

## 4. Hooks

### `useEffect`

Use `useEffect` for synchronization with systems outside React, not as a default place for
ordinary calculations.

Keep dependency arrays correct.

If an effect starts a subscription, timer, listener, or request that can outlive the current
render/component, provide cleanup.

Example:

```ts
useEffect(() => {
  const intervalId = window.setInterval(updateClock, 60_000);

  return () => {
    window.clearInterval(intervalId);
  };
}, []);
```

### Async work and cancellation

For cancelable requests, prefer `AbortController` when appropriate.

A component should not continue updating state from obsolete async work after it is no longer
relevant.

### `useRef`

Use `useRef` when a mutable value needs to persist across renders without triggering a
re-render, or when a DOM reference is required.

Do not use `useRef` as a replacement for visible UI state.

### `useMemo`

Use `useMemo` to cache a genuinely expensive derived calculation when its dependencies do not
change frequently.

Do not wrap every calculation in `useMemo`.

### `useCallback`

Use `useCallback` when stable function identity has a real purpose, for example when interacting
with memoized children or another API that depends on reference identity.

Do not add it automatically to every event handler.

---

## 5. Context

Use Context only for focused shared state.

PetCare must not grow a single giant `GlobalContext`.

Examples of reasonable focused contexts:

- theme;
- authenticated user/session later;
- another truly cross-cutting concern when justified.

Recommended structure:

```text
context/
└── theme/
    ├── ThemeContext.ts
    ├── ThemeProvider.tsx
    ├── useThemeContext.ts
    └── index.ts
```

The context itself should normally be initialized with `undefined`:

```ts
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
```

Expose a safe custom hook that validates provider usage:

```ts
export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }

  return context;
};
```

Keep state management in the Provider, not in the context-definition file.

---

## 6. TypeScript

Use strict TypeScript.

Do not use `any` in PetCare.

When an external or caught value is not known, begin with `unknown` and narrow it safely.

Prefer explicit domain unions:

```ts
export type AppointmentStatus =
  | 'scheduled'
  | 'confirmed'
  | 'pending';
```

Use interfaces for clear object contracts when appropriate:

```ts
export interface PatientSummary {
  id: string;
  name: string;
  species: string;
}
```

Use type aliases for unions, transformations and derived types.

### Reuse types instead of duplicating them

Use TypeScript utility types when they make the relationship clear:

```ts
type EditablePatient = Partial<Patient>;
type PatientWithoutId = Omit<Patient, 'id'>;
type PatientListItem = Pick<Patient, 'id' | 'name' | 'species'>;
type ImmutablePatient = Readonly<Patient>;
```

Use generics when they actually represent reusable behavior; do not introduce generics simply
to make a function look more abstract.

---

## 7. Barrel files (`index.ts`)

Barrel files are useful for clean public APIs in reusable UI libraries and well-defined module
boundaries.

Good example:

```ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

Use barrels selectively for:

- reusable UI;
- layout public APIs;
- feature public entry points when useful.

Avoid huge barrels in deeply nested or massive directories.

Prefer explicit exports over indiscriminate:

```ts
export * from './...';
```

Avoid circular dependencies.

---

## 8. Folder responsibilities

PetCare uses feature-based organization.

```text
src/
├── app/
├── components/
│   ├── ui/
│   └── layout/
├── context/
├── features/
├── hooks/
├── lib/
├── mocks/
├── styles/
└── types/
```

General responsibility:

- `app/`: router, application composition and app-level pages.
- `components/ui/`: generic reusable Design System components.
- `components/layout/`: shared application shell components.
- `features/`: domain/feature-specific UI, types and behavior.
- `context/`: focused global/shared providers only.
- `hooks/`: reusable hooks that do not clearly belong to one feature.
- `lib/`: integrations, utilities and framework/library configuration.
- `mocks/`: typed development data where shared placement is justified.
- `styles/`: global styles and design tokens.
- `types/`: genuinely shared domain/application types.

Do not create a folder/layer before it has a real responsibility.

Feature-specific components should stay inside the feature rather than being promoted to the
generic Design System prematurely.

---

## 9. Reusable component folders

PetCare convention for reusable UI/layout components:

```text
Button/
├── Button.tsx
├── Button.types.ts
└── index.ts
```

Only create `Component.types.ts` when a separate type file is useful.

Do not create artificial empty files solely to satisfy a pattern.

Keep the public API explicit through `index.ts`.

---

## 10. React Router

PetCare uses React Router v7 and the existing `createBrowserRouter` architecture.

Use nested routes for shared layouts.

`Outlet` is the place where a matched child route is rendered inside its parent layout:

```tsx
export const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
```

### Navigation components

Use `Link` for normal in-app navigation.

Use `NavLink` for navigation that needs active-state awareness, such as:

- Sidebar;
- tabs;
- navigation menus.

Do not maintain a duplicate manual `activeItem` state when the router already knows the active
route.

Use `useNavigate` for programmatic navigation after logic/actions.

Use `<Navigate replace />` for declarative redirects where appropriate.

### History

Use router navigation for history actions:

```ts
navigate(-1);
```

### 404

Use a catch-all route for an expected unknown URL:

```tsx
{
  path: '*',
  Component: NotFoundPage,
}
```

Expected 404 navigation and unexpected route/runtime errors are separate concerns.

### Dynamic routes

Use dynamic segments for resource pages:

```text
/patients/:patientId
/appointments/:appointmentId
```

Read them with `useParams()` and handle missing/invalid values explicitly.

---

## 11. Forms

The FullStack notes contain React Hook Form examples using Zod.

**PetCare project override:** PetCare uses **Valibot instead of Zod**.

Use:

- `react-hook-form`;
- `valibot`;
- `@hookform/resolvers`.

Keep substantial validation schemas outside presentation components.

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

Valibot supports deriving TypeScript types from schemas; prefer deriving/reusing types when it
prevents duplicated contracts.

When using plain Valibot validation outside React Hook Form, `safeParse()` is preferred when
validation failure should be handled as data rather than as an exception.

Remember that a `<button>` inside a form defaults to `type="submit"`. Specify
`type="button"` for non-submit actions.

---

## 12. Portals

React Portals are appropriate for interface elements that need to render outside the normal DOM
hierarchy while remaining part of the React tree.

Typical uses include:

- Modal/Dialog;
- Toast;
- floating overlays where stacking/overflow requires it.

PetCare's existing `Modal` implementation is the established reference. Do not create a second
portal system without a clear requirement.

---

## 13. Data fetching and APIs

The notes cover Fetch/Axios and `AbortController`, but the current PetCare stage remains
frontend-first.

Do not introduce real API calls until the project scope explicitly reaches integration.

While the backend is not connected:

- use small typed mocks;
- keep mocks outside presentation components when practical;
- do not simulate a backend architecture unnecessarily;
- do not create repositories/services just to wrap static arrays.

When real HTTP integration begins, cancellation and stale-request handling should be considered
for requests that can become obsolete.

---

## 14. UI states

Components and feature screens that depend on data should be designed to account for relevant
states:

- loading;
- empty;
- error;
- success.

PetCare is offline-first, so when the feature requires it also consider:

- offline;
- pending sync;
- synced.

Do not implement fake synchronization logic before the persistence/sync architecture exists.

---

## 15. Current PetCare cross-cutting standards

These are current project decisions and take precedence over older examples in the notes.

### Internationalization

PetCare uses:

- `i18next`;
- `react-i18next`;
- `i18next-browser-languagedetector`.

Current languages:

- Spanish (`es`);
- English (`en`).

Translation resources are static/local to support the offline-first direction.

Do not hardcode user-facing text in new production UI when it belongs in i18n.

### Theme

PetCare supports:

- light;
- dark.

Use the focused Theme Context already implemented.

Prefer semantic design tokens over spreading hardcoded theme-specific colors throughout
components.

### Notifications

Use `react-hot-toast` for transient feedback.

Do not build another custom toast provider/system unless requirements change.

A notification center/domain notifications are a different concern from transient toasts.

---

## 16. Design System

Before creating a new generic component, inspect the existing Design System.

Current reusable primitives include components such as:

- Button;
- Input;
- Textarea;
- Select;
- Checkbox;
- Radio;
- Card;
- Badge;
- Spinner;
- Modal.

Reuse and compose them when their existing API fits.

Do not modify a generic component solely to accommodate one feature-specific visual case unless
the change is genuinely reusable.

PetCare visual decisions come from `docs/DESIGN.md`, not from generic framework defaults.

---

## 17. Performance

Do not optimize prematurely.

Use:

- `lazy`/dynamic imports for meaningful code splitting;
- `Suspense` with appropriate fallback;
- `useMemo` for expensive calculations;
- `useCallback` when stable callback identity matters.

Do not add these mechanisms mechanically to every component.

Prefer clear code first, then optimize based on an actual reason.

---

## 18. Dependency policy

Before adding a package:

1. confirm the existing stack cannot solve the requirement cleanly;
2. verify the dependency is appropriate for the actual feature;
3. avoid installing a library for trivial native behavior;
4. follow the package manager convention already used by PetCare (Bun).

Technologies mentioned in learning notes are **not automatic project dependencies**.

In particular, references to libraries such as:

- Temporal;
- TanStack Table;
- Zustand;
- Motion;
- Chart.js;
- better-auth;
- pragmatic-drag-and-drop;
- nuqs

should be introduced only when a PetCare requirement justifies them.

---

## 19. Implementation workflow for Codex

Before a meaningful frontend change:

1. read `AGENTS.md`;
2. read the relevant section of `docs/DESIGN.md`;
3. inspect existing components/features before creating replacements;
4. identify existing types, tokens and dependencies;
5. make the smallest coherent change;
6. avoid unrelated refactors;
7. preserve established architecture;
8. run project validation.

Expected validation:

```bash
bun run format
bun run format:check
bun run lint
bun run build
```

Do not consider a task complete when these fail unless the failure is pre-existing and explicitly
reported.

---

## 20. What this document must not do

This file is not permission to:

- implement backend prematurely;
- introduce every technology mentioned in the FullStack notes;
- replace `AGENTS.md`;
- override `docs/DESIGN.md`;
- redesign working PetCare components;
- create abstractions without a current need;
- copy tutorial architecture blindly into the production project.

Use the notes to reinforce concepts and consistency, while keeping PetCare's actual architecture
and current scope as the final decision.
