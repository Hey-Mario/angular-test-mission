import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EMPLOYEE_LIST } from '../utils/event-utils';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  getAllEmployee() {
    return of(EMPLOYEE_LIST);
  }
}
