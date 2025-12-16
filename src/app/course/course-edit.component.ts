import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Course } from './course-data';
import { Department } from '../department/department-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../angular-material.module";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-edit',
  imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, RouterLink, ReactiveFormsModule, CommonModule, AngularMaterialModule],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent {
    title?: string;
    form!: FormGroup;
    course?: Course;
    id?: number;
    departments? : Department[];
    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private http: HttpClient) {
    }
    ngOnInit() {
      this.form = new FormGroup({
        name: new FormControl('', Validators.required),
        courseNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        credits: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        availability: new FormControl(''),
        departmentId: new FormControl('', Validators.required)
      });
      this.loadData();
    }
    loadData() {
      this.loadDepartments();
      var idParam = this.activatedRoute.snapshot.paramMap.get('id');
      this.id = idParam ? +idParam : 0;
      if (this.id) {
        var url = environment.apiUrl + '/api/courses/' + this.id;
        this.http.get<Course>(url).subscribe({
          next: (result) => {
            this.course = result;
            this.title = "Edit - " + this.course.department.deptCode + "-" + this.course.courseNumber;
            this.form.patchValue(this.course);
          },
          error: (error) => console.error(error)
        });
      }
      else {
        // ADD NEW MODE
        this.title = "Create a new Course";
      }
    }
    loadDepartments() {
      // fetch all the countries from the server
      var url = environment.apiUrl + '/api/Departments';
      var params = new HttpParams()
        .set("pageIndex", "0")
        .set("pageSize", "9999")
        .set("sortColumn", "name");
      this.http.get<any>(url, { params }).subscribe({
        next: (result) => {
          this.departments = result;
        },
        error: (error) => console.error(error)
      });
    }
    onSubmit() {
      var course = (this.id) ? this.course : <Course>{};
      if (course) {
        course.name = this.form.controls['name'].value;
        course.courseNumber = this.form.controls['courseNumber'].value;
        course.credits = this.form.controls['credits'].value;
        course.availability = this.form.controls['availability'].value;
        course.departmentId = +this.form.controls['departmentId'].value;
        //professor.department = this.form.controls['departmentId'].value;
        if (this.id) {
          var url = environment.apiUrl + '/api/Courses/' + course.id;
          this.http
            .put<Course>(url, course)
            .subscribe({
              next: (result) => {
                console.log("Course " + course!.id + " has been updated.");
                this.router.navigate(['/courses']);
              },
              error: (error) => console.error(error)
            });
          }
          else {
            var url = environment.apiUrl + '/api/Courses';
            //professor.department = 
          this.http
            .post<Course>(url, course)
            .subscribe({
              next: (result) => {
                console.log("Course " + result.id + " has been created.");
                // go back to cities view
                this.router.navigate(['/courses']);
              },
              error: (error) => console.error(error)
            });
          }
        }
      }
}
