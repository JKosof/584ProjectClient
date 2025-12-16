import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Course } from './course-data';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Department } from '../department/department-data';

@Component({
  selector: 'app-course',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
courses$: Observable<Course[]>;
    constructor(private http: HttpClient) {
      this.courses$ = http.get<Course[]>(environment.apiUrl + '/api/Courses')
  }
}
