import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Department } from './department-data';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-department',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments$: Observable<Department[]>;
      constructor(private http: HttpClient) {
        this.departments$ = http.get<Department[]>(environment.apiUrl + '/api/Departments')
    }
}
