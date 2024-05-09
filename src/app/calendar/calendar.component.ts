import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventHoveringArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { createEventId } from 'src/shared/utils/event-utils';
import { CalendarService } from './service/calendar.service';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  isCollapsed = false;
  isAddTaskVisible = false;
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
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentTasks: EventApi[] = [];
  lastSelectInfo: DateSelectArg | null = null;
  tooltipContent: string = "";
  eventElementRef: ElementRef | null = null;
  showTooltipFlag: boolean = false;

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
    this.isAddTaskVisible = true;
    this.lastSelectInfo = selectInfo;
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentTasks = events;
    this.changeDetector.detectChanges();
  }

  closeDrawer() {
    this.isCollapsed = false;
  }

  openDrawer() {
    this.isCollapsed = true;
  }

  closeTaskCreate() {
    this.isAddTaskVisible = false;
    if (this.lastSelectInfo) {
      const calendarApi = this.lastSelectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.lastSelectInfo = null;
    }
  }

  get events() {
    return this.service.getAllTasks()
  }
}
