import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventHoveringArg, EventRemoveArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { EMPLOYEE_LIST, convertEventToTask, createEventId } from 'src/shared/utils/event-utils';
import { CalendarService } from './service/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { map } from 'rxjs';
import { Task } from 'src/shared/models/task';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild(FullCalendarComponent) fullcalendar!: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventDeletion.bind(this),
  };

  isCollapsed = false;
  isModalVisible = false;
  showTooltipFlag: boolean = false;

  currentTasks: EventApi[] = [];

  selectedTask: Task | null = null;
  lastSelectInfo: DateSelectArg | null = null;
  tooltipContent: string = "";
  eventElementRef: ElementRef | null = null;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private service: CalendarService
  ) {
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.isModalVisible = true;
    this.lastSelectInfo = selectInfo;
  }

  handleEventClick(clickInfo: EventClickArg) {
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
    this.selectedTask = convertEventToTask(clickInfo.event);
    this.isModalVisible = true;
  }

  handleEvents(events: EventApi[]) {
    this.currentTasks = events;
    this.changeDetector.detectChanges();
  }

  handleEventDeletion(arg: EventRemoveArg) {
    this.service.removeTask(arg.event.id);
  }

  handleEventChange(arg: EventRemoveArg) {
    const data = {
      start: arg.event.startStr,
      end: arg.event.endStr,
    }
    this.service.updateTask(arg.event.id, data)
  }

  closeDrawer() {
    this.isCollapsed = false;
  }

  openDrawer() {
    this.isCollapsed = true;
  }

  saveChanges() {
    console.log(this.fullcalendar.events)
  }

  closeTaskCreate() {
    this.isModalVisible = false;
    this.selectedTask = null;
    if (this.lastSelectInfo) {
      const calendarApi = this.lastSelectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.lastSelectInfo = null;
    }
  }

  get events$() {
    return this.service.getAllTasks()
    // .pipe(map((tasks) => {
    //   console.log(tasks.map(task => {
    //       const employee = EMPLOYEE_LIST.find(emp => emp.id === task.employeId)
    //       return { ...task, employeeName: employee?.name, employeeImg: employee?.img }
    //     }))
    //   return tasks.map(task => {
    //     const employee = EMPLOYEE_LIST.find(emp => emp.id === task.employeId)
    //     return { ...task, employeeName: employee?.name, employeeImg: employee?.img }
    //   })
    // }))
  }
}
