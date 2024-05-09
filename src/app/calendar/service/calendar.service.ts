import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Employee } from 'src/shared/models/employee';
import { Task } from 'src/shared/models/task';
import { EmployeeService } from 'src/shared/services/employee.service';
import { INITIAL_EVENTS } from 'src/shared/utils/event-utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendarTasks$ = new BehaviorSubject(INITIAL_EVENTS);

  constructor(
    private employeeService: EmployeeService
  ) { }

  getAllTasks() {
    const obs1 = this.calendarTasks$.asObservable();
    const obs2 = this.employeeService.getAllEmployee();
    return combineLatest([obs1, obs2]).pipe(
      map(([tasks, employees]) => this.buildTasksWithEmployee(tasks, employees))
    );
  }

  buildTasksWithEmployee(tasks: Task[], employees: Employee[]) {
    return tasks.map(task => {
      const employee = employees.find(emp => emp.id === task.employeId)
      return {...task, employee}
    })
  }

  get currentTasks(){
    return this.calendarTasks$.value
  }

  addTask(task: Task) {
    const tasks = [...this.currentTasks, task]
    return this.calendarTasks$.next(tasks);
  }
}
