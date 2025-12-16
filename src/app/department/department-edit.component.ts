import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { environment } from './../../environments/environment';
import { Department } from './department-data';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from "../angular-material.module";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-department-edit',
  imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, RouterLink, ReactiveFormsModule, CommonModule, AngularMaterialModule],
  templateUrl: './department-edit.component.html',
  styleUrl: './department-edit.component.css'
})
export class DepartmentEditComponent {
  title?: string;
      form!: FormGroup;
      department?: Department;
      id?: number;
      constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpClient) {
      }
      ngOnInit() {
        this.form = new FormGroup({
          name: new FormControl('', Validators.required),
          deptCode: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2)])
        });
        this.loadData();
      }
      loadData() {
        var idParam = this.activatedRoute.snapshot.paramMap.get('id');
        this.id = idParam ? +idParam : 0;
        if (this.id) {
          var url = environment.apiUrl + '/api/departments/' + this.id;
          this.http.get<Department>(url).subscribe({
            next: (result) => {
              this.department = result;
              this.title = "Edit - " + this.department.name;
              this.form.patchValue(this.department);
            },
            error: (error) => console.error(error)
          });
        }
        else {
          // ADD NEW MODE
          this.title = "Create a new Department";
        }
      }

      
      
      onSubmit() {
        var department = (this.id) ? this.department : <Department>{};
        if (department) {
          department.name = this.form.controls['name'].value;
          department.deptCode = this.form.controls['deptCode'].value;
          //professor.department = this.form.controls['departmentId'].value;
          if (this.id) {
            var url = environment.apiUrl + '/api/Departments/' + department.id;
            this.http
              .put<Department>(url, department)
              .subscribe({
                next: (result) => {
                  console.log("Department " + department!.id + " has been updated.");
                  this.router.navigate(['/departments']);
                },
                error: (error) => console.error(error)
              });
            }
            else {
              var url = environment.apiUrl + '/api/Departments';
              //professor.department = 
            this.http
              .post<Department>(url, department)
              .subscribe({
                next: (result) => {
                  console.log("Department " + result.id + " has been created.");
                  // go back to cities view
                  this.router.navigate(['/departments']);
                },
                error: (error) => console.error(error)
              });
            }
          }
        }
}
