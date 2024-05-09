import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { CalendarService } from 'src/app/calendar/service/calendar.service';
import { Employee } from 'src/shared/models/employee';
import { EmployeeService } from 'src/shared/services/employee.service';

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
  form!: FormGroup;
  employees$: Observable<Employee[]> = this.employeeService.getAllEmployee(); // Assuming you have an array of employees
  @Output() close = new EventEmitter<boolean>();

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
    const currentDate = new Date();
    const defaultColor = "#ff0000"
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      color: [defaultColor, Validators.required],
      employeId: [null, Validators.required],
      startEndDate: [[currentDate, currentDate], Validators.required],
    });
  }

  cancel() {
    this.close.emit(false);
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
    }
    return payload;
  }
}
