// Configuration Firebase — environnement de PRODUCTION
//
// Voir src/environments/environment.ts pour l'explication complète.
// Renseignez ici les valeurs de votre projet Firebase de production
// (peut être le même projet qu'en développement pour un usage simple).
export const environment = {
  production: true,
  firebase: {
    apiKey: 'VOTRE_API_KEY',
    authDomain: 'VOTRE_PROJET.firebaseapp.com',
    projectId: 'VOTRE_PROJET_ID',
    storageBucket: 'VOTRE_PROJET.firebasestorage.app',
    messagingSenderId: 'VOTRE_SENDER_ID',
    appId: 'VOTRE_APP_ID',
  },
};
