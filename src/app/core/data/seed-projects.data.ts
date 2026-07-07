import { ProjectFormValue } from '../models/project.model';

// Données de démarrage : importées via le bouton "Importer les données de départ"
// dans le dashboard admin (écriture Firestore réservée aux utilisateurs authentifiés).
export const SEED_PROJECTS: ProjectFormValue[] = [
  {
    title: 'GazFacile',
    slug: 'gazfacile',
    shortDescription:
      'Plateforme complète de commande et livraison de gaz domestique, du catalogue au paiement mobile.',
    longDescription:
      "GazFacile est une plateforme fullstack personnelle qui digitalise la commande et la livraison de gaz domestique. Elle couvre l'ensemble du parcours : catalogue de produits, prise de commande, géolocalisation du client pour organiser la livraison, paiement Mobile Money et espace d'administration pour la gestion des commandes. J'ai conçu et développé ce projet seul de bout en bout — l'API Spring Boot, l'interface Angular, la base MongoDB, la conteneurisation Docker — jusqu'au déploiement sur Oracle Cloud. C'est la démonstration la plus complète de mes compétences fullstack, du backend au déploiement en production.",
    stack: ['Spring Boot', 'Angular', 'MongoDB', 'Docker', 'Mobile Money', 'Oracle Cloud'],
    links: { live: 'https://gazfacile.netlify.app' },
    coverImage: '',
    visible: true,
    order: 1,
  },
  {
    title: 'BeChat',
    slug: 'bechat',
    shortDescription:
      'Microservice de messagerie temps réel avec chat, appels audio/vidéo et fonctionnalités IA, 111 endpoints en production.',
    longDescription:
      "BeChat est le microservice de messagerie de BeTogether (Africa Solidarity), que je conçois et livre en autonomie complète en tant que Lead Backend. Il gère le chat individuel et de groupe ainsi que les appels audio et vidéo via LiveKit, avec des notifications push délivrées par Firebase FCM. Le service embarque des fonctionnalités avancées : transcription audio avec OpenAI Whisper, traduction automatique via DeepL, et recherche vectorielle grâce à pgvector. Les tâches planifiées sont orchestrées avec Celery Beat, sur une architecture FastAPI, PostgreSQL et Redis Pub/Sub, conteneurisée avec Docker. Le service expose aujourd'hui 111 endpoints testés et actifs en production.",
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'WebSockets', 'LiveKit', 'Docker'],
    links: {},
    coverImage: '',
    visible: true,
    order: 2,
  },
  {
    title: 'oTrip',
    slug: 'otrip',
    shortDescription: 'Application de commande de course (VTC) avec front Flutter et backend Node.js.',
    longDescription:
      "oTrip est une application de mobilité type VTC permettant de commander une course en quelques taps, développée chez VallisTech. J'ai construit le front mobile avec Flutter, consommant les APIs d'un backend Node.js auquel j'ai également contribué, au sein d'un écosystème backend mixte associant Laravel et Node.js. Le projet couvre la réservation de course, le suivi du trajet et la gestion du profil utilisateur. C'était l'occasion de travailler sur l'intégration entre plusieurs services backend hétérogènes au sein d'une même plateforme mobile.",
    stack: ['Flutter', 'Dart', 'Node.js'],
    links: {},
    coverImage: '',
    visible: true,
    order: 3,
  },
  {
    title: 'Kalltake',
    slug: 'kalltake',
    shortDescription:
      'Plateforme de mobilité avec gestion complète des conducteurs et paiement mobile intégré.',
    longDescription:
      "Kalltake est une plateforme de mobilité pour laquelle j'ai conçu, chez WonderTeck, le backend complet avec NestJS. Il couvre les inscriptions, les profils et la gestion des disponibilités des conducteurs, avec une authentification sécurisée par JWT et refresh token. L'intégration Mobile Money MTN et Moov gère l'initiation des paiements, les callbacks et la réconciliation, et un système de parrainage calcule automatiquement les commissions. L'API est entièrement documentée avec Swagger et consommée par l'application mobile associée, avec persistance des données via TypeORM sur PostgreSQL.",
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM'],
    links: {},
    coverImage: '',
    visible: true,
    order: 4,
  },
  {
    title: 'TonDi',
    slug: 'tondi',
    shortDescription: 'APIs Spring Boot avec paiement Mobile Money intégré, application publiée sur le Play Store.',
    longDescription:
      "TonDi est une application dont j'ai développé les APIs REST avec Spring Boot chez SICMa & Associés. Le backend gère l'intégration Mobile Money côté serveur : initiation des paiements, traitement des callbacks et confirmation des transactions. Les données sont persistées via JPA/Hibernate sur une base PostgreSQL. L'application mobile associée est aujourd'hui publiée sur le Play Store.",
    stack: ['Spring Boot', 'Java', 'PostgreSQL', 'Mobile Money'],
    links: {},
    coverImage: '',
    visible: true,
    order: 5,
  },
  {
    title: 'Kimo',
    slug: 'kimo',
    shortDescription: 'Application Flutter de location de maisons avec recherche et réservation en ligne.',
    longDescription:
      "Kimo est une application mobile Flutter développée pour CIBE Africa, dédiée à la location de maisons. Elle permet aux utilisateurs de rechercher des biens selon plusieurs critères, consulter leurs détails et effectuer une réservation directement depuis l'application. Toute la gestion des annonces et des réservations passe par la consommation d'APIs REST. L'application est aujourd'hui publiée sur le Play Store.",
    stack: ['Flutter', 'Dart'],
    links: {},
    coverImage: '',
    visible: true,
    order: 6,
  },
  {
    title: 'Vote Event',
    slug: 'vote-event',
    shortDescription: 'Billetterie événementielle mobile avec paiement de tickets intégré, publiée sur le Play Store.',
    longDescription:
      "Vote Event est une application Flutter développée pour Gemini & Co, permettant aux utilisateurs d'acheter et de gérer leurs tickets pour des événements directement depuis leur téléphone. Le paiement des tickets est intégré via Mobile Money, offrant un parcours d'achat rapide et sécurisé, adapté aux usages courants en Afrique de l'Ouest. J'ai porté le développement de l'application mobile de bout en bout, de l'interface jusqu'à l'intégration du paiement. Elle est aujourd'hui publiée sur le Play Store.",
    stack: ['Flutter', 'Dart', 'Mobile Money'],
    links: {},
    coverImage: '',
    visible: true,
    order: 7,
  },
  {
    title: 'Espace Show+',
    slug: 'espace-show-plus',
    shortDescription: 'Application mobile événementielle avec parcours de paiement complet.',
    longDescription:
      "Espace Show+ est une application mobile Flutter développée pour AFT Groupe, dédiée à la découverte et la réservation d'événements. Elle consomme des APIs REST et gère l'état de l'application de façon réactive pour une expérience fluide. Le parcours utilisateur est complet, avec des écrans de paiement dédiés, de la sélection de l'événement jusqu'à la confirmation d'achat. C'est un projet représentatif de mon travail sur des applications mobiles orientées événementiel et paiement.",
    stack: ['Flutter', 'Dart'],
    links: {},
    coverImage: '',
    visible: true,
    order: 8,
  },
  {
    title: 'Eranou',
    slug: 'eranou',
    shortDescription: 'Plateforme e-commerce mobile (client et marchand) avec paiement mobile intégré, publiée sur le Play Store.',
    longDescription:
      "Eranou est une plateforme e-commerce développée pour VallisTech, composée de deux applications Flutter distinctes : une pour les clients et une pour les marchands. Côté client, l'application couvre l'ensemble du parcours d'achat, de la navigation dans le catalogue jusqu'au paiement. Côté marchand, elle permet la gestion des produits et le suivi des commandes. Le paiement est intégré via Mobile Money pour des transactions locales simplifiées, et les deux applications sont aujourd'hui publiées sur le Play Store.",
    stack: ['Flutter', 'Dart', 'Mobile Money'],
    links: {},
    coverImage: '',
    visible: true,
    order: 9,
  },
  {
    title: 'Traffic IA',
    slug: 'traffic-ia',
    shortDescription: 'Gestion intelligente de feux de circulation par vision par ordinateur et IoT.',
    longDescription:
      "Traffic IA est un projet personnel de gestion intelligente des feux de circulation, combinant vision par ordinateur et objets connectés. La détection des véhicules s'appuie sur le modèle YOLO v8, couplé à un dispositif IoT qui adapte les feux au trafic en temps réel. L'objectif est de réduire les embouteillages en ajustant dynamiquement les temps de passage selon la densité réelle du trafic. Le projet a été présenté au programme MEST AI Startup ainsi qu'au concours TV5MONDE Les Nouveaux Boss.",
    stack: ['Python', 'YOLO v8', 'IoT'],
    links: {},
    coverImage: '',
    visible: true,
    order: 10,
  },
];
