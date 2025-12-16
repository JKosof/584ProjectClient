import { Routes } from '@angular/router';
import { Weather } from './weather/weather';
import { Home } from './home/home';
import { CourseComponent } from './course/course.component';
import { CourseEditComponent } from './course/course-edit.component';
import { ProfessorComponent } from './professor/professor.component';
import { ProfessorEditComponent } from './professor/professor-edit.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentEditComponent } from './department/department-edit.component';
import { Login } from './auth/login';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full'},
    {path: 'weather', component: Weather},
    {path: 'courses', component: CourseComponent},
    {path: 'course/:id', component: CourseEditComponent},
    {path: 'course', component: CourseEditComponent},
    {path: 'professors', component: ProfessorComponent},
    {path: 'professor/:id', component: ProfessorEditComponent},
    {path: 'professor', component: ProfessorEditComponent},
    {path: 'departments', component: DepartmentComponent},
    {path: 'department/:id', component: DepartmentEditComponent},
    {path: 'department', component: DepartmentEditComponent},
    {path: 'login', component: Login}
];
