# PureNest - Premium Home Cleaning & Housekeeping Service HTML Template

PureNest is a luxury, production-grade, multi-purpose HTML5/Tailwind/Vanilla JS website template created for residential home cleaning agencies, professional maid services, and housekeeping companies.

## 🌟 Key Highlights

- **Visual Identity**: Tailored for residential freshness and luxury with Teal/Emerald primary (`#2E8B72`), Warm Gold/Sand accent (`#F2B866`), and warm neutral white backgrounds.
- **Strict Folder Architecture**:
  - `index.html` at root (Home 1 - Residential).
  - `pages/home2.html` (Home 2 - Editorial Care).
  - `pages/` (About, Services, Service Details, Pricing, How It Works, Coverage, Blog, Blog Details, Contact, Login, Register, 404, Coming Soon).
  - `dashboard/` (10 complete Customer Portal pages).
  - `admin/` (13 complete Executive Operations pages).
- **Interactive Vanilla JS Features**:
  - 7-Step Multi-step Booking Wizard with dynamic price calculation.
  - Live Cleaner GPS Arrival Tracker with 6-stage status timeline.
  - Interactive Before/After Image Comparison Slider.
  - Quick Price Estimator Widget on Homepage.
  - Interactive FAQ Accordions.
  - Animated Count-Up Statistics with Easing.
  - Full Form Validation with Loading Spinners & Toast Feedback.
- **Theme & Internationalization**:
  - Persistent LocalStorage Light/Dark mode.
  - Full LTR / RTL Directional Layout Mirroring.
- **Zero Framework Bloat**:
  - 100% Vanilla JS, HTML5, and TailwindCSS.
  - No React, Vue, Angular, jQuery, or Bootstrap.

## 📁 File Structure

```
home-cleaning/
│
├── index.html                   (Home 1 - Residential)
│
├── assets/
│   ├── css/
│   │   ├── style.css            (Design tokens, components, utilities)
│   │   ├── dark-mode.css        (Ambient dark overrides)
│   │   └── rtl.css              (Directional mirroring)
│   │
│   ├── js/
│   │   ├── main.js              (Navigation, drawer, sliders, accordions, estimator)
│   │   ├── theme.js             (Persistent Dark/Light switcher)
│   │   ├── rtl.js               (Persistent LTR/RTL toggle)
│   │   ├── validation.js        (Form validation & toasts)
│   │   ├── dashboard.js         (Wizard, tracker, charts, search)
│   │   ├── animations.js        (IntersectionObserver scroll & count-ups)
│   │   └── plugins/
│   │
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── team/
│   │   ├── blog/
│   │   ├── about/
│   │   ├── cleaning/
│   │   ├── before-after/
│   │   ├── locations/
│   │   └── dashboard/
│   │
│   └── fonts/
│
├── pages/
│   ├── home2.html
│   ├── about.html
│   ├── services.html
│   ├── service-details.html
│   ├── pricing.html
│   ├── how-it-works.html
│   ├── coverage.html
│   ├── blog.html
│   ├── blog-details.html
│   ├── contact.html
│   ├── login.html
│   ├── register.html
│   ├── 404.html
│   └── coming-soon.html
│
├── dashboard/
│   ├── index.html
│   ├── book-cleaning.html
│   ├── bookings.html
│   ├── booking-details.html
│   ├── cleaner-tracking.html
│   ├── reviews.html
│   ├── invoices.html
│   ├── profile.html
│   ├── notifications.html
│   └── settings.html
│
├── admin/
│   ├── index.html
│   ├── customers.html
│   ├── bookings.html
│   ├── cleaners.html
│   ├── services.html
│   ├── pricing.html
│   ├── reviews.html
│   ├── payments.html
│   ├── messages.html
│   ├── coverage.html
│   ├── reports.html
│   ├── analytics.html
│   └── settings.html
│
├── documentation/
│   └── index.html
├── README.md
├── robots.txt
└── sitemap.xml
```

## 🚀 Running Locally

You can open `index.html` directly in any modern browser, or serve it using any static HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js npx serve
npx serve .
```

## 📄 License & Attribution

Designed and built for ThemeForest, TemplateMonster, and direct client deployments.
All assets, icons, and vector graphics are royalty-free and production-ready.
