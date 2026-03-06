# Solar Camping Tent

## Current State
New project. No existing frontend or backend code.

## Requested Changes (Diff)

### Add
- Full ecommerce homepage for a product called "Solar Camping Tent"
- 9 distinct page sections (Hero, Benefits, How It Works, Gallery, Testimonials, Pricing, FAQ, Newsletter, Footer)
- Nature-inspired design system: deep greens, earthy tones, warm amber accents
- Mobile-responsive layout throughout
- Newsletter form with UI-only success simulation (email not enabled)
- Pricing tiers: Solo, Duo, Family with feature lists and CTAs
- FAQ accordion with 6-8 questions
- Product image gallery with outdoor photography placeholders
- Customer testimonials with star ratings

### Modify
- None (new project)

### Remove
- None (new project)

## Implementation Plan

### Backend
- Minimal Motoko backend to support the static homepage (no dynamic data required)
- Newsletter signup handler: stores email submissions in-memory (UI will simulate success without real email)

### Frontend Sections
1. **Navbar**: Logo, nav links (Features, How It Works, Gallery, Pricing, FAQ), sticky header
2. **Hero**: Full-width dramatic background image, headline, subheadline, two CTAs ("Shop Now" primary, "Buy Solar Tent" secondary)
3. **Benefits Grid**: 6 benefit cards with icons -- Built-in Solar Panels, Weather Resistant, 60-Second Setup, USB-C Charging, Ultra-Lightweight, Off-Grid Power
4. **How It Works**: 3-step horizontal stepper infographic -- Collect, Store, Power
5. **Product Gallery**: Responsive masonry/grid gallery with 6 outdoor placeholder images
6. **Testimonials**: 3-4 cards with avatar, name, rating stars, quote
7. **Pricing**: 3 tier cards (Solo $299, Duo $449, Family $599), Duo highlighted as recommended
8. **FAQ**: Accordion with 7 questions and answers
9. **Newsletter**: Email input + submit, success state shown inline
10. **Footer**: Logo, nav columns, social icons, copyright

### Assets
- Hero background: dramatic outdoor/mountain camping scene
- Gallery images: tent in various outdoor settings (mountain, forest, desert, lake)
- Generated via image generation tool
