# Copilot Instructions for meme-render

## Project Overview

- This is a Vite + React + TypeScript app for generating images using the Echo React SDK.
- Main entry: `src/App.tsx` sets up the EchoProvider and renders the dashboard UI.
- Core feature: authenticated users can generate images via the OpenAI model through Echo.

## UI Architecture & Patterns

- Components are organized in `src/components/`, with UI primitives in `src/components/ui/` (e.g., `avatar.tsx`, `popover.tsx`, `tooltip.tsx`, `skeleton.tsx`, `input.tsx`).
- Use Tailwind CSS for styling. Custom colors and themes are defined in `src/index.css`.
- Utility function `cn` (in `src/lib/utils.ts`) merges class names using `clsx` and `tailwind-merge`.
- Buttons use the `Button` component (`echo-button.tsx`) with variants for different styles (see `buttonVariants`).
- Currency formatting uses `formatCurrency` from `src/lib/currency-utils.ts`.
- Most UI elements support dark mode via Tailwind and CSS variables.

## Developer Workflows

- **Start dev server:** Use `bun run dev` (see README; if using pnpm, use `pnpm dev`).
- **Install dependencies:** Use `bun install` or `pnpm install`.
- **Build:** Use `bun run build` or `pnpm build`.
- **No test suite is present** (as of this snapshot).
- **Debugging:** Use browser devtools; React components are function-based and use hooks.

## Integration Points

- Echo React SDK (`@merit-systems/echo-react-sdk`) is the main external dependency for authentication, user info, and image generation.
- OpenAI image generation is accessed via Echo model providers.
- Payment/top-up flows use Echo's `createPaymentLink` and open a popup or new tab for payments.
- UI primitives use Radix UI (`@radix-ui/react-*`) for popover, tooltip, avatar, etc.
- Money input uses `autonumeric` for formatting.

## Project-Specific Conventions

- All components use Tailwind classes and the `cn` utility for styling.
- Button variants and sizes are standardized via `class-variance-authority` (see `echo-button.tsx`).
- User/account info is shown in the header and popover, with balance and top-up integrated.
- Free credits are visually indicated with a gift icon and tooltip.
- All popovers/tooltips use Radix UI and are styled with Tailwind.
- Dark mode is supported and toggled via CSS classes.

## Examples

- To add a new UI component, place it in `src/components/` or `src/components/ui/` and use Tailwind for styling.
- To add a new button style, extend `buttonVariants` in `echo-button.tsx`.
- For currency display, use `formatCurrency(value)`.

## Key Files

- `src/App.tsx`: App entry, EchoProvider, dashboard layout
- `src/components/ImageGeneration.tsx`: Main image generation logic
- `src/components/echo-account.tsx`, `echo-popover.tsx`: User/account UI
- `src/components/echo-button.tsx`: Button component and variants
- `src/lib/utils.ts`: Class name utility
- `src/index.css`: Tailwind and theme setup

---

For more details, see the README or explore the components in `src/components/`.
