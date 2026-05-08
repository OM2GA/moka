---
name: Le Moka Aesthetic
colors:
  surface: '#fff8ef'
  surface-dim: '#e1d9cb'
  surface-bright: '#fff8ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3e4'
  surface-container: '#f5edde'
  surface-container-high: '#efe7d9'
  surface-container-highest: '#e9e2d3'
  on-surface: '#1e1b13'
  on-surface-variant: '#504440'
  inverse-surface: '#343026'
  inverse-on-surface: '#f8f0e1'
  outline: '#83746f'
  outline-variant: '#d5c3bd'
  surface-tint: '#7b5647'
  primary: '#32170d'
  on-primary: '#ffffff'
  primary-container: '#4b2c20'
  on-primary-container: '#bf9282'
  inverse-primary: '#ecbcaa'
  secondary: '#7c5639'
  on-secondary: '#ffffff'
  secondary-container: '#fecaa5'
  on-secondary-container: '#795336'
  tertiary: '#2c1b02'
  on-tertiary: '#ffffff'
  tertiary-container: '#433013'
  on-tertiary-container: '#b49872'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ecbcaa'
  on-primary-fixed: '#2e140a'
  on-primary-fixed-variant: '#613e31'
  secondary-fixed: '#ffdcc4'
  secondary-fixed-dim: '#efbc98'
  on-secondary-fixed: '#2f1501'
  on-secondary-fixed-variant: '#613f24'
  tertiary-fixed: '#feddb3'
  tertiary-fixed-dim: '#e1c299'
  on-tertiary-fixed: '#281801'
  on-tertiary-fixed-variant: '#584324'
  background: '#fff8ef'
  on-background: '#1e1b13'
  surface-variant: '#e9e2d3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The design system is built on the sensory experience of a classic mocha cake: layered, rich, and sophisticated yet inherently comforting. It targets an audience that appreciates artisanal quality and refined aesthetics, evoking an emotional response of indulgence and warmth. 

The visual style is a hybrid of **Modern-Minimalism** and **Tactile Softness**. It avoids the clinical coldness of traditional tech interfaces by using a "whipped" visual language—soft elevations, organic curves, and a delicious, high-contrast palette. Every interaction should feel smooth and substantial, mirroring the consistency of a well-made ganache.

## Colors

The palette is derived from the structural layers of a "Le Moka" dessert. 

- **Primary (Espresso Roast):** A deep, rich brown used for primary actions and high-level headings, providing the "bitterness" needed for legibility and grounding.
- **Secondary (Mocha Latte):** A mid-tone warm brown for secondary buttons, active states, and icons.
- **Tertiary (Dusting of Cocoa):** A soft, sandy beige for borders, dividers, and disabled states.
- **Neutral (Heavy Cream):** The base of the interface is a light, warm cream rather than pure white, reducing eye strain and adding to the "bakery" atmosphere.
- **Accents:** Dark chocolate tones are reserved for deep shadows and high-contrast text, while a lighter cream is used for surface highlights.

## Typography

This design system utilizes a "modern-warm" typographic pairing. **Plus Jakarta Sans** provides the geometric clarity of a modern browser (like Google Chrome) but with softened terminals and a friendly, optimistic x-height that suits the food-and-drink inspiration.

**Hanken Grotesk** is used for body copy and UI labels to maintain a professional, sharp edge. It ensures high readability even at small sizes against cream backgrounds. To maintain the "warm" feel, text colors should never be pure black; instead, use the deep primary espresso or cocoa tones for all text elements.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system within a centered container to evoke the organized presentation of a pastry case. 

- **Grid:** A 12-column system with generous 24px gutters.
- **Rhythm:** An 8px linear scale is used for most padding and margins, but 4px "micro-increments" are permitted for tight component internals (like label-to-input spacing).
- **Whitespace:** Emphasize generous vertical breathing room between sections (using `xl` spacing) to mimic the airy texture of a sponge cake.

## Elevation & Depth

Depth in this design system is achieved through **Ambient Shadows** that are tinted with the primary espresso color rather than neutral gray. This creates a "soft-bake" effect where elements appear to rest gently on the cream surface.

- **Surface Levels:** Use three distinct layers. Level 0 is the base cream background. Level 1 (Cards) uses a subtle 1px border in Tertiary beige with a very soft, diffused shadow. Level 2 (Modals/Popovers) features a more pronounced, "fluffy" shadow with a 15% opacity mocha tint.
- **Interactions:** When pressed, buttons should physically "sink" into the surface (reducing shadow and Y-offset) rather than just changing color, reinforcing the tactile nature of the design.

## Shapes

The shape language is consistently **Rounded**. Sharp corners are strictly avoided to ensure the UI feels approachable and soft to the touch. 

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) radius.
- **Containers:** Cards and content blocks use a 1rem (16px) radius to create a distinct, "molded" look.
- **Micro-elements:** Chips and tags should utilize a full pill-shape (circular ends) to contrast with the more structured rectangular cards.

## Components

- **Buttons:** Primary buttons are solid Espresso with Cream text. Secondary buttons use a Mocha outline with a subtle cream fill on hover. All buttons feature a 2px bottom "shadow-border" to give them a physical, cake-like thickness.
- **Input Fields:** Use a light Mocha-tinted background with a subtle inset shadow to appear slightly "recessed." The focus state should be a soft 2px Espresso glow.
- **Cards:** White or very light cream backgrounds with 16px rounded corners. They should have a soft Mocha shadow (`box-shadow: 0 10px 20px -5px rgba(75, 44, 32, 0.1)`).
- **Chips/Tags:** Pill-shaped with a Tertiary beige background and dark Mocha text. Use these for categories or flavor profiles.
- **Progress Bars:** Designed to look like a filling layer. The track is light beige, and the indicator is a rich Chocolate brown with a slight gloss effect.
- **Lists:** Separated by very light, thin Cocoa-tinted dividers (opacity 10%) to maintain a clean but warm structure.