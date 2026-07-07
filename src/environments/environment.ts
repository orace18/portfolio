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
    apiKey: 'AIzaSyAxAP2EQ9jMWfagCj43f66p5a5PkMthO7o',
    authDomain: 'campusevent-4b069.firebaseapp.com',
    projectId: 'campusevent-4b069',
    storageBucket: 'campusevent-4b069.firebasestorage.app',
    messagingSenderId: '704148412129',
    appId: '1:704148412129:web:f12554393463db01da89a0',
  },
};
