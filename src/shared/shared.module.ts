import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarInfoSettingComponent } from './components/calendar-info-setting/calendar-info-setting.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [
    CalendarInfoSettingComponent,
  ],
  exports: [
    CalendarInfoSettingComponent,
    NzDrawerModule,
    NzButtonModule,
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
  ]
})
export class SharedModule { }
