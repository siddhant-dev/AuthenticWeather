import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempForcastComponent } from './temp-forcast.component';

describe('TempForcastComponent', () => {
  let component: TempForcastComponent;
  let fixture: ComponentFixture<TempForcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempForcastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempForcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
