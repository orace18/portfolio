import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project, ProjectFormValue } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/projects`;

  /** Projets visibles publiquement, triés par ordre d'affichage. */
  getVisibleProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl);
  }

  /** Tous les projets (admin), triés par ordre d'affichage. */
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/admin`);
  }

  getProjectById(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  async createProject(value: ProjectFormValue): Promise<string> {
    const project = await firstValueFrom(this.http.post<Project>(this.baseUrl, value));
    return project.id;
  }

  async updateProject(id: string, value: Partial<ProjectFormValue>): Promise<void> {
    await firstValueFrom(this.http.patch<Project>(`${this.baseUrl}/${id}`, value));
  }

  async deleteProject(id: string): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
  }

  async setVisible(id: string, visible: boolean): Promise<void> {
    await this.updateProject(id, { visible });
  }

  async setOrder(id: string, order: number): Promise<void> {
    await this.updateProject(id, { order });
  }

  /** Insère les projets de démarrage si la collection est vide. */
  async seedIfEmpty(): Promise<number> {
    const result = await firstValueFrom(this.http.post<{ count: number }>(`${this.baseUrl}/seed`, {}));
    return result.count;
  }

  async fetchAllOnce(): Promise<Project[]> {
    return firstValueFrom(this.getAllProjects());
  }
}
