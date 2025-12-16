import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Professor } from './professor-data';
import { Department } from '../department/department-data';
import { Course } from '../course/course-data'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../angular-material.module";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-professor-edit',
  imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, RouterLink, ReactiveFormsModule, CommonModule, AngularMaterialModule],
  templateUrl: './professor-edit.component.html',
  styleUrl: './professor-edit.component.css'
})
export class ProfessorEditComponent {
  title?: string;
  form!: FormGroup;
  professor?: Professor;
  id?: number;
  departments? : Department[];
  courses? : Course[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
  }
  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      partTime: new FormControl(''),
      workloadStatus: new FormControl(''),
      departmentId: new FormControl('', Validators.required),
      courseId: new FormControl('')
    });
    this.loadData();
  }
  loadData() {
    this.loadDepartments();
    this.loadCourses();
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      var url = environment.apiUrl + '/api/professors/' + this.id;
      this.http.get<Professor>(url).subscribe({
        next: (result) => {
          this.professor = result;
          this.title = "Edit - " + this.professor.firstName + " " + this.professor.lastName;
          this.form.patchValue(this.professor);
          this.form.controls['courseId'].setValue(this.professor?.courses);
        },
        error: (error) => console.error(error)
      });
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Professor";
      this.form.get('partTime')?.setValue(false)
      this.form.controls['courseId'].setValue([]);
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
  loadCourses() {
    // fetch all the countries from the server
    var url = environment.apiUrl + '/api/Courses';
    var params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");
    this.http.get<any>(url, { params }).subscribe({
      next: (result) => {
        this.courses = result;
      },
      error: (error) => console.error(error)
    });
  }
  onSubmit() {
    var professor = (this.id) ? this.professor : <Professor>{};
    if (professor) {
      professor.firstName = this.form.controls['firstName'].value;
      professor.lastName = this.form.controls['lastName'].value;
      professor.partTime = this.form.controls['partTime'].value;
      professor.workloadStatus = this.form.controls['workloadStatus'].value;
      professor.departmentId = +this.form.controls['departmentId'].value;
      professor.courses = this.form.controls['courseId'].value;
      if (this.id) {
        var url = environment.apiUrl + '/api/Professors/' + professor.id;
        this.http
          .put<Professor>(url, professor)
          .subscribe({
            next: (result) => {
              console.log("Professor " + professor!.id + " has been updated.");
              this.router.navigate(['/professors']);
            },
            error: (error) => console.error(error)
          });
        }
        else {
          var url = environment.apiUrl + '/api/Professors';
        this.http
          .post<Professor>(url, professor)
          .subscribe({
            next: (result) => {
              console.log("Professor " + result.id + " has been created.");
              // go back to cities view
              this.router.navigate(['/professors']);
            },
            error: (error) => console.error(error)
          });
        }
      }
    }
}
