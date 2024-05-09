import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/shared/models/task';
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

  get currentTasks(){
    return this.calendarTasks$.value
  }

  addTask(task: Partial<Task>) {
    const tasks = [...this.currentTasks, task]
    return this.calendarTasks$.next(tasks);
  }
}
