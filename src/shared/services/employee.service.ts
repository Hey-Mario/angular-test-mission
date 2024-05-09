import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { EMPLOYEE_LIST } from '../utils/event-utils';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees$ = new BehaviorSubject(EMPLOYEE_LIST)

  constructor() {
    const employees = localStorage.getItem("employees");
    if(employees) {
      this.setEmployee(JSON.parse(employees))
    }
  }

  getAllEmployee() {
    return this.employees$.asObservable();
  }

  setEmployee(employees: Employee[]) {
    this.employees$.next(employees);
  }
}
