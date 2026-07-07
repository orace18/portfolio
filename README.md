# Portfolio — Orace EDJO

Portfolio professionnel Angular 19 + API NestJS/MongoDB, avec une partie publique
(vitrine) et une partie admin (`/admin`) protégée par JWT pour gérer les projets sans
toucher au code.

## Stack

- **Frontend** (`/`) : Angular 19 (standalone, signals, `@if`/`@for`), SCSS pur,
  responsive mobile-first.
- **Backend** (`/backend`) : NestJS + Mongoose (MongoDB), auth JWT, upload d'images vers
  MongoDB GridFS.

## 1. Base MongoDB

Vous avez besoin d'un cluster MongoDB (Atlas ou auto-hébergé) et de sa connection string
(`mongodb+srv://...`). Aucune collection à créer manuellement : le backend les crée à la
volée.

## 2. Configurer et lancer le backend

```bash
cd backend
cp .env.example .env
```

Renseignez dans `.env` :

- `MONGODB_URI` — votre connection string MongoDB.
- `JWT_SECRET` — une longue chaîne aléatoire (sert à signer les sessions admin).
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — les identifiants de connexion à `/admin` (utilisés
  une seule fois par le script de seed ci-dessous, pas stockés en clair en base).
- `CORS_ORIGIN` — l'URL du frontend (`http://localhost:4200` en dev).

Installez, créez le compte admin, puis lancez l'API :

```bash
npm install
npm run seed:admin   # crée/actualise le compte admin dans MongoDB à partir du .env
npm run start:dev    # API sur http://localhost:3000
```

Pour recréer le compte admin avec un nouveau mot de passe : changez `ADMIN_PASSWORD`
dans `.env` et relancez `npm run seed:admin`.

## 3. Lancer le frontend

Depuis la racine du dépôt :

```bash
npm install
npm start
```

L'application est disponible sur `http://localhost:4200`. Connectez-vous sur
`http://localhost:4200/admin/login` avec le compte admin créé à l'étape 2.

En développement, `src/environments/environment.ts` pointe déjà vers
`http://localhost:3000` (l'API locale) — rien à configurer pour tourner en local une
fois le backend lancé.

## 4. Importer les données de démarrage

Depuis le dashboard admin (`/admin`), cliquez sur **"Importer les données de départ"**
si la liste de projets est vide : cela insère les 10 projets de démarrage en base
(GazFacile, BeChat, oTrip, Kalltake, TonDi, Kimo, Vote Event, Espace Show+, Eranou,
Traffic IA). Les champs Play Store et GitHub sont volontairement vides ; complétez-les
ensuite via le formulaire d'édition de chaque projet. Ajoutez également une image de
couverture pour chaque projet depuis le formulaire (upload vers MongoDB GridFS, 2 Mo max,
JPEG/PNG/WebP).

## 5. Build de production

**Frontend** :

```bash
npm run build
```

Le résultat est généré dans `dist/portfolio/browser`.

**Backend** :

```bash
cd backend
npm run build
npm start   # sert dist/main.js
```

## 6. Déploiement

Le frontend (statique) et le backend (serveur Node persistant) se déploient
séparément :

- **Frontend sur Netlify** :
  1. Connecter le dépôt Git à Netlify (ou déployer manuellement `dist/portfolio/browser`).
  2. Build command : `npm run build` — Publish directory : `dist/portfolio/browser`.
  3. Le fichier `public/_redirects` (copié dans le build) gère déjà le routing Angular
     (`/* /index.html 200`) — un `netlify.toml` équivalent est aussi fourni à la racine.
  4. Avant de builder, mettez à jour `src/environments/environment.prod.ts` avec l'URL
     publique de votre API backend (étape suivante).

- **Backend sur un hébergeur Node** (Render, Railway, Fly.io, VM Oracle Cloud...) :
  Netlify ne sert que du statique, il faut héberger `backend/` ailleurs. Renseignez les
  mêmes variables que `.env` (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`,
  `ADMIN_PASSWORD`, `CORS_ORIGIN` avec l'URL Netlify du frontend) dans les variables
  d'environnement de l'hébergeur, buildez avec `npm run build`, lancez avec `npm start`.

## Notes

- Aucun secret réel n'est committé : `backend/.env` est gitignored, seul
  `backend/.env.example` (placeholders) est versionné.
- La partie publique fonctionne même si la base est vide (état vide élégant, pas d'écran
  cassé).
- Pour un bel aperçu de lien sur WhatsApp/Facebook/LinkedIn, ajoutez une image
  `public/og-image.jpg` (1200×630px) reprenant votre identité visuelle — la balise
  `og:image` du site pointe déjà vers `/og-image.jpg`.
