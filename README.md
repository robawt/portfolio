# [Your Name] — Portfolio

A React + Vite portfolio with scroll-linked animation, a 3D hero shape, and a custom cursor.

## Stack
- **Vite + React**
- **Framer Motion** — scroll-linked parallax, staggered text reveal, the horizontal "Moments" gallery
- **React Three Fiber + Drei** — the distorted wireframe shape in the hero, reacts to mouse movement
- **Lenis** — smooth scrolling

## Run it locally
```bash
npm install
npm run dev
```
Then open the local URL it prints (usually `http://localhost:5173`).

## Build for deployment
```bash
npm run build
```
This outputs a static site to `dist/`. Deploy that folder to:
- **Vercel / Netlify** — connect the repo, they auto-detect Vite
- **GitHub Pages** — push `dist/` contents to a `gh-pages` branch, or use the `gh-pages` npm package

## Retro elements added
- `Marquee.jsx` — scrolling ticker banners (yellow one after the gallery, reversed blue one after the project index)
- `Blinkies.jsx` — old-web style badges with blinking borders
- `VisitorCounter.jsx` — retro LCD hit-counter with a count-up animation on load
- `Guestbook.jsx` — decorative guestbook section combining the above two plus fake entries
- `CursorTrail.jsx` — canvas particle trail in blue/yellow following your mouse
- `ScanlineOverlay.jsx` — subtle CRT scanline texture over the whole page
- Retro pixel font (`Press Start 2P`) used for badges/tickers only — body copy stays in the modern faces so it's still readable

## Your assets, and where they went
- `mark-a-transparent.png` — your monogram, color-keyed to a real transparent PNG: the favicon, nav logo, and a slow-rotating watermark in Contact
- `mark-rotate.mp4` — the rotating 3D render of the mark: powers `RotatingMark.jsx`, a full section where **scrolling scrubs the video's playback position** — same technique Apple/Lando use for scroll-controlled rotation
- `wave-lines.png` — parallax background behind Ambition, and the hidden layer revealed by the cursor blob effect
- `poster.png` — full-bleed background for `Interlude.jsx`
- Your signature (`signature-source.svg`) — see below

## What changed in this pass

**Signature — now a real vector draw-on.** Your SVG gave real path data, so `Signature.jsx` now traces the actual stroke (via Framer Motion's `pathLength`) instead of the old raster wipe-reveal. This is the genuine Lando-style pen-drawing effect. Source SVG kept at `src/lib/signature-source.svg`.

**Scroll pacing fixes:**
- `Moments`: the horizontal gallery was tied to a scroll container the same height as one screen, so it panned past too fast. It's now a dedicated tall track (220vh) decoupled from the header above it.
- `RotatingMark`: extended to 280vh for finer-grained scroll control over the rotation.
- `Ambition`: converted from a fixed-duration animation to a **true scroll-scrubbed** word reveal — the pace now always matches how fast you actually scroll, so it can't feel "too fast or too slow" regardless of scroll speed.
- `Hero`: softened the fade-out curve so content doesn't feel like it vanishes within one scroll.
- Both marquees are now on a slower, matched 34s loop.

**Removed AI-slop artifacts:**
- The nav logo, contact watermark, and rotating video previously relied on CSS blend modes (`difference`/`lighten`) to fake transparency over solid-color image backgrounds — this produced muddy, unintentional-looking color artifacts. The logo mark is now a properly color-keyed transparent PNG (`mark-a-transparent.png`); the rotating video sits in a clean bordered frame with corner ticks instead.
- Removed the cursor sparkle-trail — running a sparkle trail *and* a ring cursor *and* a mouse-reveal effect simultaneously was cursor-effect overload. The new blob reveal (below) replaces it.
- Reordered sections to group by tone: personal/playful content (Moments, Guestbook) together, professional content (Index, Interlude) together, ending on Ambition before Contact rather than closing on a joke.

**New: cursor blob reveal.** `BlobReveal.jsx` — a soft-edged circle follows your cursor (with gentle lag) and reveals your wave-line graphic hidden beneath the page's normal background, only inside that radius. This is the Lando Norris-style "hidden art revealed by the cursor" effect, done via a CSS `mask-image` radial gradient rather than anything heavier. Automatically disabled on touch/mobile since there's no cursor to track.

## What changed in this pass (round 3)

**Fixed the real bug behind "broken" scroll animations.** Lenis was running its own independent `requestAnimationFrame` loop, completely separate from Framer Motion's internal frame scheduler — every frame, both were racing to read/write scroll position, and whichever ran first read a one-frame-stale value from the other. That's what was showing up as jittery/laggy/broken scroll-linked animation. Fixed in `lib/useLenis.js` by syncing Lenis into Framer Motion's own `frame` loop (the officially recommended integration pattern) instead of a separate rAF loop. Also removed `<React.StrictMode>`, which double-invokes effects in dev and was spinning up two overlapping Lenis instances momentarily.

**Signature — now shows at both landing and Contact,** centered instead of left-aligned. `Signature.jsx` takes a `trigger` prop (`'mount'` for the hero, `'inView'` default for Contact) and is centered by default via `margin: 0 auto` + centered flex children.

**Bigger creative pass, since you gave the green light:**
- `ScrollProgress.jsx` — thin progress bar across the top of the whole page, spring-smoothed
- `ChapterTag.jsx` — small "01 / 08" style numbering on every major section, editorial-magazine touch that ties the whole scroll into one journey
- `TiltCard.jsx` — the Moments gallery cards now tilt in 3D toward your cursor on hover (mouse-relative rotateX/rotateY with spring physics)
- Hero now has three faint parallax typographic accents ("BUILD" / "CREATE" / "SHIP") drifting at different depths as you scroll — cheap to render, adds real depth

## What changed in this pass (round 4 — the real fix + redesign)

**A second, real scroll bug, found and fixed.** The Lenis/Framer sync fix from last round was correct and still holds — verified again with zero console errors and monotonic scroll in an automated headless-browser test. But there was a **second, independent bug**: Framer Motion's `useScroll` defaults to offset `["start start", "end end"]`, which only produces a meaningful progress range when the target element is much taller than the viewport. For `Ambition` and `Interlude` — both roughly one viewport tall — that range collapses to almost nothing, so `scrollYProgress` jumped from 0 to 1 almost instantly and then sat at 1 for the rest of the time the section was visible. That's exactly what "still broken" looks like on those two sections specifically. Confirmed by reading Framer Motion's actual source (`node_modules/framer-motion/.../offsets/presets.mjs`) rather than guessing, and fixed by giving both an explicit `offset: ['start end', 'end start']`, which spans the section's entire time on screen instead of collapsing.

Verified via an automated headless-browser pass (Playwright) rather than just re-reading code: loaded the real dev build, drove it with actual wheel events (not just programmatic scrollTo), confirmed zero runtime errors and smooth monotonic scroll progression, and screenshotted every major section to check for layout breakage.

**Redesign — pulled back toward genuine Lando-style minimalism.** The retro layer (marquees, blinkie badges, hit counter, guestbook, scanlines, pixel font) was fighting against the cinematic-minimal look you actually wanted, so it's gone. In its place:
- Every section is now centered — text, imagery, signature, everything
- A cursive script accent (`Yellowtail`, similar spirit to the Vice City wordmark) used sparingly as hand-written-feeling flourishes next to headlines ("hey, it's me", "a few", "always") — decorative, not structural
- `CircleStamp.jsx` — rotating circular badge text (like a seal/stamp), placed in the hero and footer to fill corner space with something purposeful instead of empty
- `Watermark.jsx` — large outlined background text behind section content (PORTFOLIO, WORK, AMBITION, THANKS) for visual density without adding noise
- Index now pairs each project with a real image swatch instead of plain text rows
- Nav logo now a properly transparent PNG, no more blend-mode artifacts

## What changed in this pass (round 5 — spacing and layout pass)

Went through every component looking for actual spacing bugs rather than guessing:

**Real bugs found and fixed:**
- `ChapterTag` was still referencing a `.pixel` CSS class that got deleted in the retro-removal pass — it was silently falling back to the browser default font. Also sat at `top: 2rem` inside every section, which collided with the fixed nav bar every time a new section reached the top of the viewport. Fixed the class and moved it to `top: 6.5rem` to clear the nav.
- In **Index** and **Interlude**, the eyebrow label and the heading directly below it had zero gap between them — they were touching. Added proper margin.
- In **Interlude** and **Moments**, the cursive accent word was positioned with a bigger negative offset than the gap available, so it was overlapping the eyebrow above (Interlude) or the paragraph below (Moments). Fixed by matching the offsets to the actual available space.
- **Contact** stacked the cursive line right under a 9rem headline with only 0.5rem of margin — way too tight for that size jump. Increased breathing room throughout that whole stack, and moved the circular stamp out of the vertical flow into a corner accent instead of piling it on top of the signature.
- **Hero** had the same eyebrow-touching-headline issue, and its background watermark text was overlapping the corner stamp — removed the watermark there since Hero already has the 3D scene, floating type, and stamp competing for attention.

**Pacing (the "empty" scroll stretches):**
- `RotatingMark`: 280vh → 210vh
- `Moments` horizontal gallery: 220vh → 175vh

Total page height dropped from ~9977px to ~8464px — tighter without losing any content.

## What to customize first
- `src/components/Hero.jsx` — your name, tagline
- `src/components/Moments.jsx` — replace the gradient blocks' `background` with real photos (`background-image: url(...)`), update captions
- `src/components/Index.jsx` — your real projects
- `src/components/Ambition.jsx` — your own sentence; the highlighted word index is set in the file
- `src/components/Contact.jsx` — real email/social links
- `src/index.css` — the `:root` variables control the whole palette

## Notes
- Custom cursor is disabled on screens under 900px (mobile) since there's no mouse to track.
- The 3D shape is intentionally subtle (`opacity: 0.55`, wireframe) so it doesn't fight with the text — turn `wireframe` off in `HeroScene.jsx` for a solid, heavier look if you want.
