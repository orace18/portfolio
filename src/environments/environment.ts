// Configuration Firebase — environnement de DÉVELOPPEMENT
//
// Où trouver ces valeurs :
// 1. Console Firebase → https://console.firebase.google.com
// 2. Sélectionner (ou créer) votre projet
// 3. Paramètres du projet (icône engrenage) → "Vos applications" → application Web
// 4. Copier l'objet `firebaseConfig` fourni et remplacer les valeurs ci-dessous
//
// Aucune de ces valeurs n'est un secret critique (elles sont visibles côté client),
// mais ne committez jamais vos VRAIES valeurs dans un dépôt public : préférez des
// variables d'environnement/CI (Netlify) qui génèrent ce fichier au moment du build.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'VOTRE_API_KEY',
    authDomain: 'VOTRE_PROJET.firebaseapp.com',
    projectId: 'VOTRE_PROJET_ID',
    storageBucket: 'VOTRE_PROJET.firebasestorage.app',
    messagingSenderId: 'VOTRE_SENDER_ID',
    appId: 'VOTRE_APP_ID',
  },
};
