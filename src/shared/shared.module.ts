import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarInfoSettingComponent } from './components/calendar-info-setting/calendar-info-setting.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CalendarInfoSettingComponent,
  ],
  exports: [
    CalendarInfoSettingComponent,
    NzDrawerModule,
    NzButtonModule,
    NzIconModule,
  ],
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    NzLayoutModule,
    NzIconModule,
    NzSwitchModule,
    FormsModule
  ]
})
export class SharedModule { }
