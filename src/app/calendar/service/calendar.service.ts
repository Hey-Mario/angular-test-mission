import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_EVENTS } from 'src/shared/utils/event-utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private calendarTasks$ = new BehaviorSubject(INITIAL_EVENTS);

  constructor() { }

  getAllTasks() {
    return this.calendarTasks$.asObservable();
  }

  addTask() {
    return this.calendarTasks$.asObservable();
  }
}
