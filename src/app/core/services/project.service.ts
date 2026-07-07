import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { Project, ProjectFormValue } from '../models/project.model';
import { SEED_PROJECTS } from '../data/seed-projects.data';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly firestore = inject(Firestore);
  private readonly collectionName = 'projects';

  private get projectsCollection() {
    return collection(this.firestore, this.collectionName);
  }

  /** Projets visibles publiquement, triés par ordre d'affichage. */
  getVisibleProjects(): Observable<Project[]> {
    const q = query(this.projectsCollection, where('visible', '==', true), orderBy('order', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
  }

  /** Tous les projets (admin), triés par ordre d'affichage. */
  getAllProjects(): Observable<Project[]> {
    const q = query(this.projectsCollection, orderBy('order', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Project[]>;
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const ref = doc(this.firestore, this.collectionName, id);
    return docData(ref, { idField: 'id' }) as Observable<Project | undefined>;
  }

  async createProject(value: ProjectFormValue): Promise<string> {
    const ref = await addDoc(this.projectsCollection, {
      ...value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  }

  async updateProject(id: string, value: Partial<ProjectFormValue>): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);
    await updateDoc(ref, { ...value, updatedAt: serverTimestamp() });
  }

  async deleteProject(id: string): Promise<void> {
    const ref = doc(this.firestore, this.collectionName, id);
    await deleteDoc(ref);
  }

  async setVisible(id: string, visible: boolean): Promise<void> {
    await this.updateProject(id, { visible });
  }

  async setOrder(id: string, order: number): Promise<void> {
    await this.updateProject(id, { order });
  }

  /** Insère les projets de démarrage si la collection est vide. */
  async seedIfEmpty(): Promise<number> {
    const snapshot = await getDocs(this.projectsCollection);
    if (!snapshot.empty) {
      return 0;
    }
    for (const project of SEED_PROJECTS) {
      await this.createProject(project);
    }
    return SEED_PROJECTS.length;
  }

  async fetchAllOnce(): Promise<Project[]> {
    return firstValueFrom(this.getAllProjects());
  }
}
