import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightslipComponent } from './weightslip.component';

describe('WeightslipComponent', () => {
  let component: WeightslipComponent;
  let fixture: ComponentFixture<WeightslipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightslipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
