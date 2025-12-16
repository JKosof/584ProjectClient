import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  private apiUrl = environment.apiUrl + '/api/Professors/bulkupdate';

  constructor(private http: HttpClient) { }

  updateItems(): Observable<any> {
    const url = `${this.apiUrl}`;
    // The HttpClient.put method performs the PUT request
    return this.http.put(url, null);
  }
}
