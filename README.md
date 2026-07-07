# Portfolio — Orace EDJO

Portfolio professionnel Angular 19 + Firebase, avec une partie publique (vitrine) et une
partie admin (`/admin`) protégée par Firebase Auth pour gérer les projets sans toucher au code.

## Stack

- Angular 19 (standalone, signals, `@if`/`@for`)
- `@angular/fire` (Firestore, Auth, Storage)
- SCSS pur, responsive mobile-first

## 1. Créer le projet Firebase

1. Aller sur la [console Firebase](https://console.firebase.google.com) et créer un nouveau projet.
2. **Firestore Database** → créer une base (mode production).
3. **Authentication** → onglet "Sign-in method" → activer **Email/Mot de passe**.
4. **Storage** → activer le stockage.
5. **Paramètres du projet** (⚙️) → "Vos applications" → ajouter une application **Web** →
   copier l'objet `firebaseConfig` fourni.

## 2. Configurer l'application

Renseigner les valeurs Firebase dans :

- `src/environments/environment.ts` (développement)
- `src/environments/environment.prod.ts` (production)

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '...',
    authDomain: '...',
    projectId: '...',
    storageBucket: '...',
    messagingSenderId: '...',
    appId: '...',
  },
};
```

Ces valeurs ne sont pas des secrets critiques (elles sont visibles côté client), mais ne
committez jamais vos vraies clés dans un dépôt public : préférez régénérer ces fichiers
au moment du build via les variables d'environnement Netlify si le dépôt est public.

## 3. Créer le compte admin

Aucune inscription publique n'est prévue. Créez le compte manuellement :

**Authentication** → **Users** → **Add user** → renseigner un email + mot de passe.
C'est ce compte qui servira à se connecter sur `/admin/login`.

## 4. Déployer les règles de sécurité

Les règles sont fournies dans `firestore.rules` et `storage.rules` (lecture publique sur
les projets/images, écriture réservée aux utilisateurs authentifiés).

```bash
npm install -g firebase-tools
firebase login
firebase use --add          # sélectionner votre projet Firebase
firebase deploy --only firestore:rules,storage
```

## 5. Lancer en local

```bash
npm install
npm start
```

L'application est disponible sur `http://localhost:4200`. Connectez-vous sur
`http://localhost:4200/admin/login` avec le compte admin créé à l'étape 3.

## 6. Importer les données de démarrage

Depuis le dashboard admin (`/admin`), cliquez sur **"Importer les données de départ"**
si la liste de projets est vide : cela insère les 10 projets de démarrage dans Firestore
(GazFacile, BeChat, oTrip, Kalltake, TonDi, Kimo, Vote Event, Espace Show+, Eranou,
Traffic IA). Les champs Play Store et GitHub sont volontairement vides ; complétez-les ensuite via le formulaire
d'édition de chaque projet. Ajoutez également une image de couverture pour chaque projet
depuis le formulaire (upload vers Firebase Storage, 2 Mo max, JPEG/PNG/WebP).

## 7. Build de production

```bash
npm run build
```

Le résultat est généré dans `dist/portfolio/browser`.

## 8. Déploiement Netlify

1. Connecter le dépôt Git à Netlify (ou déployer manuellement le dossier `dist/portfolio/browser`).
2. Build command : `npm run build`
3. Publish directory : `dist/portfolio/browser`
4. Le fichier `public/_redirects` (copié dans le build) gère déjà le routing Angular :
   ```
   /*  /index.html  200
   ```
   Un `netlify.toml` équivalent est aussi fourni à la racine du projet.
5. Renseignez vos variables d'environnement Firebase de production avant de builder si
   vous générez `environment.prod.ts` dynamiquement en CI, ou committez directement les
   valeurs si le dépôt reste privé.

## Notes

- Aucune clé Firebase réelle n'est committée : les fichiers `environment.ts` et
  `environment.prod.ts` contiennent des placeholders (`VOTRE_API_KEY`, etc.) à remplacer.
- La partie publique fonctionne même si Firestore est vide (état vide élégant).
- Pour un bel aperçu de lien sur WhatsApp/Facebook/LinkedIn, ajoutez une image
  `public/og-image.jpg` (1200×630px) reprenant votre identité visuelle — la balise
  `og:image` du site pointe déjà vers `/og-image.jpg`.
