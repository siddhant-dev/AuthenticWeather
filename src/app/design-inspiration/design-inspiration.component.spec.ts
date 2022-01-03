import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignInspirationComponent } from './design-inspiration.component';

describe('DesignInspirationComponent', () => {
  let component: DesignInspirationComponent;
  let fixture: ComponentFixture<DesignInspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignInspirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
