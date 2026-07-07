const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

// Icônes réelles (devicon) pour les technos qui ont un logo reconnaissable.
// Les entrées absentes de cette map (ex. Bloc/Cubit, MTN MoMo, JWT...) retombent
// sur un badge texte simple dans les composants qui consomment cette donnée.
export const TECH_ICONS: Record<string, string> = {
  Flutter: `${DEVICON_BASE}/flutter/flutter-original.svg`,
  Dart: `${DEVICON_BASE}/dart/dart-original.svg`,
  Angular: `${DEVICON_BASE}/angular/angular-original.svg`,
  TypeScript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  'Node.js': `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  NestJS: `${DEVICON_BASE}/nestjs/nestjs-original.svg`,
  FastAPI: `${DEVICON_BASE}/fastapi/fastapi-original.svg`,
  'Spring Boot': `${DEVICON_BASE}/spring/spring-original.svg`,
  PostgreSQL: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  MySQL: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  MongoDB: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  Redis: `${DEVICON_BASE}/redis/redis-original.svg`,
  Docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  Git: `${DEVICON_BASE}/git/git-original.svg`,
  GitHub: `${DEVICON_BASE}/github/github-original.svg`,
  Firebase: `${DEVICON_BASE}/firebase/firebase-plain.svg`,
  Swagger: `${DEVICON_BASE}/swagger/swagger-original.svg`,
  Postman: `${DEVICON_BASE}/postman/postman-original.svg`,
  'Oracle Cloud': `${DEVICON_BASE}/oracle/oracle-original.svg`,
};

export function techIconFor(name: string): string | null {
  return TECH_ICONS[name] ?? null;
}
