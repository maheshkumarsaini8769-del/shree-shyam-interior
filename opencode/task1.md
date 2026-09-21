==========================================================
ADVANCED CINEMATIC SCROLL + ZOOM MOTION SYSTEM
==========================================================

IMPORTANT:

The website must feel like a premium modern architecture/interior-design
website with cinematic motion.

Animations must enhance the content, NOT distract from it.

The experience should feel smooth, expensive and professional.

Do NOT make it look like a gaming website.
Do NOT use excessive 3D.
Do NOT animate everything simultaneously.

==========================================================
1. SMOOTH SCROLL ENGINE
==========================================================

Implement premium smooth scrolling.

Preferred:

Lenis + Framer Motion

or

Lenis + GSAP ScrollTrigger

Scrolling should feel:

- smooth
- slightly cinematic
- responsive
- natural
- touch friendly

Desktop:
smooth wheel scrolling.

Mobile:
DO NOT interfere with native touch scrolling.

Use native mobile touch behavior where necessary.

Respect:

prefers-reduced-motion

If the user has reduced motion enabled,
disable intensive animations.

==========================================================
2. CINEMATIC HERO ZOOM
==========================================================

Hero image should have a cinematic zoom effect.

Initial:

scale(1.08)

During page load:

1.08 → 1.00

Duration:

1.5–2 seconds

At the same time:

heading:
opacity 0 → 1
translateY(30px) → 0

description:
opacity 0 → 1
translateY(20px) → 0

CTA:
opacity 0 → 1
translateY(20px) → 0

Use staggered timing.

The hero should feel like a premium architecture film opening.

==========================================================
3. HERO SCROLL PARALLAX
==========================================================

While scrolling through the hero:

Background image:
moves slightly slower than page

Foreground content:
moves slightly faster

Example:

image:
translateY(-5% to -12%)

content:
translateY(-15% to -25%)

Do NOT exaggerate.

The user should notice the depth,
but the effect should remain elegant.

==========================================================
4. HERO ZOOM-OUT INTO NEXT SECTION
==========================================================

As the user scrolls out of the hero:

hero image should subtly scale:

1.00 → 0.94

while the hero container slightly compresses.

Next section gradually becomes visible.

Create a cinematic transition:

Hero
↓
Stats

without sudden section jumping.

Use ScrollTrigger if available.

==========================================================
5. TEXT SPLIT REVEAL
==========================================================

Large headings should use split-text animation.

Example:

Transforming Spaces
Into
Better Living

Words should reveal sequentially.

Animation:

opacity:
0 → 1

translateY:
40px → 0

Use stagger:

0.05–0.08 sec

Only use this for:

hero headings
major section headings
important CTA headings

Do NOT apply it to every paragraph.

==========================================================
6. IMAGE MASK REVEAL
==========================================================

When an image enters viewport:

image container starts clipped.

Example:

clip-path:
inset(0 100% 0 0)

Then smoothly reveals:

clip-path:
inset(0 0 0 0)

At the same time:

image scale:

1.08 → 1

Duration:

0.8–1.2 sec

Use different reveal directions occasionally:

left → right
right → left
bottom → top

Do NOT randomly change every image.

==========================================================
7. SCROLL IMAGE PARALLAX
==========================================================

Large project images should have subtle parallax.

Image movement:

translateY(-5% to +5%)

while container remains fixed.

This should create a premium photography feeling.

Especially apply to:

Featured Projects
Showroom
Site Visit
AI Room Designer

==========================================================
8. STICKY STORYTELLING SECTION
==========================================================

Create a premium storytelling section for:

"Visualize Your Dream Space"

On desktop:

left side:
sticky image

right side:
scrolling content

As user scrolls:

Step 01:
Choose Room

Step 02:
Choose Style

Step 03:
Choose Materials

Step 04:
Set Budget

Step 05:
Preview Design

The sticky image changes/transforms between steps.

On mobile:

convert this into:

horizontal swipe storytelling

or

stacked cards with scroll-triggered image changes.

==========================================================
9. BEFORE / AFTER INTERACTION
==========================================================

Create a high-quality before/after comparison.

Default divider:

50%

User can drag divider.

Mobile:

finger drag

Desktop:

mouse drag

Add:

Before
After

labels.

The divider handle should have:

white circular button
subtle shadow
left/right arrow

While dragging:

images should remain perfectly synchronized.

Add a subtle zoom effect while dragging:

scale:
1.00 → 1.02

==========================================================
10. PROJECT CARD IMAGE ZOOM
==========================================================

When project cards enter viewport:

image:

scale(1.05) → 1

When user touches/clicks:

image:

scale(1.04)

Card itself:

translateY(-3px)

Desktop hover only.

On mobile:

use active/press state instead of hover.

==========================================================
11. HORIZONTAL SCROLL SECTIONS
==========================================================

For:

Product Categories
Featured Projects
Testimonials
Brands

Use touch-friendly horizontal scrolling.

Important:

Do NOT show a traditional ugly scrollbar.

Add subtle visual indication that more content exists.

Example:

partial next card visible.

This tells the user:

"Swipe →"

without adding unnecessary text.

==========================================================
12. SCROLL-TRIGGERED NUMBER COUNTERS
==========================================================

Stats:

15+
500+
25+
100%

Initially:

0

When section enters viewport:

animate to final value.

Duration:

1.2 sec

Use easing.

Only trigger once.

==========================================================
13. PREMIUM BUTTON MOTION
==========================================================

Buttons should have micro-interactions.

Normal:

static

Hover desktop:

translateY(-2px)

Arrow:
translateX(4px)

Press mobile:

scale(0.97)

Release:

scale(1)

CTA button can have subtle shine sweep:

left → right

BUT:

shine animation should occur only occasionally.

Do not continuously flash the button.

==========================================================
14. MAGNETIC BUTTONS
==========================================================

Desktop only.

For major CTA buttons:

Get Free Consultation
Start Designing
Book Site Visit

Create subtle magnetic cursor attraction.

Maximum movement:

6–10px

Mobile:

disable magnetic behavior.

==========================================================
15. DESKTOP CURSOR EFFECT
==========================================================

Desktop only.

Create a very subtle custom cursor interaction.

Normal:

small circular cursor.

When hovering:

CTA:
cursor expands slightly

Image:
cursor shows "VIEW"

Project:
cursor shows "OPEN"

Gallery:
cursor shows "DRAG"

Do NOT use a huge custom cursor.

Mobile:
disable completely.

==========================================================
16. 3D CARD TILT
==========================================================

For selected premium cards only:

AI Designer
Cost Estimate
Featured Project

Desktop:

slight 3D tilt based on mouse position.

Maximum:

rotateX:
±3deg

rotateY:
±3deg

Mobile:

disable.

Do NOT use 3D tilt on every card.

==========================================================
17. IMAGE DEPTH EFFECT
==========================================================

For major hero/project images:

create subtle depth layers.

Background:
slow movement

Image:
medium movement

Text:
slightly faster movement

This creates a cinematic depth effect.

Do NOT create fake floating 3D objects.

==========================================================
18. NAVBAR TRANSFORMATION
==========================================================

At page top:

transparent header.

After approximately 50–100px scroll:

header becomes:

solid background
backdrop blur
small shadow
compact height

Animation:

height
background
blur
box-shadow

smoothly transition.

When scrolling downward:

header may reduce slightly.

When scrolling upward:

header becomes more visible.

Do not hide navigation unexpectedly on mobile.

==========================================================
19. SECTION TRANSITION
==========================================================

Sections should not feel like disconnected blocks.

Use subtle visual transitions:

dark → light
light → dark
image → content

Example:

Hero:
dark

Stats:
dark

Explore:
light

AI Designer:
dark

Projects:
light

Site Visit:
dark

Testimonials:
light

This creates visual rhythm.

Use curved/organic transitions only where they improve the design.

Avoid excessive waves.

==========================================================
20. SCROLL PROGRESS
==========================================================

Add a very thin scroll progress indicator.

Desktop:

top of viewport.

Mobile:

can be integrated subtly below header.

Progress:

0% → 100%

Use accent color.

Do not make it thick.

==========================================================
21. SECTION ACTIVE INDICATOR
==========================================================

For long storytelling areas:

detect current section.

Update indicator.

Example:

01 — Explore
02 — Design
03 — Projects
04 — Visit

Active item:

accent color.

Inactive:

muted.

Smooth transition.

==========================================================
22. IMAGE FULLSCREEN VIEWER
==========================================================

Every major project image must support fullscreen viewer.

Open:

scale + fade animation.

Viewer:

black/dark background.

Features:

- pinch zoom
- double tap zoom
- drag
- swipe
- next
- previous
- close
- image counter

Example:

03 / 12

When viewer opens:

LOCK BODY SCROLL.

When closed:

restore previous scroll position.

==========================================================
23. ADVANCED PINCH ZOOM
==========================================================

Mobile image viewer must support:

pinch-to-zoom.

Minimum:

1x

Maximum:

4x

Double tap:

1x → 2x

Second double tap:

2x → 1x

When zoomed:

user can drag image.

When image reaches edge:

allow normal swipe to next image.

Do not create accidental page scrolling.

==========================================================
24. PROJECT GALLERY CINEMATIC TRANSITION
==========================================================

When opening a project:

selected image should visually expand into fullscreen gallery.

Use:

shared layout / FLIP-style transition

if technically possible.

Example:

thumbnail

↓

expands smoothly

↓

fullscreen image

This should feel premium.

==========================================================
25. PAGE TRANSITIONS
==========================================================

React Router page navigation should have subtle transitions.

Example:

Home
→
Projects

Old page:

opacity 1 → 0

New page:

opacity 0 → 1

Use slight vertical movement:

translateY(10px)

Do NOT use long transitions.

Maximum:

300–500ms.

==========================================================
26. AI DESIGN LOADING ANIMATION
==========================================================

When AI Design is generating:

Do NOT simply show:

"Loading..."

Create premium progress experience:

Analyzing room
↓
Understanding layout
↓
Applying style
↓
Selecting materials
↓
Preparing concept

Use animated progress indicator.

If real API is unavailable:

use a clearly mock/demo state.

Never claim fake AI processing is real.

==========================================================
27. COST CALCULATOR ANIMATION
==========================================================

When user changes:

Area
Property Type
Style
Budget

Estimated cost should update smoothly.

Example:

₹2,40,000

number transitions to:

₹2,65,000

Use animated number interpolation.

Breakdown bars should animate:

Material
Labour
Design
GST

When results appear:

cards reveal sequentially.

==========================================================
28. BRAND MARQUEE
==========================================================

Brand logos move horizontally at a slow speed.

Direction:

left → right

or

right → left

Pause when user interacts.

On mobile:

allow manual horizontal swipe.

Do not make logos too large.

Do not invent brand relationships.

==========================================================
29. MOBILE BOTTOM NAV ANIMATION
==========================================================

Bottom navigation:

Home
Products
Design AI
Projects
Quote
Profile

Active icon:

scale:
1 → 1.08

label:

fade + slide upward

Active indicator:

small pill/dot

When opening a modal:

bottom navigation hides.

When closing:

returns smoothly.

==========================================================
30. FLOATING ACTION BUTTON ANIMATION
==========================================================

WhatsApp
Call
Location

Buttons should have subtle entrance animation.

When page loads:

fade + scale.

Do NOT continuously pulse.

Optional:

very subtle pulse once every 5–8 seconds for WhatsApp only.

When bottom nav appears:

automatically reposition above it.

==========================================================
31. LAZY IMAGE ANIMATION
==========================================================

Images should initially show:

low-opacity / skeleton

Then:

opacity:
0 → 1

scale:
1.02 → 1

after loading.

Use:

loading="lazy"

for below-the-fold images.

Hero image:

priority/preload.

==========================================================
32. MOBILE PERFORMANCE RULE
==========================================================

CRITICAL:

All animations must remain smooth on:

budget Android phones
mid-range Android
iPhone

Avoid:

heavy WebGL
large video backgrounds
continuous expensive filters
huge blur layers
unnecessary canvas animations

Prefer:

transform
opacity
clip-path where supported
CSS transitions
Framer Motion
GSAP only where necessary

Do not animate:

width
height
top
left

continuously during scroll if transform can be used.

==========================================================
33. REDUCED MOTION
==========================================================

Respect:

prefers-reduced-motion: reduce

When enabled:

disable:

parallax
3D tilt
magnetic cursor
large zoom
complex page transitions

Keep:

simple fade
simple navigation
functional interactions

==========================================================
34. FINAL MOTION FEEL
==========================================================

The final motion language should feel:

Luxury
Architectural
Cinematic
Smooth
Controlled
Premium
Modern

NOT:

Gaming
Flashy
Cartoon
Neon
Over-animated
AI-template-looking

Think:

premium architecture studio
+
luxury interior showroom
+
modern mobile app experience.

==========================================================
35. FINAL TEST
==========================================================

Before finishing, test:

Mobile:

360px
375px
390px
412px
430px

Desktop:

1280px
1440px
1920px

Verify:

✓ smooth scrolling
✓ no scroll jitter
✓ no horizontal overflow
✓ hero zoom works
✓ parallax works
✓ text reveal works
✓ image reveal works
✓ before/after drag works
✓ pinch zoom works
✓ double tap zoom works
✓ image drag works
✓ gallery swipe works
✓ project transitions work
✓ counters work
✓ horizontal carousels work
✓ navbar transformation works
✓ bottom navigation works
✓ floating buttons don't overlap
✓ animations don't block interaction
✓ reduced-motion works
✓ mobile performance remains good

IMPORTANT:

Do not add effects merely because they are technically possible.

Every animation must have a purpose:

GUIDE ATTENTION
CREATE DEPTH
SHOW HIERARCHY
IMPROVE INTERACTION
OR CREATE A PREMIUM FEEL.

The website must still look excellent when all animations are disabled.
==========================================================