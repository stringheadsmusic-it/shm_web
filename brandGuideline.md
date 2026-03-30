# String Heads Music: Design System Document

## 1. Overview & Creative North Star: "The Resonant Stage"
The creative north star for String Heads Music is **"The Resonant Stage."** This system moves beyond static grids to mimic the feeling of a premium, dimly lit performance hall. We evoke the rhythmic vibration of strings and the deep, tonal warmth of acoustic instruments through a "No-Line" editorial approach.

To achieve a bespoke, high-end feel, we reject "boxy" web standards. Instead, we use **intentional asymmetry**, **overtapping layers**, and **tonal depth** to create a rhythmic flow. The UI should feel like it is breathing—elements shouldn't just sit on a page; they should occupy a physical, three-dimensional space defined by light and shadow.

---

## 2. Colors & Surface Philosophy
The palette is rooted in deep obsidian tones with the warmth of #CC7722 (Burnt Orange) acting as the "ignition point" for user interaction.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To define boundaries, use shifts in background color or subtle tonal transitions.
- **Sectioning:** Place a `surface_container_low` section directly onto a `background` floor.
- **Separation:** Use a `surface_container_highest` element to pull focus from a `surface_dim` base.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, premium materials.
- **Base Layer:** `surface` (#131313) or `surface_container_lowest` (#0e0e0e).
- **Secondary Layer:** `surface_container` (#201f1f) for main content areas.
- **Interaction Layer:** `surface_bright` (#393939) for elevated interactive components.

### The "Glass & Gradient" Rule
To avoid a flat "template" look:
- **Floating Elements:** Use `surface_variant` at 60% opacity with a `24px` backdrop blur to create a "frosted glass" effect for navigation bars and overlays.
- **Signature Gradients:** For primary CTAs, transition from `primary` (#ffb77c) to `primary_container` (#d27c27) at a 135-degree angle to provide a metallic, rhythmic "glow" reminiscent of brass and copper strings.

---

## 3. Typography: The Editorial Rhythm
We use a tri-font system to establish a professional yet rhythmic hierarchy.

* **Display & Headlines (Epilogue):** This is our "Lead Instrument." Epilogue’s geometric but soulful construction should be used for large, impactful statements. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create a premium editorial feel.
* **Titles & Body (Manrope):** Our "Rhythm Section." Manrope provides high legibility and a modern, professional tone. Use `body-lg` (1rem) for long-form content to ensure the "String Heads Music" voice remains sophisticated.
* **Labels & Technicals (Space Grotesk):** The "Metronome." Space Grotesk’s monospaced influence is perfect for `label-md` metadata (track lengths, dates, pricing), adding a precise, technical edge to the organic layouts.

---

## 4. Elevation & Depth: Tonal Layering
We do not use structural lines. Depth is achieved through the **Layering Principle**.

* **Tonal Stacking:** Place a `surface_container_high` card on a `surface_container_low` background. The shift in value creates a natural "lift" without the clutter of a stroke.
* **Ambient Shadows:** If an element must "float" (e.g., a music player bar), use a highly diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow should never be pure black; it should feel like an occlusion of the `on_surface` light.
* **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline_variant` at **15% opacity**. It should be felt, not seen.
* **Motion as Depth:** Elements should enter the stage with a staggered "rhythmic" fade-in, moving 10px upward to simulate being placed on a surface.

---

## 5. Components

### Buttons & Interaction
* **Primary:** A gradient-fill using `primary` to `primary_container`. No border. Roundedness: `md` (0.375rem).
* **Secondary:** `surface_bright` background with `on_surface` text. This creates a subtle "button-on-dark" look.
* **Tertiary:** Purely typographic using `primary` color and `label-md` styling, with a subtle underline that appears only on hover.

### Cards & Music Lists
* **Forbid Dividers:** Do not use 1px lines between list items. Use the **Spacing Scale** (specifically `spacing-4` or `1.4rem`) to create clean, breathable gaps.
* **Active State:** An active list item (e.g., a playing track) should use `surface_container_highest` with a `primary` left-accent indicator (2px wide).

### Inputs & Forms
* **Fields:** Use `surface_container_low` for the input track. No bottom border. On focus, the background shifts to `surface_container_high` with a subtle `primary` glow (2px outer blur).
* **Labels:** Always use `spaceGrotesk` for input labels to emphasize the professional, technical nature of the brand.

### Specialized Components: The "String Heads" Player
* **Waveform Seekbar:** Use `primary` for the played portion and `outline_variant` at 30% for the remaining track.
* **Floating Playback Bar:** Apply the **Glassmorphism Rule**—a `surface_container` background at 80% opacity with a `blur(12px)` effect, anchored to the bottom with no visible top border.

---

## 6. Do’s and Don'ts

### Do:
* **Do** embrace negative space. Use `spacing-12` (4rem) and `spacing-16` (5.5rem) to let high-end photography and typography breathe.
* **Do** use asymmetrical layouts. Offset text blocks from images to create a "syncopated" visual rhythm.
* **Do** use `primary` (#CC7722/Burnt Orange) sparingly—it is the spotlight, not the stage light.

### Don't:
* **Don't** use 1px solid borders to separate content. This breaks the "premium" immersion.
* **Don't** use pure black (#000000) for backgrounds. Stick to the `surface` tokens to maintain tonal depth.
* **Don't** use standard "drop shadows." Only use ambient, low-opacity occlusions.
* **Don't** crowd the interface. If it feels busy, increase the spacing by two increments on the scale.