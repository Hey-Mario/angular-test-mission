import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar-info-setting',
  templateUrl: './calendar-info-setting.component.html',
  styleUrls: ['./calendar-info-setting.component.scss']
})
export class CalendarInfoSettingComponent implements OnInit {
  @Output() toggleWeekends = new EventEmitter()
  @Input() currentTasks: EventApi[] = [];
  @Input() calendarOptions: CalendarOptions = {
    weekends: true
  }

  constructor() { }

  ngOnInit(): void {
  }

  handleWeekendsToggle() {
    this.toggleWeekends.emit()
  }
}
