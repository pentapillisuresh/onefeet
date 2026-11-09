# 1Feet.in — Vizag Map-First Real Estate Client Demo

Next.js 14 App Router, React JSX, Tailwind CSS, React Leaflet, Esri World Imagery satellite tiles.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

No Google Maps key is required. The map uses Esri satellite imagery via Leaflet, not Google Maps. Attribution is included. A future Google Maps integration would require a Maps JavaScript API key and billing.

## Demo features

- Map-first home page centered on Visakhapatnam with 10 fictional ventures and coordinates
- Search and locality filters; clickable colored map pins and venture popups
- Individual venture pages with satellite map and interactive sample plot polygons
- Layout, 3D (zoom approximation only), Hide controls
- Property-specific prices, availability, sizes, badges and information
- Frontend demo login: any Indian 10-digit mobile number, OTP `1234`
- LocalStorage login, favourites and compare; demo enquiry form
- Uploaded 1Feet.in logo in public/logo.jpeg

## Important

All properties, prices, availability, approvals and plot boundaries are fictional, for client presentation only. The sample polygons are not survey-accurate. The 3D control is a visual zoom approximation, not actual 3D rendering. The login is frontend-only and is not secure authentication. Satellite tile availability depends on an internet connection and the tile provider's usage policies. This project is not affiliated with Plotsview.
