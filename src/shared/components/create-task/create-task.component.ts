import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { CalendarService } from 'src/app/calendar/service/calendar.service';
import { Employee } from 'src/shared/models/employee';
import { EmployeeService } from 'src/shared/services/employee.service';
import { createEventId } from 'src/shared/utils/event-utils';

interface IFormValue {
  title: string,
  description: string,
  color: string,
  employeId: number,
  startEndDate: Date[],
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Input() selectInfo: DateSelectArg | null = null;
  @Output() close = new EventEmitter();

  form!: FormGroup;
  employees$: Observable<Employee[]> = this.employeeService.getAllEmployee(); // Assuming you have an array of employees

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private employeeService: EmployeeService,
    private calendarService: CalendarService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const defaultStart = this.selectInfo?.startStr;
    const defaultEnd = this.selectInfo?.endStr;
    const defaultColor = "#ff0000"
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      color: [defaultColor, Validators.required],
      employeId: [null, Validators.required],
      startEndDate: [[defaultStart, defaultEnd], Validators.required],
    });
  }

  triggerClose() {
    this.close.emit();
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      const newTask = this.buildTaskPayload(this.form.value);
      console.log(newTask);
      this.calendarService.addTask(newTask);
      this.message.success('Task created successfully!');
      this.triggerClose();
    } else {
      this.message.error('Form validation failed. Please check the fields.');
    }
  }

  buildTaskPayload(data: IFormValue) {
    const { startEndDate, ...otherData } = data;
    const payload = {
      ...otherData,
      start: startEndDate[0],
      end: startEndDate[1],
      id: createEventId()
    }
    return payload;
  }
}
