import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from './bug.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/bugs'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiUrl);
  }

  addBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.apiUrl, bug);
  }

  updateBug(bug: Bug): Observable<Bug> {
    return this.http.put<Bug>(`${this.apiUrl}/${bug.id}`, bug);
  }

  deleteBug(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
