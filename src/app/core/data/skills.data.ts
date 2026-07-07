import { SkillGroup } from '../models/skill-group.model';

export const SKILLS: SkillGroup[] = [
  {
    category: 'Mobile',
    skills: ['Flutter', 'Dart', 'Bloc/Cubit', 'Riverpod', 'Provider', 'GetX', 'Firebase (Auth, FCM, Firestore)'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'NestJS', 'FastAPI', 'Spring Boot', 'API REST', 'WebSockets', 'JWT', 'Swagger'],
  },
  {
    category: 'Bases de données',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'Paiement mobile',
    skills: ['MTN MoMo', 'Moov Money', 'FedaPay', 'Kkiapay', 'QOS'],
  },
  {
    category: 'Outils',
    skills: ['Git', 'GitHub', 'Docker', 'CI/CD', 'Postman', 'Oracle Cloud'],
  },
];
