import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarInfoSettingComponent } from './calendar-info-setting.component';

describe('CalendarInfoSettingComponent', () => {
  let component: CalendarInfoSettingComponent;
  let fixture: ComponentFixture<CalendarInfoSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarInfoSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarInfoSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
