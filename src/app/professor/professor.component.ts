import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Professor } from './professor-data';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Department } from '../department/department-data';

@Component({
  selector: 'app-professor',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './professor.component.html',
  styleUrl: './professor.component.css'
})
export class ProfessorComponent {
  professors$: Observable<Professor[]>;
      constructor(private http: HttpClient) {
        this.professors$ = http.get<Professor[]>(environment.apiUrl + '/api/Professors')
    }
}
