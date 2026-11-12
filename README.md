# CUP2EAT

CUP2EAT is a React + Vite landing page for an edible cup brand. The site showcases the product story, product catalog, sustainability message, gallery, and inquiry/contact flows for customers.

## Overview

This project presents a modern brand experience for a business that sells edible cups designed to turn everyday drink moments into memorable experiences. The website includes:

- A hero section and brand messaging
- Product catalog cards for different edible cup styles
- Story and mission sections
- Sustainability-focused content
- Gallery inspiration section
- Contact and inquiry forms that open a prefilled email draft

## Tech stack

- React
- TypeScript
- Vite
- Tailwind-inspired custom CSS
- Lucide React icons

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build the project for production:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run serve
   ```

## Project scripts

- `npm run dev` — starts the Vite development server
- `npm run build` — builds the app for production
- `npm run serve` — previews the production build
- `npm run typecheck` — runs the TypeScript type check

## Main files

- `src/App.tsx` — main landing page component and inquiry logic
- `src/index.css` — styling and layout for the full brand experience
- `public/` — static assets such as product and hero images

## Notes

The inquiry and contact forms are designed to open the user’s email client with a prefilled draft instead of sending data directly from the site.
