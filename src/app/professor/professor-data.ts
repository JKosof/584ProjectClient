import { Department } from "../department/department-data";
import { Course } from "../course/course-data";

export interface Professor {
    id: number;
    departmentId: number;
    firstName: string;
    lastName: string;
    partTime: boolean;
    workloadStatus: string;
    department: Department;
    courses: number[];
}
