---
# gstack: design-md-format=spec
name: TwistedVis Portfolio
description: A dark, tactile, asymmetric maintainer's workbench for systems with personality.
colors:
  primary: "#AEBEFF"
  on-primary: "#0B0E17"
  surface: "#131827"
  text: "#F4F8FF"
  text-muted: "#AEB8CC"
  accent: "#F0B95C"
  success: "#7BD7B2"
  warning: "#F0B95C"
  error: "#F07C68"
typography:
  display:
    fontFamily: "Cabinet Grotesk"
    fontWeight: 800
    fontSize: "clamp(3.4rem, 10vw, 9rem)"
    letterSpacing: "-0.065em"
  body:
    fontFamily: "General Sans"
    fontSize: 1rem
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono"
    fontSize: 0.7rem
    letterSpacing: 0.04em
  mono:
    fontFamily: "JetBrains Mono"
    fontFeature: tnum
rounded:
  sm: 3px
  md: 7px
  lg: 14px
  full: 9999px
spacing:
  base: 8px
  section: clamp(5rem, 11vw, 11rem)
  contentMax: 1280px
motion:
  easing: "cubic-bezier(0.2, 0.75, 0.2, 1)"
  duration: 220ms
---

## Direction

The portfolio is a maintainer's workbench: part Android repair bench, part independent software studio, part field notebook for things that boot, break, and become better. The page should make visitors think: “This feels like a real person's workshop, and I want to inspect what is running.”

## Composition

Use an asymmetric editorial canvas with a persistent practical header, a poster-like hero, and full-width project work surfaces. Projects are a connected maintenance map rather than a 3-column grid. The page sits over a fixed DeBug-inspired constellation of geometric particles and connecting lines. Solid panels, rule lines, device traces, and hard offsets provide depth. No glow, decorative blobs, or nested card stacks.

## Typography

Cabinet Grotesk is the display voice, verified from Fontshare for 700 and 800. General Sans handles body copy and controls. JetBrains Mono handles repository names, status values, dates, and system annotations. Load all three with `font-display: swap`.

## Color and material

The base is near-black (`#0B0E17`) with a raised slate surface (`#131827`). Nebula blue (`#AEBEFF`) marks active paths and links; signal ochre (`#F0B95C`) calls attention to state; circuit red (`#F07C68`) is reserved for selected warnings. Surfaces are translucent enough to let the ambient constellation pass through, with hairline slate rules and offset shadows.

## Motion

Motion is expressive but functional: a fixed canvas constellation of geometric particles and connecting lines, pointer attraction and tap ripples, a scroll progress line, a hero trace that routes through real system layers, project surfaces that settle into place, and a cursor field that reacts only on pointer-fine devices. The canvas pauses when hidden and has a static fallback. `prefers-reduced-motion` disables Lenis, looping trace animation, particle movement, ripples, cursor motion, and reveal transitions.

## Deliberate risks

1. **Bootable hero:** the first interaction feels like inspecting a live system, not scanning a resume. It gains memorability and technical specificity; it costs a little initial visual density.
2. **Maintenance map:** experience and projects share one continuous section, showing the ecosystem between internship, release tooling, cybersecurity, Linux, and device work. It gains a stronger story; it costs the familiar project-card grid.

## Avoid

Purple gradients, centered-everything, generic SaaS feature cards, fake metrics, emoji UI, glowing edges, oversized poster type past what the layout can support, and copy that claims anything not verified in `docs/research.md` or supplied in the brief.
