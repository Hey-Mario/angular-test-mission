import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarInfoSettingComponent } from './components/calendar-info-setting/calendar-info-setting.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  declarations: [
    CalendarInfoSettingComponent,
    CreateTaskComponent,
  ],
  exports: [
    CalendarInfoSettingComponent,
    NzDrawerModule,
    NzButtonModule,
    CreateTaskComponent,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzSwitchModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzModalModule,
    NzDatePickerModule,
    NzToolTipModule,
  ],
  providers: [NzMessageService]
})
export class SharedModule { }
