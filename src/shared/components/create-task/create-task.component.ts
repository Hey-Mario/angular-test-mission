import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateSelectArg } from '@fullcalendar/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { CalendarService } from 'src/app/calendar/service/calendar.service';
import { Employee } from 'src/shared/models/employee';
import { Task } from 'src/shared/models/task';
import { EmployeeService } from 'src/shared/services/employee.service';
import { createEventId } from 'src/shared/utils/event-utils';

interface IFormValue {
  title: string,
  description: string,
  color: string,
  employeId: number,
  startEndDate: Date[],
}

interface IFormDefaultValue {
  title: string | null,
  description: string | null,
  color: string | null,
  employeId: number | null,
  startEndDate: (string | Date | undefined)[],
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Input() selectInfo: DateSelectArg | null = null;
  @Input() task: Task | null = null;
  @Output() close = new EventEmitter();

  form!: FormGroup;
  employees$: Observable<Employee[]> = this.employeeService.getAllEmployee();

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private employeeService: EmployeeService,
    private calendarService: CalendarService,
  ) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      color: [null, Validators.required],
      employeId: [null, Validators.required],
      startEndDate: [null, Validators.required],
    })
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    let defaultValue: IFormDefaultValue = {
      title: null,
      description: null,
      employeId: null,
      color: "#ff0000",
      startEndDate: [this.selectInfo?.startStr, this.selectInfo?.endStr]
    }
    if (this.task) {
      const { start, end, employee, ...task } = this.task
      defaultValue = {
        ...defaultValue,
        ...task,
        startEndDate: [start, end],
      }
    }
    this.form.patchValue({
      ...defaultValue
    })
  }

  triggerClose() {
    this.close.emit();
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (!this.form.valid) {
      this.message.error('Form validation failed. Please check the fields.');
      return;
    }

    const newTask = this.buildTaskPayload(this.form.value);
    if (this.task) {
      this.calendarService.updateTask(this.task.id, newTask);
      this.message.success('Task updated successfully!');
    } else {
      this.calendarService.addTask(newTask);
      this.message.success('Task created successfully!');
    }

    this.triggerClose();
  }

  removeTask() {
    if(this.task)
      this.calendarService.removeTask(this.task.id)
    this.triggerClose();
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
