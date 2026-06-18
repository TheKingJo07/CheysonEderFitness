# CHEYSON EDER FITNESS

Site premium luxury fitness — React + Vite + TypeScript + Tailwind CSS v4 + Shadcn UI + React Router.

## Stack

- React 19 + TypeScript
- Vite 7 (SPA pure, zero-config Vercel)
- React Router v7
- Tailwind CSS v4
- Shadcn UI
- Lucide icons

## Démarrer en local

```bash
npm install
npm run dev
```

Build de production :

```bash
npm run build
npm run preview
```

Sortie : `dist/`.

## Déploiement Vercel

1. Push sur GitHub
2. Importer le repo dans Vercel
3. Framework: **Vite** (auto-détecté), build command `npm run build`, output `dist`
4. Le fichier `vercel.json` gère les rewrites SPA pour React Router

Aucun adaptateur, aucun SSR, aucun edge runtime. Compatible Vercel zéro configuration.

## Structure

```
src/
  assets/           Images (placeholders IA à remplacer)
  components/
    layout/         Navbar, Footer, Layout
    sections/       Sections de la home
    effects/        DumbbellCursor, ScrollReveal
    ui/             Shadcn components
  context/          LanguageContext (FR/EN)
  i18n/             Dictionnaires de traduction
  pages/            Home, NotFound
  lib/              utils
  App.tsx           Routes
  main.tsx          Entry
  styles.css        Design system luxury
```

## Lots livrés

- **Lot 1** : Design system luxury, navbar, footer, home (hero + stats + coach + before/after + témoignages), 404, FR/EN, curseur haltère.

## Placeholders à remplacer

Les images dans `src/assets/` sont générées par IA. Remplace-les par tes vraies photos en gardant les mêmes noms de fichiers.
