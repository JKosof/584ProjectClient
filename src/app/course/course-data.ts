import { Department } from "../department/department-data";

export interface Course {
    id: number;
    departmentId: number;
    name: string;
    courseNumber: number;
    credits: number;
    availability: string;
    department: Department;
}