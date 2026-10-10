# PetCare — Design System

This document is the visual source of truth for the PetCare frontend.

PetCare is a veterinary clinic management application designed primarily for
small and medium-sized clinics.

The implementation must preserve the approved Figma design, its visual hierarchy
and its design tokens.

When an approved Figma reference exists, it takes precedence over generic
dashboard conventions or arbitrary visual decisions.

Do not redesign approved screens unless explicitly requested.

---

# 1. Design Principles

PetCare should feel:

- clinical;
- professional;
- clean;
- calm;
- modern;
- accessible;
- efficient;
- trustworthy.

The interface is designed for people working inside a veterinary clinic, so
clarity and speed of use have priority over decoration.

Avoid:

- excessive gradients;
- glassmorphism;
- heavy shadows;
- unnecessary animations;
- decorative UI that reduces clarity;
- generic admin-dashboard aesthetics;
- unnecessary visual complexity.

---

# 2. Design References

Figma reference images are stored under:

```text
docs/references/figma/
```

Current references include:

```text
Colors.png
Borders.png
Radius.png
Spacing.png
Typography.png
```

Additional references may later include:

```text
Sidebar.png
Dashboard.png
Patients.png
Appointments.png
Consultations.png
```

These references must be inspected before implementing the corresponding UI.

---

# 3. Brand

Product name:

```text
PetCare
```

The primary visual identity uses blue.

Sidebar branding uses a blue rounded-square icon with a white paw alongside the
PetCare wordmark and the `CLÍNICA VETERINARIA` subtitle.

The provided PetCare PNG logo is reserved for the application favicon:

```text
public/favicon.png
```

Do not use the PNG logo inside the Sidebar or other navigation components unless
the design specification changes.

Generic veterinary icons may still be used elsewhere in the interface where
appropriate.

---

# 4. Color Foundations

The following values come from the approved PetCare color foundation.

## Primary

| Token | Hex |
| --- | --- |
| `primary-900` | `#1E3A8A` |
| `primary-800` | `#1E40AF` |
| `primary-700` | `#1D4ED8` |
| `primary-600` | `#2563EB` |
| `primary-500` | `#3B82F6` |
| `primary-400` | `#60A5FA` |
| `primary-300` | `#93C5FD` |
| `primary-200` | `#BFDBFE` |
| `primary-100` | `#DBEAFE` |
| `primary-50` | `#EFF6FF` |

Primary colors are intended for elements such as:

- primary actions;
- active navigation;
- selected states;
- links;
- focus states;
- important interactive elements.

Do not introduce arbitrary blue values when an existing PetCare primary token
already represents the intended design.

---

# 5. Neutral Foundations

| Token | Hex |
| --- | --- |
| `neutral-950` | `#020617` |
| `neutral-900` | `#0F172A` |
| `neutral-800` | `#1E293B` |
| `neutral-700` | `#334155` |
| `neutral-600` | `#475569` |
| `neutral-500` | `#64748B` |
| `neutral-400` | `#94A3B8` |
| `neutral-300` | `#CBD5E1` |
| `neutral-200` | `#E2E8F0` |
| `neutral-100` | `#F1F5F9` |
| `neutral-50` | `#F8FAFC` |
| `neutral-0` | `#FFFFFF` |

Neutral colors should provide most of the visual structure for:

- text;
- secondary text;
- borders;
- cards;
- page backgrounds;
- disabled states;
- supporting information.

Avoid using primary blue for content that does not require emphasis.

---

# 6. Semantic Colors

The current PetCare semantic colors are:

| Token | Hex |
| --- | --- |
| `success` | `#16A34A` |
| `danger` | `#DC2626` |
| `warning` | `#D97706` |
| `offline` | `#7A7A7A` |

Semantic colors communicate meaning.

They should not be used merely as decoration.

Examples:

### Success

Possible uses:

- successful operation;
- completed appointment;
- successful synchronization;
- positive system state.

### Danger

Possible uses:

- validation errors;
- destructive actions;
- critical clinical/system alerts.

### Warning

Possible uses:

- pending action;
- information requiring attention;
- potentially problematic state.

### Offline

Possible uses:

- offline connection state;
- unavailable network;
- pending connectivity-related state.

Exact semantic usage may evolve as components are designed.

---

# 7. Border Width

The approved border-width foundation is:

| Token | Value |
| --- | --- |
| `border-none` | `0px` |
| `border-hairline` | `1px` |
| `border-strong` | `2px` |

General guidance:

- `border-hairline` should be the common border weight;
- `border-strong` should be reserved for stronger visual emphasis;
- do not introduce arbitrary border widths without a design reason.

The current Figma foundation defines border width, but does not establish one
single global border color.

Border colors should therefore use the appropriate PetCare color token according
to component context.

---

# 8. Border Radius

The approved radius scale is:

| Token | Value |
| --- | --- |
| `radius-none` | `0px` |
| `radius-sm` | `4px` |
| `radius-md` | `8px` |
| `radius-lg` | `12px` |
| `radius-xl` | `16px` |
| `radius-full` | `9999px` |

General implementation guidance:

```text
Inputs      → usually radius-md
Buttons     → usually radius-md
Cards       → usually radius-lg or radius-xl
Badges      → usually radius-full
Avatars     → radius-full
```

These mappings are implementation guidance rather than additional Figma tokens.

When a specific component has an approved Figma design, follow that component
instead of these general recommendations.

Do not introduce arbitrary radius values without justification.

---

# 9. Spacing

PetCare uses a 4px base spacing system.

The approved spacing scale is:

| Token | Value |
| --- | --- |
| `spacing-0` | `0px` |
| `spacing-1` | `4px` |
| `spacing-2` | `8px` |
| `spacing-3` | `12px` |
| `spacing-4` | `16px` |
| `spacing-5` | `20px` |
| `spacing-6` | `24px` |
| `spacing-8` | `32px` |
| `spacing-10` | `40px` |
| `spacing-12` | `48px` |
| `spacing-16` | `64px` |

Prefer this spacing scale throughout the application.

Examples:

Prefer:

```tsx
className="gap-4 p-6 mt-8"
```

over:

```tsx
className="gap-[17px] p-[23px] mt-[31px]"
```

when the approved design can be represented by an existing spacing token.

If an approved Figma component requires a value outside this scale, define the
appropriate design token globally rather than repeatedly hardcoding the value
inside individual components.

---

# 10. Typography

The approved primary typeface is:

```text
Inter
```

The Figma typography foundation currently defines the following semantic styles.

## Display

```text
Display LG
```

## Headings

```text
Heading H1
Heading H2
Heading H3
```

## Labels

```text
Label MD
Label SM
```

## Body

```text
Body LG
Body MD
Body SM
```

## Supporting Text

```text
Caption
```

The current reference image confirms the hierarchy and Inter font family.

However, the supplied reference does not expose the exact values for:

- font-size;
- font-weight;
- line-height;
- letter-spacing.

Therefore:

**Do not invent those typography token values.**

They should be added here after obtaining them directly from the Figma variables
or inspecting the corresponding typography styles.

Temporary implementation values may only be used when necessary to build a
screen, and should be easy to replace once the exact Figma values are available.

---

# 11. Typography Roles

The intended semantic usage is:

### Display LG

For exceptionally prominent page-level information.

Use sparingly.

### Heading H1

Primary page title.

Examples:

```text
Pacientes
Citas
Panel
```

### Heading H2

Major sections inside a page.

### Heading H3

Smaller content sections, cards or grouped information.

### Label MD

Primary labels for controls and important metadata.

### Label SM

Smaller labels and supporting control information.

### Body LG

Prominent readable body content.

### Body MD

Default body content.

### Body SM

Secondary or compact body information.

### Caption

Low-emphasis supporting information.

Example from the approved typography reference:

```text
Última visita: 10 sep 2026
```

---

# 12. Typography Color

Typography should primarily use the neutral scale.

General hierarchy should be created using:

- typography scale;
- font weight;
- neutral color;
- spacing.

Do not use multiple unrelated colors merely to establish text hierarchy.

Primary blue may be used when text itself represents:

- an interactive state;
- an active navigation item;
- a link;
- branded emphasis.

---

# 13. Design Tokens

PetCare visual values should eventually be represented as global design tokens.

Components should consume tokens instead of repeatedly hardcoding values.

Conceptually:

```text
Foundation token
       ↓
CSS / Tailwind theme
       ↓
Reusable UI component
       ↓
Feature component
       ↓
Page
```

Example:

```text
primary-600
     ↓
theme token
     ↓
Button variant="primary"
     ↓
NewPatientButton
```

Avoid:

```text
Page
 ↓
direct arbitrary hex values everywhere
```

---

# 14. Tailwind Mapping

Tailwind CSS v4 will be used as the styling system.

PetCare tokens take precedence over Tailwind's default visual values.

When a Tailwind utility exactly represents a PetCare token, use it directly.

Example:

```tsx
className="gap-4"
```

when it corresponds to:

```text
spacing-4 = 16px
```

When Tailwind's default value does not correspond to the approved Figma design,
the PetCare token should be configured globally.

Do not silently change an approved Figma value merely to use a default Tailwind
class.

Avoid repeated arbitrary utilities such as:

```tsx
rounded-[12px]
bg-[#2563EB]
border-[#E2E8F0]
```

throughout the application.

Instead, expose the PetCare value through the theme/design-token layer.

---

# 15. Surfaces

PetCare should primarily use light surfaces.

The current color foundation provides:

```text
neutral-0
neutral-50
neutral-100
neutral-200
```

for constructing light UI surfaces.

General visual direction:

- light application background;
- white/light cards;
- subtle borders;
- clear content grouping;
- minimal elevation.

Avoid unnecessarily heavy shadows.

Cards should generally feel integrated into the clinical interface rather than
floating dramatically above it.

Exact surface combinations will be defined by approved component and screen
designs.

---

# 16. Component States

Reusable interactive components should consider the following states where
applicable:

```text
default
hover
focus
active
disabled
loading
error
```

Data-driven components should consider:

```text
loading
empty
error
success
```

Offline-aware components may additionally require:

```text
online
offline
pending-sync
synced
conflict
```

Not every component needs every state.

Implement only states that make sense for that component.

---

# 17. Accessibility

Accessibility is part of the design system.

Use semantic HTML.

Prefer:

```text
button       → actions
a / Link     → navigation
NavLink      → application navigation
nav          → navigation areas
main         → primary content
label        → form labels
```

Maintain visible keyboard focus.

Do not communicate important clinical or system information exclusively through
color.

Semantic states should normally combine color with another signal such as:

- text;
- icon;
- label;
- status badge.

---

# 18. Layout Direction

PetCare is currently designed desktop-first.

Priority:

```text
Desktop
↓
Tablet
↓
Mobile
```

Desktop fidelity should not be sacrificed merely to force a mobile-first layout.

At the same time, implementation should avoid unnecessary fixed dimensions that
prevent future responsive adaptation.

Prefer:

- Grid;
- Flexbox;
- min/max constraints;
- responsive containers;
- flexible content areas.

---

# 19. Main Application Structure

The expected application shell is conceptually:

```text
AppLayout
├── Sidebar
├── Header
└── Main
    └── Route Content
```

Exact dimensions and behavior should follow the approved Figma screens.

Do not assume dimensions that have not yet been defined.

---

# 20. Sidebar

The Sidebar is an important part of the PetCare visual identity.

Its final implementation must follow the approved Sidebar Figma reference.

Expected responsibilities may include:

- PetCare branding;
- navigation;
- active route indication;
- quick actions;
- connection/synchronization information;
- current user information;
- secondary/settings actions.

Use React Router `NavLink` for route-based navigation.

The active navigation state should be visually clear and consistent with the
PetCare primary color system.

Do not replace the approved Sidebar design with a generic admin template.

Exact Sidebar dimensions, spacing and component details should follow its Figma
reference once added to the reference directory.

---

# 21. Reusable UI

The design system should progressively support reusable primitives such as:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Card
Badge
Modal
Dialog
Avatar
Spinner
Tooltip
Table
SearchInput
```

These components are not automatically required from day one.

Create them when the application needs them.

Feature components should compose these primitives rather than reimplementing
the same visual rules.

---

# 22. Figma Fidelity Rules

When implementing an approved Figma design:

1. preserve information hierarchy;
2. preserve visual grouping;
3. preserve component proportions;
4. preserve relative spacing;
5. preserve navigation structure;
6. preserve semantic color usage;
7. reuse PetCare design tokens;
8. preserve component states when documented;
9. adapt responsively without redesigning the approved desktop concept.

Do not make major visual changes simply because another pattern is more common
in generic SaaS dashboards.

---

# 23. Missing Design Information

When a required visual value is not documented here and cannot be determined
from an approved Figma reference:

do not silently invent a permanent design token.

Instead:

1. inspect the corresponding Figma reference;
2. inspect existing PetCare implementation;
3. use an existing compatible token if appropriate;
4. ask for clarification when the decision materially affects the design.

Temporary implementation decisions should remain easy to replace.

---

# 24. Current Foundation Status

Defined:

- [x] Brand logo
- [x] Primary color palette
- [x] Neutral color palette
- [x] Semantic colors
- [x] Border widths
- [x] Radius scale
- [x] Spacing scale
- [x] Typography family
- [x] Typography semantic hierarchy

Still to define from Figma:

- [ ] Exact typography sizes
- [ ] Exact typography weights
- [ ] Exact typography line heights
- [ ] Exact typography letter spacing, if used
- [ ] Shadows / elevation
- [ ] Component-specific tokens
- [ ] Button states
- [ ] Input states
- [ ] Sidebar measurements
- [ ] Main application layout measurements
- [ ] Table specifications
- [ ] Form specifications

These values should be added progressively as the corresponding Figma designs
are finalized.
