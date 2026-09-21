You are a senior UI/UX designer, frontend architect and motion designer.

Build a production-ready, premium MOBILE-FIRST website for:

BRAND:
SHREE SHYAM INTERIOR

TAGLINE:
"घर सजाते हैं, दिल से !"

IMPORTANT:
I have provided a reference UI image.

DO NOT create a generic interior-design website.
DO NOT make it look like a template.
DO NOT simply copy the existing old Shree Shyam Interior website.
Use the reference image as the PRIMARY visual direction for layout, spacing, typography hierarchy, colors, cards, navigation, photography style and overall premium feeling.

The final website must feel like a real premium Indian interior-material + turnkey interior company website, not an AI-generated mockup.

==================================================
1. CORE DESIGN DIRECTION
==================================================

Design language:

- Premium interior architecture
- Modern Indian luxury
- Warm ivory / cream background
- Deep forest green / almost-black sections
- Walnut / dark wood
- Muted champagne-gold / copper accent
- White typography on dark sections
- Dark charcoal text on light sections
- Realistic interior photography
- Subtle glass effects only where useful
- Rounded corners but NOT excessive
- Strong editorial typography
- Large visual photography
- Sophisticated spacing
- Minimal clutter

Suggested colors:

Background:
#F5F1E8

Primary dark:
#14251F

Secondary dark:
#1D2D27

Wood:
#5A3A2E

Accent:
#C68A43

Light:
#FFFFFF

Text:
#1F2421

Muted:
#77736C

Do NOT use bright orange.
Do NOT use neon colors.
Do NOT make everything gold.
Gold/copper should only be an accent.

==================================================
2. MOBILE-FIRST REQUIREMENT
==================================================

PRIMARY TARGET:

Mobile phones:
360px
375px
390px
412px
430px

The mobile version is the priority.

Desktop must also work, but DO NOT design desktop first and shrink it.

The website must feel intentionally designed for mobile.

Use:

- responsive CSS
- CSS clamp()
- fluid typography
- responsive spacing
- touch-friendly buttons
- horizontal touch scrolling
- sticky navigation
- safe-area support
- mobile viewport optimization

Never allow:
- horizontal page overflow
- broken cards
- text clipping
- images stretching
- buttons going outside viewport
- fixed elements covering important content

==================================================
3. HEADER
==================================================

Create a premium sticky mobile header.

Structure:

LEFT:
Shree Shyam Interior logo

CENTER:
Search field / compact search icon

RIGHT:
Cart icon with small item counter
Hamburger menu

On initial page load:
header should be transparent/overlayed over hero.

When scrolling:
header smoothly transforms into:

- solid ivory/dark background
- subtle blur
- small shadow
- compact height

Use smooth transition around 300–500ms.

Header should not constantly jump.

Search interaction:

Tap search →
full-screen/mobile search overlay.

Search products, materials, projects and services.

Example:

Search plywood...
Search modular kitchen...
Search lighting...
Search false ceiling...
Search interior projects...

Include recent searches and categories.

==================================================
4. HERO SECTION
==================================================

This is one of the MOST IMPORTANT sections.

Use a large REALISTIC interior photograph.

Do not use a generic stock-looking image.

Hero should visually resemble the reference image:

Large luxury living room
Warm lighting
Wood
Stone
Sofa
TV wall
Decorative lights
Premium interior

Hero image should occupy most of the first mobile viewport.

Add subtle dark gradient over image so text remains readable.

Text:

SMALL LABEL:
DREAM • DESIGN • BUILD

MAIN HEADING:

Transforming Spaces
Into
Better Living

Use large editorial serif/sophisticated typography.

Highlight:
"Better Living"

with muted copper/gold.

Description:

Premium interior materials, modern designs and complete turnkey solutions for your home, office or commercial space.

CTA:

Get Free Consultation →

Secondary CTA:

Explore Projects

Add small client avatars.

Example:
500+ Happy Clients

Add small vertical progress indicator:

01
02
03

Add:

SCROLL ↓

==================================================
5. HERO ANIMATION
==================================================

Hero must NOT be static.

On page load:

1. image slowly scales from 1.08 → 1.0
2. heading fades upward
3. description fades upward
4. CTA slides upward
5. client avatars appear sequentially
6. progress indicator appears

Use subtle animation.

NO excessive bouncing.

NO cartoon animations.

Hero image:

transform: scale(1.04)

on scroll:

very subtle parallax movement.

Use Framer Motion / GSAP if available.

==================================================
6. SCROLL EXPERIENCE
==================================================

The entire website must feel premium while scrolling.

Implement:

- smooth scrolling
- reveal-on-scroll
- subtle parallax
- image scale effects
- text fade/slide
- section transitions
- horizontal drag sections
- sticky elements where useful
- number counters
- image reveal masks
- before/after drag interaction

IMPORTANT:

Animations must NEVER slow down the website.

Use GPU-friendly transforms:

transform
opacity

Avoid excessive JavaScript scroll listeners.

Use IntersectionObserver or Framer Motion viewport animations.

==================================================
7. TRUST / STATS STRIP
==================================================

Immediately below hero create a dark premium stats strip.

Four stats:

15+
Years Experience

500+
Projects Completed

25+
Cities Served

100%
Genuine Products

Each statistic should animate when entering viewport.

Number counter:

0 → 15+
0 → 500+
etc.

Use gold/copper icons.

==================================================
8. EXPLORE OUR WORLD
==================================================

Heading:

Explore Our World

Subtext:

Everything you need to create a beautiful space

Right side:

View All →

Create horizontally scrollable category cards.

Categories:

Plywood
Laminates
Hardware
Lighting
Furniture
Electrical
Tools & Machines
False Ceiling
Wall Panels
Paint
Flooring
Glass & Aluminium

IMPORTANT:

On mobile:

cards must be horizontally draggable with finger.

Do NOT stack 12 cards vertically.

Each card contains:

real product/material photograph
category name
small arrow

When user taps:

open category page.

==================================================
9. PRODUCT CATEGORY INTERACTION
==================================================

Category cards should have:

hover effect on desktop
press scale effect on mobile

Example:

scale(0.97) while pressing

Image subtle zoom:

scale 1 → 1.06

Transition:

400ms ease

==================================================
10. AI ROOM DESIGNER
==================================================

Create a major premium section.

Dark forest-green background.

Heading:

Visualize
Your Dream Space

Description:

Try our AI room designer and see your space in a new style.

CTA:

Start Designing →

Visual:

realistic room image.

Create BEFORE / AFTER comparison slider.

The divider must be draggable with touch.

Desktop:
mouse drag

Mobile:
finger drag

Center handle:
circular white button with arrow icon.

Before:
plain/simple room

After:
premium designed room

Add subtle image zoom when slider moves.

==================================================
11. AI DESIGN FLOW
==================================================

When user taps:

Start Designing →

open a mobile full-screen design wizard.

Step 1:
Upload room photo

Step 2:
Select room:

Living Room
Bedroom
Kitchen
Bathroom
Office
Other

Step 3:
Select style:

Modern
Luxury
Minimal
Contemporary
Traditional
Industrial

Step 4:
Budget:

₹1L–₹3L
₹3L–₹5L
₹5L–₹10L
₹10L+

Step 5:
Generate Concept

Show loading animation.

Then show:

AI concept
recommended materials
color palette
estimated budget
recommended products

If real AI API is not configured yet, create a realistic mock API/service layer.

Do NOT fake an actual AI result as if it came from a real API.
Clearly structure the code so API integration can be added later.

==================================================
12. INSTANT COST ESTIMATE
==================================================

Create a dark premium estimate card next to / below AI section.

Heading:

Get Instant
Cost Estimate

Fields:

Property Type
Area (sq ft)
Room Type
Design Style
Budget Range

CTA:

Calculate Now →

After submit show:

Estimated Project Cost
Material Cost
Labour Cost
Design Cost
GST
Estimated Total

Include:

Download Estimate PDF

Request Detailed Quote

IMPORTANT:

Make the calculation logic modular.

Do not hardcode everything inside UI components.

Create:

estimateService
pricingConfig
materialRates
labourRates

so admin can change rates later.

==================================================
13. FEATURED PROJECTS
==================================================

Heading:

Featured Projects

Create filter chips:

All
Home
Office
Commercial
Renovation

Horizontal scrolling on mobile.

Project cards:

large image
project name
location
category
arrow button

Examples:

Modern Living Room
Sikar

Modular Kitchen
Sikar

Office Interior
Delhi

Luxury Bedroom
Jaipur

When card opens:

Project Detail Page

Include:

hero project image
project overview
location
area
budget range
materials used
design style
before/after
photo gallery
project timeline
testimonial
related products
CTA:

Start Your Project

==================================================
14. IMAGE ZOOM / GALLERY
==================================================

This is REQUIRED.

Every important project image must support:

tap → full-screen gallery

Inside gallery:

- pinch-to-zoom
- double-tap zoom
- swipe left/right
- close button
- image counter

Example:

1 / 12

On desktop:

mouse wheel zoom
drag image

Do NOT allow browser page scrolling while zoom modal is active.

Use a proper image viewer component.

==================================================
15. PROJECT IMAGE SCROLL EFFECT
==================================================

When project images enter viewport:

image starts slightly zoomed:

scale(1.05)

then smoothly becomes:

scale(1)

When scrolling past:

subtle parallax.

Do NOT overdo this.

The effect should feel like a premium architecture website.

==================================================
16. TOP BRANDS
==================================================

Section:

Top Brands We Deal In

Use a clean horizontal logo marquee.

Brands can include only brands that the business actually sells/partners with.

Do not invent partnerships.

Create placeholder data structure:

brands.json

Admin should later be able to control:

logo
name
status
website
order

Animation:

slow continuous horizontal movement.

Pause when user interacts.

==================================================
17. FREE SITE VISIT SECTION
==================================================

Create a large dark image banner.

Heading:

Book a Free
Site Visit

Description:

Our experts will visit your site, understand your needs and guide you with the best solutions.

CTA:

Book Now →

Right side:

professional interior consultant photograph.

Below/alongside:

Free Consultation
Expert Guidance
No Obligation
Customised Solutions

Mobile layout:

image and content should stack elegantly.

==================================================
18. SITE VISIT BOOKING
==================================================

When user taps Book Now:

open booking flow.

Fields:

Name
Mobile Number
Location
Property Type
Approx Area
Preferred Date
Preferred Time

Button:

Book Site Visit

After booking:

confirmation screen

Booking ID

Admin notification

WhatsApp notification if configured

==================================================
19. TESTIMONIALS
==================================================

Heading:

What Our Clients Say

Use premium testimonial cards.

Include:

customer photo
name
city
testimonial
rating

Mobile:
horizontal swipe carousel.

Do NOT use fake reviews in production.

Create testimonial data structure so admin can manage them.

==================================================
20. SHOWROOM
==================================================

Create:

Visit Our Showroom

Show:

Shree Shyam Interior
Sikar, Rajasthan

Add realistic showroom image.

Buttons:

Get Directions
Call
WhatsApp

Google Maps integration should be structured cleanly.

Do not hardcode fake coordinates.

==================================================
21. FLOATING ACTION BUTTONS
==================================================

Use floating:

WhatsApp
Call
Location

BUT:

Do not make them ugly or oversized.

On mobile:

stack vertically near bottom-right.

When bottom navigation is visible:

automatically move them upward so they never overlap navigation.

Add subtle shadow.

Click:

WhatsApp → WhatsApp chat
Call → tel:
Location → Maps

==================================================
22. MOBILE BOTTOM NAVIGATION
==================================================

This is VERY IMPORTANT.

Fixed bottom navigation:

Home
Products
Design AI
Projects
Quote
Profile

Dark premium background.

Active item:
copper/gold

Inactive:
light gray/white

Add subtle active indicator.

Navigation should remain visible while scrolling.

BUT:

When keyboard opens or modal opens,
temporarily hide bottom nav.

Use safe-area-inset-bottom.

==================================================
23. PRODUCTS PAGE
==================================================

Create a real product catalog.

Categories:

Plywood
Laminates
Hardware
Lighting
Electrical
Furniture
Tools
False Ceiling
Wall Panels
Paint
Flooring

Product card:

image
brand
product name
category
price / "Request Quote"
wishlist
compare
quick view

Filters:

Category
Brand
Price
Material
Color
Availability

Sort:

Popular
Newest
Price Low → High
Price High → Low

==================================================
24. PRODUCT DETAIL PAGE
==================================================

Product detail should include:

large image gallery
pinch zoom
product name
brand
description
specifications
available finishes
dimensions
applications
related products

CTA:

Request Quote

Add to Wishlist

WhatsApp Enquiry

For products where online selling is enabled:

Add to Cart

==================================================
25. QUOTATION SYSTEM
==================================================

Users should be able to add:

products
services
interior work
materials

to a quotation list.

Quotation page:

Selected Items
Quantity
Unit
Price
Subtotal
GST
Discount
Estimated Total

CTA:

Request Detailed Quote

Generate PDF quotation request.

==================================================
26. CUSTOMER PROFILE
==================================================

Profile page:

My Projects
My Quotes
My Site Visits
My Orders
Saved Products
Saved Designs
Documents
Notifications

Project dashboard:

Project Name
Progress %
Current Stage
Next Step

Stages:

Consultation
Site Measurement
Design
Quotation
Material Selection
Execution
Final Inspection
Completed

Use a visual timeline.

==================================================
27. ADMIN SYSTEM ARCHITECTURE
==================================================

Build frontend in a way that a backend/admin panel can connect later.

Admin should eventually manage:

Products
Categories
Brands
Projects
Gallery
Before/After
Testimonials
Site Visit Requests
Leads
Quotes
Customers
Orders
Pricing
Material Rates
Labour Rates
AI Design Requests
Homepage Sections
Banners
SEO
Contact Details

Do NOT put content directly inside many components.

Use structured data.

Example:

products.json
projects.json
services.json
brands.json
testimonials.json
homepage.json

Later replace JSON/mock services with API.

==================================================
28. ANIMATION SYSTEM
==================================================

Use Framer Motion.

Create reusable animation variants:

fadeUp
fadeIn
scaleIn
slideLeft
slideRight
imageReveal
staggerChildren

Rules:

duration:
0.4–0.8 sec

easing:
easeOut / cubic-bezier

Do not animate every single element.

Hero:
strong animation

Major sections:
medium animation

Cards:
subtle animation

Images:
subtle zoom

==================================================
29. ADVANCED SCROLL EFFECTS
==================================================

Implement:

A. Sticky header transformation

B. Hero parallax

C. Section reveal

D. Image reveal mask

E. Horizontal category scroll

F. Horizontal project carousel

G. Before/after draggable slider

H. Number counter

I. Brand marquee

J. Project image parallax

K. Smooth section transitions

L. Scroll progress indicator

M. Active section detection

N. Scroll-to-top button

IMPORTANT:

Animations must remain smooth on low-end Android phones.

Use:

transform
opacity
will-change only where needed

Lazy-load images.

Use responsive image sizes.

==================================================
30. ZOOM EXPERIENCE
==================================================

Implement zoom in:

Project gallery
Product gallery
Interior images
Before/after images

Mobile:

pinch zoom
double tap
drag while zoomed

Desktop:

wheel zoom
click zoom
drag

Create reusable:

ImageViewer.tsx

Do not implement zoom separately in every component.

==================================================
31. REALISTIC VISUAL DESIGN
==================================================

The reference image must NOT be converted into a long image.

Build REAL HTML/CSS/React components.

Each section must actually work.

Use realistic photography.

Use consistent photography:

warm lighting
architectural interiors
Indian homes
modern kitchens
bedrooms
offices
premium materials

Avoid:

AI-looking people
random fake logos
random fake brands
random floating 3D objects
excessive gradients
neon effects
overly rounded cards
too many shadows
generic SaaS design

==================================================
32. TYPOGRAPHY
==================================================

Use a sophisticated font combination.

Suggested:

Headings:
Playfair Display / DM Serif Display

Body:
Inter / Manrope

Use:

large editorial headings
compact labels
clear hierarchy

Avoid using 5+ fonts.

==================================================
33. MICRO INTERACTIONS
==================================================

Buttons:

hover:
slight lift

press:
scale 0.97

Arrow:
moves slightly right

Cards:
image zoom 1.04

Navigation:
active underline/indicator

Links:
smooth underline animation

Do not use exaggerated animations.

==================================================
34. LOADING EXPERIENCE
==================================================

Create premium skeleton loaders.

For:

Products
Projects
Testimonials
Gallery

Use skeleton shimmer.

No blank white screen.

==================================================
35. PERFORMANCE
==================================================

Target:

Fast mobile loading.

Implement:

lazy loading
WebP/AVIF images
responsive srcset
code splitting
route lazy loading
compressed assets
font optimization
minimal JS
avoid unnecessary dependencies

Target:

Lighthouse mobile:

Performance 90+
Accessibility 90+
Best Practices 90+
SEO 90+

where realistically achievable.

==================================================
36. SEO
==================================================

Create proper:

title
meta description
Open Graph
Twitter cards
canonical
robots
sitemap

Structured data:

LocalBusiness
Organization
Product
Service
BreadcrumbList
Review where valid

Pages:

/
 /products
 /products/[category]
 /product/[slug]
 /projects
 /projects/[slug]
 /services
 /about
 /contact
 /quote
 /design-ai
 /site-visit
 /profile

==================================================
37. ACCESSIBILITY
==================================================

Use:

semantic HTML
ARIA labels
keyboard navigation
focus states
alt text
proper contrast
screen reader friendly buttons

Do not use icons without accessible labels.

==================================================
38. TECH STACK
==================================================

Preferred:

React
Vite
TypeScript
Tailwind CSS
Framer Motion
React Router

Icons:

Lucide React

Forms:

React Hook Form

Validation:

Zod

State:

Context API or Zustand

Use clean reusable components.

Suggested structure:

src/
  components/
    Header/
    Hero/
    Stats/
    CategoryCarousel/
    AIPlanner/
    CostEstimator/
    ProjectCard/
    ProjectGallery/
    BeforeAfter/
    BrandMarquee/
    SiteVisit/
    Testimonials/
    Showroom/
    BottomNav/
    FloatingActions/
    ImageViewer/

  pages/
    Home/
    Products/
    ProductDetail/
    Projects/
    ProjectDetail/
    DesignAI/
    Quote/
    SiteVisit/
    Profile/

  services/
    estimateService
    productService
    projectService
    quoteService

  data/
    products
    projects
    brands
    testimonials

  hooks/
  utils/
  types/

==================================================
39. IMPORTANT MOBILE UX
==================================================

On mobile:

Never make the user zoom the webpage manually.

The website itself should be responsive.

However image galleries should support pinch zoom.

Horizontal sections should support finger swipe.

Buttons should be at least approximately 44px touch target.

Bottom navigation should be thumb-friendly.

Forms should use mobile keyboard-friendly inputs.

Phone field:
inputMode="tel"

Email:
inputMode="email"

Area:
inputMode="numeric"

==================================================
40. FINAL HOME PAGE ORDER
==================================================

The final homepage should follow this visual storytelling:

1. Sticky / transparent header
2. Full-screen premium hero
3. Trust statistics
4. Explore Our World
5. AI Room Visualizer
6. Instant Cost Estimate
7. Featured Projects
8. Top Brands
9. Free Site Visit
10. Client Testimonials
11. Showroom
12. Final CTA
13. Footer
14. Fixed bottom navigation

Do NOT add unnecessary sections just to make the homepage longer.

==================================================
41. MOST IMPORTANT RULE
==================================================

The reference image is a DESIGN REFERENCE.

Do not make the entire website look like one giant poster.

Convert every visual block from the reference into a REAL INTERACTIVE WEBSITE COMPONENT.

For example:

Reference:
horizontal product cards

Actual:
touch-scroll carousel

Reference:
before/after image

Actual:
draggable comparison slider

Reference:
project image

Actual:
click → gallery → pinch zoom

Reference:
cost calculator

Actual:
working calculation logic

Reference:
Book Now

Actual:
working booking form

Reference:
bottom navigation

Actual:
React Router navigation

Reference:
search

Actual:
working search/filter

==================================================
42. FINAL QUALITY CHECK
==================================================

Before finishing, test:

✓ 360px
✓ 375px
✓ 390px
✓ 412px
✓ 430px

Check:

✓ no horizontal overflow
✓ no broken images
✓ no text clipping
✓ no overlapping floating buttons
✓ bottom nav doesn't hide content
✓ modals lock body scroll
✓ image zoom works
✓ before/after slider works
✓ horizontal carousels work by touch
✓ forms validate
✓ buttons have proper states
✓ animations don't stutter
✓ lazy loading works
✓ routes work
✓ back navigation works
✓ mobile browser safe area works

==================================================
43. DO NOT DO THESE THINGS
==================================================

DO NOT:

- create a generic Bootstrap website
- copy the old Shree Shyam website
- create a desktop website and shrink it
- use random AI-generated UI blocks
- use excessive cards
- use excessive gradients
- use neon colors
- use huge unnecessary animations
- use fake testimonials
- invent brand partnerships
- invent business statistics
- hardcode everything into JSX
- create non-functional buttons
- create fake loading screens
- make the page one giant image
- use placeholder text in final UI
- add "Lorem ipsum"
- create fake API calls pretending they are real

==================================================
44. FINAL OUTPUT
==================================================

Build the actual working website.

First create the complete homepage.

Then implement:

Products
Projects
AI Design
Cost Estimate
Site Visit
Quote
Profile

Make the homepage visually extremely close to the supplied reference image while making it a real responsive website.

The result should feel like:

PREMIUM INTERIOR BRAND
+
MATERIAL CATALOG
+
INTERIOR STUDIO
+
AI DESIGN TOOL
+
PROJECT PORTFOLIO
+
QUOTATION SYSTEM
+
CUSTOMER DASHBOARD

All inside one polished mobile-first experience.

Focus on visual quality, spacing, typography, photography, interaction design and smooth scrolling.

DO NOT stop at a static mockup.

BUILD THE ACTUAL FUNCTIONAL UI.