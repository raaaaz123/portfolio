---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 9 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient."
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications with 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 technology stacks.

## Key Capabilities

**When to Use**: Invoke this skill for UI structure, visual design decisions, interaction patterns, or UX quality control tasks.

**Must Use For**:
- Designing new pages and components
- Selecting color schemes, typography, spacing, or layouts
- Reviewing UI code for accessibility and consistency
- Implementing navigation, animations, or responsive behavior
- Making product-level design decisions

**Skip For**: Pure backend logic, API/database design, performance unrelated to interfaces, infrastructure work, or non-visual automation.

## Priority-Based Rule Categories (1-10)

1. **Accessibility** (CRITICAL) — Contrast 4.5:1, keyboard navigation, alt text, ARIA labels
2. **Touch & Interaction** (CRITICAL) — 44×44px minimum, 8px spacing, loading feedback
3. **Performance** (HIGH) — WebP/AVIF, lazy loading, CLS < 0.1, virtualized lists
4. **Style Selection** (HIGH) — Match product type, consistency, SVG icons (no emoji)
5. **Layout & Responsive** (HIGH) — Mobile-first, viewport meta, no horizontal scroll
6. **Typography & Color** (MEDIUM) — 16px base, 1.5 line-height, semantic tokens
7. **Animation** (MEDIUM) — 150–300ms duration, transform/opacity only, meaningful motion
8. **Forms & Feedback** (MEDIUM) — Visible labels, error placement, progressive disclosure
9. **Navigation Patterns** (HIGH) — Predictable back, ≤5 bottom nav items, deep linking
10. **Charts & Data** (LOW) — Match type to data, accessible colors, legends visible

## How to Use

### Step 1: Analyze Requirements
Extract product type, target audience, style keywords, and technology stack from user request.

### Step 2: Generate Design System (REQUIRED)

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system [-p "Project Name"]
```

Always start with `--design-system` to get comprehensive recommendations with reasoning rules. This returns pattern, style, colors, typography, effects, and anti-patterns.

**Persist design system** for hierarchical retrieval:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Creates `design-system/MASTER.md` and `design-system/pages/` for page-specific overrides.

### Step 3: Supplement with Domain Searches

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**Available domains**: product, style, typography, color, landing, chart, ux, google-fonts, react, web, prompt.

### Step 4: Stack Guidelines

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack react-native
```

## Available Stacks

- React Native (components, navigation, lists)

## Output Formats

```bash
# ASCII box (default)
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system

# Markdown
python3 skills/ui-ux-pro-max/scripts/search.py "fintech crypto" --design-system -f markdown
```

## Common Professional UI Issues

**Icons & Elements**: No emoji icons; use SVG/vector assets; stable interaction states without layout shifts; consistent sizing and stroke width; 44×44pt touch targets; proper contrast.

**Interaction**: Tap feedback within 80–150ms; 150–300ms animations; accessible screen reader focus; semantic native controls; ≥44×44pt touch areas.

**Light/Dark Mode**: 4.5:1 primary text contrast in both modes; 3:1 secondary text; distinguishable dividers and states; 40–60% modal scrim; test both themes.

**Layout**: Respect safe areas; prevent scroll content obscuration; test small phone, large phone, tablet, portrait and landscape; 4/8dp spacing rhythm; readable text measure on larger devices.

## Pre-Delivery Checklist

✓ No emoji icons; consistent icon family
✓ Tappable elements provide pressed feedback
✓ Touch targets ≥44×44pt
✓ Micro-interactions 150–300ms with native easing
✓ Contrast ≥4.5:1 (primary) and ≥3:1 (secondary) in both modes
✓ Safe areas respected; no scroll content hidden
✓ Verified on small phone, large phone, tablet (portrait + landscape)
✓ 4/8dp spacing consistency; readable text measure
✓ Accessibility labels, form hints, color not sole indicator
✓ Reduced motion and Dynamic Type supported

---

**Prerequisites**: Python 3 required. Install via `brew install python3` (macOS), `sudo apt install python3` (Ubuntu/Debian), or `winget install Python.Python.3.12` (Windows).
