import { Component, OnInit } from '@angular/core';
import { CalendarService } from './calendar/service/calendar.service';
import { EmployeeService } from 'src/shared/services/employee.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-test-mission';

  constructor(
    private calendarService: CalendarService,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit() {
    const obs1 = this.calendarService.getAllTasks();
    const obs2 = this.employeeService.getAllEmployee();
    combineLatest([obs1, obs2]).subscribe(([tasks, employees]) => {
      localStorage.setItem("tasks", JSON.stringify(tasks))
      localStorage.setItem("employees", JSON.stringify(employees))
    })
  }
}
