import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { Employee } from 'src/shared/models/employee';
import { EmployeeService } from 'src/shared/services/employee.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  form!: FormGroup;
  employees$: Observable<Employee[]> = this.employeeService.getAllEmployee(); // Assuming you have an array of employees

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null],
      color: [null, Validators.required],
      employeId: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      // Submit form logic here
      console.log(this.form.value);
      this.message.success('Form submitted successfully!');
    } else {
      this.message.error('Form validation failed. Please check the fields.');
    }
  }
}
