import { ProjectFormValue } from '../models/project.model';

// Données de démarrage : importées via le bouton "Importer les données de départ"
// dans le dashboard admin (écriture Firestore réservée aux utilisateurs authentifiés).
export const SEED_PROJECTS: ProjectFormValue[] = [
  {
    title: 'GazFacile',
    slug: 'gazfacile',
    shortDescription:
      'Commande et livraison de gaz domestique en temps réel, avec géolocalisation et paiement mobile.',
    longDescription:
      "GazFacile est une plateforme fullstack permettant de commander et de faire livrer du gaz domestique en quelques clics. L'application intègre la géolocalisation pour suivre les livraisons et le paiement Mobile Money pour des transactions fluides. Développée seule de bout en bout (API Spring Boot, interface Angular, base MongoDB), elle est conteneurisée avec Docker et déployée sur Oracle Cloud.",
    stack: ['Spring Boot', 'Angular', 'MongoDB', 'Docker', 'Mobile Money'],
    links: { live: 'https://gazfacile.netlify.app' },
    coverImage: '',
    visible: true,
    order: 1,
  },
  {
    title: 'BeChat',
    slug: 'bechat',
    shortDescription:
      'Microservice de messagerie temps réel (chat, appels audio/vidéo) avec 111 endpoints en production.',
    longDescription:
      "BeChat est le microservice de messagerie de la plateforme BeTogether, gérant chat instantané, appels audio et vidéo pour des milliers d'utilisateurs. Construit avec FastAPI et PostgreSQL, il s'appuie sur Redis pour la gestion du temps réel et LiveKit pour la diffusion audio/vidéo via WebSockets. Le service expose 111 endpoints actuellement en production, conteneurisés avec Docker.",
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'LiveKit', 'WebSockets', 'Docker'],
    links: {},
    coverImage: '',
    visible: true,
    order: 2,
  },
  {
    title: 'Kalltake',
    slug: 'kalltake',
    shortDescription:
      'Plateforme de mobilité avec gestion complète des conducteurs et paiement mobile intégré.',
    longDescription:
      "Kalltake est une plateforme de mobilité dont j'ai conçu le backend complet avec NestJS. Elle gère l'authentification sécurisée par JWT avec refresh token, l'intégration Mobile Money MTN et Moov, ainsi qu'un système de parrainage pour la croissance de la plateforme. L'API est entièrement documentée avec Swagger et persiste les données via TypeORM sur PostgreSQL.",
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM'],
    links: {},
    coverImage: '',
    visible: true,
    order: 3,
  },
  {
    title: 'Kimo',
    slug: 'kimo',
    shortDescription: 'Application Flutter de location de maisons avec recherche et réservation en ligne.',
    longDescription:
      "Kimo est une application mobile Flutter dédiée à la location de maisons, permettant aux utilisateurs de rechercher des biens, consulter leurs détails et effectuer une réservation directement depuis l'application. Elle consomme des APIs REST pour la gestion des annonces et des réservations, avec une interface fluide pensée mobile-first.",
    stack: ['Flutter', 'Dart'],
    links: {},
    coverImage: '',
    visible: true,
    order: 4,
  },
  {
    title: 'Vote Event',
    slug: 'vote-event',
    shortDescription: 'Billetterie événementielle mobile avec paiement de tickets intégré.',
    longDescription:
      "Vote Event est une application Flutter de billetterie qui permet aux utilisateurs d'acheter et de gérer leurs tickets pour des événements directement depuis leur téléphone. Le paiement des tickets est intégré via Mobile Money, offrant un parcours d'achat rapide et sécurisé, adapté aux usages courants en Afrique de l'Ouest.",
    stack: ['Flutter', 'Dart', 'Mobile Money'],
    links: {},
    coverImage: '',
    visible: true,
    order: 5,
  },
  {
    title: 'Espace Show+',
    slug: 'espace-show-plus',
    shortDescription: 'Application mobile événementielle avec parcours de paiement complet.',
    longDescription:
      "Espace Show+ est une application mobile Flutter dédiée à la découverte et la réservation d'événements. Elle consomme des APIs REST, gère l'état de l'application de façon réactive et propose un parcours utilisateur complet incluant des écrans de paiement dédiés, de la sélection de l'événement jusqu'à la confirmation d'achat.",
    stack: ['Flutter', 'Dart'],
    links: {},
    coverImage: '',
    visible: true,
    order: 6,
  },
  {
    title: 'Eranou',
    slug: 'eranou',
    shortDescription: 'Plateforme e-commerce mobile (client et marchand) avec paiement mobile intégré.',
    longDescription:
      "Eranou est une plateforme e-commerce composée de deux applications Flutter distinctes : une pour les clients et une pour les marchands. Elle couvre l'ensemble du parcours d'achat, de la navigation dans le catalogue jusqu'au paiement, avec une intégration Mobile Money pour des transactions locales simplifiées.",
    stack: ['Flutter', 'Dart', 'Mobile Money'],
    links: {},
    coverImage: '',
    visible: true,
    order: 7,
  },
];
